import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useLanguage } from '../lib/i18n.tsx';

export const Timer: React.FC = () => {
  const { t, languageInfo } = useLanguage();
  const [isRunning, setIsRunning] = useState(false);
  const [initialTimeMs, setInitialTimeMs] = useState(5 * 60 * 1000); // Default 5 mins
  const [timeMs, setTimeMs] = useState(5 * 60 * 1000);

  useEffect(() => {
    let timer: any;
    if (isRunning && timeMs > 0) {
      timer = setInterval(() => {
        setTimeMs(prev => {
          if (prev <= 10) {
            clearInterval(timer);
            setIsRunning(false);
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeMs]);

  const adjustTime = (minutes: number) => {
    if (isRunning) return;
    const newTime = Math.max(0, initialTimeMs + minutes * 60 * 1000);
    setInitialTimeMs(newTime);
    setTimeMs(newTime);
  };

  const formatTime = (ms: number) => {
    const totalSecs = Math.ceil(ms / 1000);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1.5rem' }}>
          {t.tools?.timer || 'Temporizador'}
        </h3>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '5.5rem',
          fontWeight: 900,
          color: timeMs === 0 ? '#DC2626' : 'var(--color-navy)',
          margin: '1.5rem 0',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {formatTime(timeMs)}
        </div>

        {!isRunning && timeMs === initialTimeMs && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <button onClick={() => adjustTime(-1)} style={adjustBtnStyle}>-1m</button>
            <button onClick={() => adjustTime(1)} style={adjustBtnStyle}>+1m</button>
            <button onClick={() => adjustTime(5)} style={adjustBtnStyle}>+5m</button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              if (timeMs === 0) {
                setTimeMs(initialTimeMs);
                setIsRunning(true);
              } else {
                setIsRunning(!isRunning);
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              background: isRunning ? '#DC2626' : 'var(--color-navy)',
              color: 'var(--color-white)',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            <span>{isRunning ? (languageInfo.code === 'es' ? 'Pausar' : 'Pause') : (languageInfo.code === 'es' ? 'Iniciar' : 'Start')}</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeMs(initialTimeMs);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-navy)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <RotateCcw size={18} />
            <span>{languageInfo.code === 'es' ? 'Reiniciar' : 'Reset'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const adjustBtnStyle = {
  padding: '0.4rem 0.8rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-secondary)',
  color: 'var(--color-navy)',
  fontWeight: 700,
  cursor: 'pointer'
};
