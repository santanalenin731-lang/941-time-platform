import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useLanguage } from '../lib/i18n.tsx';

export const Stopwatch: React.FC = () => {
  const { t } = useLanguage();
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
      padding: '2rem 1.5rem',
      background: 'var(--color-bg-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      border: '1px solid var(--color-border)'
    }}>
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1.5rem' }}>
          {t.tools?.stopwatch || 'Cronómetro'}
        </h3>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '4.5rem',
          fontWeight: 700,
          color: 'var(--color-navy)',
          margin: '1.5rem 0'
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
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              background: swRunning ? '#DC2626' : 'var(--color-navy)',
              color: 'var(--color-white)',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {swRunning ? <Pause size={18} /> : <Play size={18} />}
            <span>{swRunning ? 'Pause' : 'Start'}</span>
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
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-navy)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
