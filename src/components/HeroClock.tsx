import React, { useState, useEffect } from 'react';
import { City, CITIES_DATABASE } from '../data/cities';
import { getTimeInTimezone, calculateSunTimes } from '../lib/timeEngine';
import { useLanguage } from '../lib/i18n.tsx';

interface HeroClockProps {
  city: City;
  is24Hour: boolean;
  showSeconds: boolean;
  onSelectCity: (city: City) => void;
  onAddToWorldClock: (city: City) => void;
  isCityInWorldClock: boolean;
}

export const HeroClock: React.FC<HeroClockProps> = ({
  city,
  is24Hour,
  showSeconds,
  onSelectCity,
  onAddToWorldClock,
  isCityInWorldClock
}) => {
  const { languageInfo, t } = useLanguage();

  const [timeData, setTimeData] = useState(() =>
    getTimeInTimezone(city.timezone, is24Hour, showSeconds, 0, languageInfo.locale)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeData(getTimeInTimezone(city.timezone, is24Hour, showSeconds, 0, languageInfo.locale));
    }, 100);

    return () => clearInterval(timer);
  }, [city.timezone, is24Hour, showSeconds, languageInfo.locale]);

  const sunData = calculateSunTimes(city.lat, city.lng);

  const popularStripCities = [
    CITIES_DATABASE.find(c => c.id === 'los-angeles') || CITIES_DATABASE[6],
    CITIES_DATABASE.find(c => c.id === 'new-york') || CITIES_DATABASE[1],
    CITIES_DATABASE.find(c => c.id === 'london') || CITIES_DATABASE[2],
    CITIES_DATABASE.find(c => c.id === 'paris') || CITIES_DATABASE[5],
    CITIES_DATABASE.find(c => c.id === 'hong-kong') || CITIES_DATABASE[19],
    CITIES_DATABASE.find(c => c.id === 'tokyo') || CITIES_DATABASE[3],
  ];

  return (
    <section style={{
      width: '100%',
      maxWidth: 'var(--max-width)',
      margin: '0.5rem auto 3rem auto',
      padding: '0 1.5rem'
    }}>
      {/* Status & Subhead */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'var(--color-navy)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            {city.name}
          </h1>
        </div>

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--color-text-muted)',
          marginTop: '0.35rem',
          lineHeight: 1.4
        }}>
          {t.hero.exactTime} {t.hero.syncedWith}.<br />
          <strong style={{ color: 'var(--color-navy)' }}>{city.name}, {city.country}</strong>
        </p>
      </div>


      {/* Massive Focal Digital Clock - Fixed Tabular Numbers and Stationary AM/PM */}
      <div style={{
        margin: '1rem 0 1.5rem 0',
        lineHeight: 0.95,
        display: 'inline-flex',
        alignItems: 'baseline',
        userSelect: 'all'
      }}>
        {/* Digits with Tabular Numbers (tabular-nums prevents jitter when digits change) */}
        <span style={{
          fontFamily: 'var(--font-clock)',
          fontSize: 'clamp(4.8rem, 15vw, 11.5rem)',
          fontWeight: 900,
          color: '#0284C7',
          letterSpacing: '-0.03em',
          fontVariantNumeric: 'tabular-nums',
          fontFeatureSettings: '"tnum"',
          textShadow: '0 14px 40px rgba(2, 132, 199, 0.45), 0 4px 18px rgba(7, 26, 51, 0.25)',
          filter: 'drop-shadow(0 12px 24px rgba(2, 132, 199, 0.3))'
        }}>
          {timeData.timeDigits}
        </span>

        {/* Stationary AM / PM Indicator */}
        {!is24Hour && timeData.period && (
          <span style={{
            fontFamily: 'var(--font-clock)',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#0284C7',
            marginLeft: '0.4em',
            display: 'inline-block',
            width: '1.8em',
            textAlign: 'left',
            fontVariantNumeric: 'tabular-nums',
            textShadow: '0 10px 30px rgba(2, 132, 199, 0.4)',
            filter: 'drop-shadow(0 8px 16px rgba(2, 132, 199, 0.25))'
          }}>
            {timeData.period}
          </span>
        )}
      </div>

      {/* Date & Sun Info (Right Aligned under Clock) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        textAlign: 'right',
        gap: '0.35rem',
        marginBottom: '2.5rem'
      }}>
        {/* Date */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-navy)',
          textTransform: 'capitalize'
        }}>
          {timeData.dateString}
        </div>

        {/* Sun & Interactive Links */}
        <div style={{
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'flex-end'
        }}>
          <span>☀️ ↑ {sunData.sunrise} · ↓ {sunData.sunset} ({sunData.dayLength})</span>
          <span>-</span>
          <button
            onClick={() => onAddToWorldClock(city)}
            style={{
              color: 'var(--color-navy)',
              textDecoration: 'underline',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isCityInWorldClock ? '★' : '☆'} {city.name}
          </button>
        </div>
      </div>

      {/* Time.is Style Horizontal World Cities Strip */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.6rem',
        flexWrap: 'wrap',
        marginTop: '1rem'
      }}>
        {popularStripCities.map((stripCity) => {
          const stripTime = getTimeInTimezone(stripCity.timezone, is24Hour, false, 0, languageInfo.locale);
          return (
            <div
              key={stripCity.id}
              onClick={() => onSelectCity(stripCity)}
              style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.55rem 0.9rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                minWidth: '105px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-sky-light)';
                e.currentTarget.style.borderColor = 'var(--color-sky)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-bg-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                {stripCity.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-clock)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#0284C7',
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 2px 8px rgba(2, 132, 199, 0.25)'
              }}>
                {stripTime.timeString}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

