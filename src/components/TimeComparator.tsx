import React, { useState } from 'react';
import { City, CITIES_DATABASE } from '../data/cities';
import { getTimeInTimezone, getTimeDifference } from '../lib/timeEngine';
import { ArrowLeftRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n.tsx';

interface TimeComparatorProps {
  initialCityA?: City;
  initialCityB?: City;
  is24Hour: boolean;
}

export const TimeComparator: React.FC<TimeComparatorProps> = ({
  initialCityA = CITIES_DATABASE[0], // Santo Domingo
  initialCityB = CITIES_DATABASE[4], // Madrid
  is24Hour
}) => {
  const [cityA, setCityA] = useState<City>(initialCityA);
  const [cityB, setCityB] = useState<City>(initialCityB);
  const { languageInfo, t } = useLanguage();

  const timeA = getTimeInTimezone(cityA.timezone, is24Hour, true, 0, languageInfo.locale);
  const timeB = getTimeInTimezone(cityB.timezone, is24Hour, true, 0, languageInfo.locale);
  const diff = getTimeDifference(cityA, cityB);

  // Generate 24-hour timeline slots
  const hoursArray = Array.from({ length: 24 }, (_, i) => i);

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
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--color-navy)'
        }}>
          <ArrowLeftRight size={24} color="var(--color-sky-hover)" />
          <span>{t.comparator.title}</span>
        </div>
      </div>

      {/* Selectors for City A & City B */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '1rem',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        {/* City A Selector */}
        <div style={{
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)'
        }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            {cityA.name}
          </label>
          <select
            value={cityA.id}
            onChange={(e) => {
              const selected = CITIES_DATABASE.find(c => c.id === e.target.value);
              if (selected) setCityA(selected);
            }}
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-white)',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--color-navy)',
              outline: 'none'
            }}
          >
            {CITIES_DATABASE.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.country})</option>
            ))}
          </select>

          <div style={{ marginTop: '1rem' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2.4rem',
              fontWeight: 700,
              color: 'var(--color-navy)',
              lineHeight: 1
            }}>
              {timeA.timeString}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              {timeA.dateString} · {timeA.utcOffset}
            </div>
          </div>
        </div>

        {/* Difference Indicator Pill */}
        <div style={{
          textAlign: 'center',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-sky-light)',
          border: '1px solid var(--color-sky)',
          color: 'var(--color-navy-deep)',
          fontWeight: 700,
          fontSize: '0.9rem',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <div>{t.comparator.difference}</div>
          <div style={{ fontSize: '1.1rem', color: 'var(--color-navy)' }}>{diff.formattedDiff}</div>
        </div>

        {/* City B Selector */}
        <div style={{
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)'
        }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            {cityB.name}
          </label>
          <select
            value={cityB.id}
            onChange={(e) => {
              const selected = CITIES_DATABASE.find(c => c.id === e.target.value);
              if (selected) setCityB(selected);
            }}
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-white)',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--color-navy)',
              outline: 'none'
            }}
          >
            {CITIES_DATABASE.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.country})</option>
            ))}
          </select>

          <div style={{ marginTop: '1rem' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2.4rem',
              fontWeight: 700,
              color: 'var(--color-navy)',
              lineHeight: 1
            }}>
              {timeB.timeString}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              {timeB.dateString} · {timeB.utcOffset}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 24-Hour Visual Timeline */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)' }}>
            {t.comparator.overlap}
          </span>
        </div>

        {/* Timeline Row for City A */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.3rem' }}>
            {cityA.name}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)', gap: '2px', height: '36px' }}>
            {hoursArray.map(hour => {
              const isWork = hour >= 9 && hour <= 17;
              const isCurrent = hour === timeA.hours;
              return (
                <div
                  key={hour}
                  title={`${hour}:00 en ${cityA.name}`}
                  style={{
                    background: isCurrent
                      ? 'var(--color-navy)'
                      : isWork
                      ? 'var(--color-sky-light)'
                      : '#E2E8F0',
                    border: isWork ? '1px solid var(--color-sky)' : 'none',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: isCurrent ? 'var(--color-white)' : isWork ? 'var(--color-navy)' : 'var(--color-text-muted)'
                  }}
                >
                  {hour}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Row for City B */}
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.3rem' }}>
            {cityB.name}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)', gap: '2px', height: '36px' }}>
            {hoursArray.map(hour => {
              const isWork = hour >= 9 && hour <= 17;
              const isCurrent = hour === timeB.hours;
              return (
                <div
                  key={hour}
                  title={`${hour}:00 en ${cityB.name}`}
                  style={{
                    background: isCurrent
                      ? 'var(--color-navy)'
                      : isWork
                      ? 'var(--color-sky-light)'
                      : '#E2E8F0',
                    border: isWork ? '1px solid var(--color-sky)' : 'none',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: isCurrent ? 'var(--color-white)' : isWork ? 'var(--color-navy)' : 'var(--color-text-muted)'
                  }}
                >
                  {hour}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

