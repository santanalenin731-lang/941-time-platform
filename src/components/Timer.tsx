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
      padding: '2.5rem 1.75rem',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF3FB 100%)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid #C4DCEF',
      borderBottom: '1.5px solid #B4D3EB',
      boxShadow: '0 2px 4px rgba(7, 26, 51, 0.04), 0 11px 26px -3px rgba(7, 26, 51, 0.11), 0 6px 16px -2px rgba(2, 132, 199, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
    }}>
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1.5rem' }}>
          {t.tools?.timer || 'Temporizador'}
        </h3>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(3rem, 9vw, 5.5rem)',
          fontWeight: 900,
          color: timeMs === 0 ? '#DC2626' : '#0284C7',
          margin: '1.5rem 0',
          fontVariantNumeric: 'tabular-nums',
          textShadow: timeMs === 0 ? '0 4px 16px rgba(220, 38, 38, 0.25)' : '0 4px 16px rgba(2, 132, 199, 0.25)',
          lineHeight: 1.1
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
              padding: '0.75rem 1.6rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #C4DCEF',
              borderBottom: '1.5px solid #B4D3EB',
              color: 'var(--color-navy)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(7, 26, 51, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
              transition: 'all 0.2s ease'
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
  padding: '0.45rem 0.9rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid #C4DCEF',
  borderBottom: '1.5px solid #B4D3EB',
  background: 'rgba(255, 255, 255, 0.95)',
  color: 'var(--color-navy)',
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(7, 26, 51, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
};
