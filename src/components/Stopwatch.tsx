import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useLanguage } from '../lib/i18n.tsx';

export const Stopwatch: React.FC = () => {
  const { t, languageInfo } = useLanguage();
  const [swRunning, setSwRunning] = useState(false);
  const [swTimeMs, setSwTimeMs] = useState(0);

  useEffect(() => {
    let timer: any;
    if (swRunning) {
      timer = setInterval(() => {
        setSwTimeMs(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [swRunning]);

  const formatSwTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
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
          {t.tools?.stopwatch || 'Cronómetro'}
        </h3>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2.8rem, 8vw, 4.8rem)',
          fontWeight: 800,
          color: '#0284C7',
          margin: '1.5rem 0',
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 4px 16px rgba(2, 132, 199, 0.25)',
          lineHeight: 1.1
        }}>
          {formatSwTime(swTimeMs)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => setSwRunning(!swRunning)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.6rem',
              borderRadius: 'var(--radius-full)',
              background: swRunning ? '#DC2626' : '#0284C7',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: swRunning ? '0 4px 14px rgba(220, 38, 38, 0.35)' : '0 4px 14px rgba(2, 132, 199, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            {swRunning ? <Pause size={18} /> : <Play size={18} />}
            <span>{swRunning ? (languageInfo.code === 'es' ? 'Pausar' : 'Pause') : (languageInfo.code === 'es' ? 'Iniciar' : 'Start')}</span>
          </button>

          <button
            onClick={() => {
              setSwRunning(false);
              setSwTimeMs(0);
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
