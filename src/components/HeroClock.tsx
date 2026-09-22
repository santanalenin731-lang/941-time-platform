import React, { useState, useEffect } from 'react';
import { City, CITIES_DATABASE } from '../data/cities';
import { getTimeInTimezone, calculateSunTimes, getWeekNumber } from '../lib/timeEngine';
import { useLanguage, getTranslatedCountry, getTranslatedCity } from '../lib/i18n.tsx';

interface HeroClockProps {
  city: City;
  is24Hour: boolean;
  showSeconds: boolean;
  onSelectCity: (city: City) => void;
}

export const HeroClock: React.FC<HeroClockProps> = ({
  city,
  is24Hour,
  showSeconds,
  onSelectCity
}) => {
  const { languageInfo } = useLanguage();

  const [timeData, setTimeData] = useState(() =>
    getTimeInTimezone(city.timezone, is24Hour, showSeconds, 0, languageInfo.locale)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeData(getTimeInTimezone(city.timezone, is24Hour, showSeconds, 0, languageInfo.locale));
    }, 100);

    return () => clearInterval(timer);
  }, [city.timezone, is24Hour, showSeconds, languageInfo.locale]);

  const sunData = calculateSunTimes(city.lat, city.lng, city.timezone);

  const [stripCities, setStripCities] = useState<City[]>(() => {
    try {
      const saved = localStorage.getItem('941_strip_cities');
      if (saved) {
        const parsedIds: string[] = JSON.parse(saved);
        return parsedIds.map(id => CITIES_DATABASE.find(c => c.id === id)).filter(Boolean).slice(0, 5) as City[];
      }
    } catch (e) {
      console.error(e);
    }
    return [
      CITIES_DATABASE.find(c => c.id === 'los-angeles') || CITIES_DATABASE[6],
      CITIES_DATABASE.find(c => c.id === 'new-york') || CITIES_DATABASE[1],
      CITIES_DATABASE.find(c => c.id === 'london') || CITIES_DATABASE[2],
      CITIES_DATABASE.find(c => c.id === 'paris') || CITIES_DATABASE[5],
      CITIES_DATABASE.find(c => c.id === 'hong-kong') || CITIES_DATABASE[19],
    ];
  });

  useEffect(() => {
    localStorage.setItem('941_strip_cities', JSON.stringify(stripCities.map(c => c.id)));
  }, [stripCities]);

  const weekTranslations: Record<string, string> = {
    es: 'Semana', en: 'Week', zh: '周', hi: 'सप्ताह',
    ar: 'أسبوع', fr: 'Semaine', bn: 'সপ্তাহ', pt: 'Semana',
    ru: 'Неделя', ja: '週'
  };
  const weekLabel = weekTranslations[languageInfo.code] || 'Week';
  const tzDate = new Date(new Date().toLocaleString('en-US', { timeZone: city.timezone }));
  const weekNum = getWeekNumber(tzDate);

  return (
    <section style={{
      width: '100%',
      maxWidth: 'var(--max-width)',
      margin: '0.5rem auto 3rem auto',
      padding: '0 1rem',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      {/* Status & Subhead */}
      <div style={{ marginBottom: '1.25rem', maxWidth: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 6.5vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--color-navy)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            wordBreak: 'break-word'
          }}>
            {getTranslatedCity(city, languageInfo.code)}
          </h1>
        </div>

        <p style={{
          fontSize: 'clamp(1.15rem, 3.2vw, 1.35rem)',
          fontWeight: 700,
          color: '#0284C7',
          marginTop: '0.25rem',
          lineHeight: 1.3,
          letterSpacing: '-0.01em'
        }}>
          {getTranslatedCountry(city.countryCode, languageInfo.locale, city.country)}
        </p>
      </div>


      {/* Massive Focal Digital Clock - Fixed Tabular Numbers and Stationary AM/PM */}
      <div style={{
        margin: '1rem 0 1.5rem 0',
        lineHeight: 0.95,
        display: 'inline-flex',
        alignItems: 'baseline',
        userSelect: 'all',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Digits with Tabular Numbers (tabular-nums prevents jitter when digits change) */}
        <span style={{
          fontFamily: 'var(--font-clock)',
          fontSize: 'clamp(2.35rem, 11vw, 11.5rem)',
          fontWeight: 900,
          color: '#0284C7',
          letterSpacing: '-0.03em',
          fontVariantNumeric: 'tabular-nums',
          fontFeatureSettings: '"tnum"',
          textShadow: 'clamp(6px, 1.2vw, 14px) clamp(6px, 1.2vw, 14px) clamp(16px, 3.5vw, 40px) rgba(2, 132, 199, 0.45), 3px 3px 12px rgba(7, 26, 51, 0.25)',
          filter: 'drop-shadow(8px 8px 18px rgba(2, 132, 199, 0.25))'
        }}>
          {timeData.timeDigits}
        </span>

        {/* Stationary AM / PM Indicator */}
        {!is24Hour && timeData.period && (
          <span style={{
            fontFamily: 'var(--font-clock)',
            fontSize: 'clamp(1.05rem, 4.5vw, 4.5rem)',
            fontWeight: 900,
            color: '#0284C7',
            marginLeft: '0.25em',
            display: 'inline-block',
            width: '1.6em',
            textAlign: 'left',
            fontVariantNumeric: 'tabular-nums',
            textShadow: 'clamp(4px, 1vw, 10px) clamp(4px, 1vw, 10px) clamp(10px, 2.5vw, 30px) rgba(2, 132, 199, 0.4)',
            filter: 'drop-shadow(6px 6px 12px rgba(2, 132, 199, 0.2))'
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
        marginBottom: '2.5rem',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Date */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 4.2vw, 1.5rem)',
          fontWeight: 700,
          color: 'var(--color-navy)',
          textTransform: 'capitalize',
          wordBreak: 'break-word',
          maxWidth: '100%'
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
          <span>↑ {sunData.sunrise} · ↓ {sunData.sunset} ({sunData.dayLength})</span>
          <span>-</span>
          <span style={{ color: 'var(--color-navy)', fontWeight: 600 }}>
            {weekLabel} {weekNum}
          </span>
        </div>
      </div>

      {/* Time.is Style Horizontal World Cities Strip */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.6rem',
        flexWrap: 'wrap',
        marginTop: '1rem',
        alignItems: 'center',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        {stripCities.map((stripCity) => {
          const stripTime = getTimeInTimezone(stripCity.timezone, is24Hour, false, 0, languageInfo.locale);
          return (
            <div
              key={stripCity.id}
              style={{
                position: 'relative',
                background: '#FFFFFF',
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
                const btn = e.currentTarget.querySelector('.remove-btn') as HTMLElement;
                if (btn) btn.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                const btn = e.currentTarget.querySelector('.remove-btn') as HTMLElement;
                if (btn) btn.style.opacity = '0';
              }}
            >
              <button
                className="remove-btn"
                title={languageInfo.code === 'es' ? 'Eliminar' : 'Remove'}
                onClick={(e) => {
                  e.stopPropagation();
                  setStripCities(prev => prev.filter(c => c.id !== stripCity.id));
                }}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#e11d48',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  zIndex: 10
                }}
              >
                ✕
              </button>
              <div onClick={() => onSelectCity(stripCity)}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  {getTranslatedCity(stripCity, languageInfo.code)}
                </div>
                <div style={{
                  fontFamily: 'var(--font-clock)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#0284C7',
                  fontVariantNumeric: 'tabular-nums',
                  textShadow: '2px 2px 8px rgba(2, 132, 199, 0.25)'
                }}>
                  {stripTime.timeString}
                </div>
              </div>
            </div>
          );
        })}
        {stripCities.length < 5 && (
          <div style={{ position: 'relative' }}>
            <select
              value=""
              onChange={(e) => {
                const city = CITIES_DATABASE.find(c => c.id === e.target.value);
                if (city && !stripCities.find(c => c.id === city.id)) {
                  setStripCities(prev => [...prev, city]);
                }
              }}
              style={{
                background: '#FFFFFF',
                border: '1px dashed var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.55rem 0.9rem',
                color: 'var(--color-navy)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                minWidth: '80px',
                textAlign: 'center',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-sky-light)';
                e.currentTarget.style.borderColor = 'var(--color-sky)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <option value="" disabled>+ {languageInfo.code === 'es' ? 'Añadir' : 'Add'}</option>
              {CITIES_DATABASE
                .filter(c => !stripCities.some(sc => sc.id === c.id))
                .slice()
                .sort((a, b) => getTranslatedCity(a, languageInfo.code).localeCompare(getTranslatedCity(b, languageInfo.code), languageInfo.locale))
                .map(c => (
                  <option key={c.id} value={c.id}>
                    {getTranslatedCity(c, languageInfo.code)} ({getTranslatedCountry(c.countryCode, languageInfo.locale, c.country)})
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
    </section>
  );
};

