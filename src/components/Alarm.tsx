import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Trash2 } from 'lucide-react';
import { useLanguage } from '../lib/i18n.tsx';

interface AlarmItem {
  id: string;
  time: string;
  label: string;
  isActive: boolean;
}

export const Alarm: React.FC = () => {
  const { t } = useLanguage();
  const [alarms, setAlarms] = useState<AlarmItem[]>(() => {
    try {
      const saved = localStorage.getItem('941_alarms');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  const [newTime, setNewTime] = useState('07:00');
  const [newLabel, setNewLabel] = useState('Despertador');

  useEffect(() => {
    localStorage.setItem('941_alarms', JSON.stringify(alarms));
  }, [alarms]);

  const addAlarm = () => {
    const alarm: AlarmItem = {
      id: Date.now().toString(),
      time: newTime,
      label: newLabel,
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
      <div style={{ textAlign: 'center', padding: '1rem 0', maxWidth: '500px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1.5rem' }}>
          {t.tools?.alarm || 'Alarma'}
        </h3>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center', alignItems: 'center' }}>
          <input 
            type="time" 
            value={newTime}
            onChange={e => setNewTime(e.target.value)}
            style={inputStyle}
          />
          <input 
            type="text" 
            value={newLabel}
            placeholder="Etiqueta"
            onChange={e => setNewLabel(e.target.value)}
            style={{...inputStyle, flex: 1}}
          />
          <button 
            onClick={addAlarm}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-navy)',
              color: 'var(--color-white)',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            +
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alarms.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No hay alarmas configuradas.</p>
          ) : (
            alarms.map(alarm => (
              <div key={alarm.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.2rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: alarm.isActive ? 'var(--color-sky-light)' : 'var(--color-bg-secondary)',
                border: '1px solid',
                borderColor: alarm.isActive ? 'var(--color-sky)' : 'var(--color-border)',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 800, 
                    color: alarm.isActive ? 'var(--color-navy-deep)' : 'var(--color-text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {alarm.time}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    {alarm.label}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => toggleAlarm(alarm.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: alarm.isActive ? '#0284C7' : 'var(--color-text-muted)'
                    }}
                  >
                    {alarm.isActive ? <Bell size={24} /> : <BellOff size={24} />}
                  </button>
                  <button 
                    onClick={() => deleteAlarm(alarm.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#EF4444'
                    }}
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '0.75rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  fontSize: '1rem',
  fontWeight: 600 as any,
  color: 'var(--color-navy)',
  fontFamily: 'var(--font-mono)'
};
