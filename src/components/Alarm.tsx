import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, Trash2, Plus, Volume2 } from 'lucide-react';
import { useLanguage } from '../lib/i18n.tsx';

interface AlarmItem {
  id: string;
  time: string; // Stored in 24-hour HH:mm format (e.g. "07:30", "19:45")
  label: string;
  isActive: boolean;
}

interface AlarmProps {
  is24Hour?: boolean;
}

export const Alarm: React.FC<AlarmProps> = ({ is24Hour = false }) => {
  const { t, languageInfo } = useLanguage();
  const [alarms, setAlarms] = useState<AlarmItem[]>(() => {
    try {
      const saved = localStorage.getItem('941_alarms');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Time state
  const [hour, setHour] = useState(is24Hour ? '07' : '07');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  // Label state
  const defaultLabel = languageInfo.code === 'es' ? 'Despertador' : 'Wake up';
  const [newLabel, setNewLabel] = useState(defaultLabel);

  // Active ringing alarm modal state
  const [ringingAlarm, setRingingAlarm] = useState<AlarmItem | null>(null);
  const lastTriggeredMinute = useRef<string>('');

  // Persist alarms
  useEffect(() => {
    localStorage.setItem('941_alarms', JSON.stringify(alarms));
  }, [alarms]);

  // Persistent AudioContext ref to bypass browser autoplay restrictions
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ringIntervalRef = useRef<any>(null);

  const getOrCreateAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Audio Chime via Web Audio API (Hardware Speaker Output)
  const playSingleChime = () => {
    try {
      const ctx = getOrCreateAudioContext();
      if (!ctx) return;

      const playBeep = (time: number, freq: number, duration: number = 0.2) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + duration);
      };

      const now = ctx.currentTime;
      // Ascending, pleasant 3-tone chime (Sol-La-Do / G5-A5-C6)
      playBeep(now, 784, 0.18);
      playBeep(now + 0.2, 880, 0.18);
      playBeep(now + 0.4, 1046.5, 0.35);
    } catch (err) {
      console.error('Audio chime error:', err);
    }
  };

  // Continuous sound loop while an alarm is ringing
  useEffect(() => {
    if (ringingAlarm) {
      playSingleChime();
      ringIntervalRef.current = setInterval(() => {
        playSingleChime();
      }, 1600);
    } else {
      if (ringIntervalRef.current) {
        clearInterval(ringIntervalRef.current);
        ringIntervalRef.current = null;
      }
    }
    return () => {
      if (ringIntervalRef.current) {
        clearInterval(ringIntervalRef.current);
      }
    };
  }, [ringingAlarm]);

  // Monitor current time to trigger active alarms
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentH = now.getHours().toString().padStart(2, '0');
      const currentM = now.getMinutes().toString().padStart(2, '0');
      const currentTimeStr = `${currentH}:${currentM}`;

      if (lastTriggeredMinute.current !== currentTimeStr) {
        const matched = alarms.find(a => a.isActive && a.time === currentTimeStr);
        if (matched) {
          lastTriggeredMinute.current = currentTimeStr;
          setRingingAlarm(matched);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms]);

  // Convert selected hour, minute and AM/PM into 24h format for consistent storage
  const get24HourTime = (): string => {
    const m = minute.padStart(2, '0');
    if (is24Hour) {
      return `${hour.padStart(2, '0')}:${m}`;
    }
    let hNum = parseInt(hour, 10);
    if (isNaN(hNum)) hNum = 7;
    if (period === 'PM' && hNum < 12) hNum += 12;
    if (period === 'AM' && hNum === 12) hNum = 0;
    return `${hNum.toString().padStart(2, '0')}:${m}`;
  };

  // Format 24-hour stored time for display based on is24Hour prop
  const formatDisplayTime = (time24: string): { digits: string; period?: string } => {
    const [hStr, mStr] = time24.split(':');
    const hNum = parseInt(hStr, 10);
    if (is24Hour) {
      return { digits: `${hStr}:${mStr}` };
    }
    const p = hNum >= 12 ? 'PM' : 'AM';
    let h12 = hNum % 12;
    if (h12 === 0) h12 = 12;
    return {
      digits: `${h12.toString().padStart(2, '0')}:${mStr}`,
      period: p
    };
  };

  const addAlarm = () => {
    getOrCreateAudioContext();
    const formattedTime = get24HourTime();
    const alarm: AlarmItem = {
      id: Date.now().toString(),
      time: formattedTime,
      label: newLabel.trim() || defaultLabel,
      isActive: true
    };
    setAlarms(prev => [...prev, alarm].sort((a, b) => a.time.localeCompare(b.time)));
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  // Options for hours and minutes
  const hoursOptions = is24Hour
    ? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    : Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '2rem auto',
      padding: '2rem 1.5rem',
      background: 'var(--color-bg-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      border: '1px solid var(--color-border)'
    }}>
      {/* Active Ringing Alarm Notification Modal */}
      {ringingAlarm && (
        <div style={{
          marginBottom: '1.5rem',
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'pulse 1.5s infinite'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Volume2 size={32} />
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                {ringingAlarm.label}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {formatDisplayTime(ringingAlarm.time).digits} {formatDisplayTime(ringingAlarm.time).period || ''}
              </div>
            </div>
          </div>
          <button
            onClick={() => setRingingAlarm(null)}
            style={{
              background: '#FFFFFF',
              color: '#0369A1',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '0.6rem 1.25rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
            }}
          >
            {languageInfo.code === 'es' ? 'Detener' : 'Stop'}
          </button>
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '1rem 0', maxWidth: '620px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1.5rem' }}>
          {t.tools?.alarm || 'Alarma'}
        </h3>

        {/* Intuitive & Cross-Browser Time Picker Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '2rem',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Time Selector Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '0.35rem 0.6rem',
            border: '1px solid var(--color-border)',
            gap: '0.35rem'
          }}>
            {/* Hour select */}
            <select
              value={hour}
              onChange={e => setHour(e.target.value)}
              title="Hora"
              style={selectStyle}
            >
              {hoursOptions.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            <span style={{ fontWeight: 800, color: '#0284C7', fontSize: '1.3rem', lineHeight: 1 }}>:</span>

            {/* Minute select */}
            <select
              value={minute}
              onChange={e => setMinute(e.target.value)}
              title="Minutos"
              style={selectStyle}
            >
              {minuteOptions.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            {/* AM / PM Segmented Control */}
            {!is24Hour && (
              <div style={{
                display: 'flex',
                background: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #D5E1ED',
                overflow: 'hidden',
                marginLeft: '0.35rem'
              }}>
                <button
                  type="button"
                  onClick={() => setPeriod('AM')}
                  style={{
                    padding: '0.45rem 0.65rem',
                    background: period === 'AM' ? '#0284C7' : 'transparent',
                    color: period === 'AM' ? '#FFFFFF' : 'var(--color-navy)',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod('PM')}
                  style={{
                    padding: '0.45rem 0.65rem',
                    background: period === 'PM' ? '#0284C7' : 'transparent',
                    color: period === 'PM' ? '#FFFFFF' : 'var(--color-navy)',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  PM
                </button>
              </div>
            )}
          </div>

          {/* Label Input */}
          <input
            type="text"
            value={newLabel}
            placeholder={languageInfo.code === 'es' ? 'Etiqueta (ej. Despertador)' : 'Label (e.g. Wake up)'}
            onChange={e => setNewLabel(e.target.value)}
            style={{
              ...inputStyle,
              flex: 1,
              minWidth: '160px'
            }}
          />

          {/* Add Button */}
          <button
            onClick={addAlarm}
            title={languageInfo.code === 'es' ? 'Añadir alarma' : 'Add alarm'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: '#0284C7',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)',
              transition: 'background 0.15s ease, transform 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#0369A1';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#0284C7';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Plus size={18} />
            <span>{languageInfo.code === 'es' ? 'Añadir' : 'Add'}</span>
          </button>
        </div>

        {/* Alarms List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {alarms.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', padding: '1rem 0' }}>
              {languageInfo.code === 'es' ? 'No hay alarmas configuradas.' : 'No alarms configured.'}
            </p>
          ) : (
            alarms.map(alarm => {
              const display = formatDisplayTime(alarm.time);
              return (
                <div key={alarm.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.35rem',
                  borderRadius: 'var(--radius-md)',
                  background: alarm.isActive ? 'var(--color-sky-light)' : 'var(--color-bg-secondary)',
                  border: '1px solid',
                  borderColor: alarm.isActive ? 'var(--color-sky)' : 'var(--color-border)',
                  boxShadow: alarm.isActive ? '0 4px 12px rgba(2, 132, 199, 0.08)' : 'none',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ textAlign: 'left', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <div style={{
                      fontSize: '1.9rem',
                      fontWeight: 800,
                      color: alarm.isActive ? '#0284C7' : 'var(--color-text-muted)',
                      fontFamily: 'var(--font-clock)',
                      fontVariantNumeric: 'tabular-nums'
                    }}>
                      {display.digits}
                    </div>
                    {display.period && (
                      <span style={{
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        color: alarm.isActive ? '#0284C7' : 'var(--color-text-muted)'
                      }}>
                        {display.period}
                      </span>
                    )}
                    <span style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 600,
                      marginLeft: '0.5rem'
                    }}>
                      — {alarm.label}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      onClick={() => toggleAlarm(alarm.id)}
                      title={alarm.isActive ? 'Desactivar alarma' : 'Activar alarma'}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: alarm.isActive ? '#0284C7' : 'var(--color-text-muted)',
                        padding: '0.35rem',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'transform 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {alarm.isActive ? <Bell size={22} /> : <BellOff size={22} />}
                    </button>
                    <button
                      onClick={() => deleteAlarm(alarm.id)}
                      title="Eliminar alarma"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#EF4444',
                        padding: '0.35rem',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'transform 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const selectStyle: React.CSSProperties = {
  padding: '0.45rem 0.5rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid transparent',
  background: '#FFFFFF',
  fontSize: '1.25rem',
  fontWeight: 800,
  color: 'var(--color-navy)',
  fontFamily: 'var(--font-clock)',
  fontVariantNumeric: 'tabular-nums',
  cursor: 'pointer',
  outline: 'none',
  textAlign: 'center'
};

const inputStyle: React.CSSProperties = {
  padding: '0.7rem 0.9rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  fontSize: '0.95rem',
  fontWeight: 600,
  color: 'var(--color-navy)',
  background: '#FFFFFF',
  outline: 'none'
};
