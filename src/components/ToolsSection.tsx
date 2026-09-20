import React, { useState } from 'react';
import { CITIES_DATABASE, City } from '../data/cities';
import { findBestMeetingTime } from '../lib/timeEngine';
import { Hash, Users } from 'lucide-react';
import { useLanguage } from '../lib/i18n.tsx';

export const ToolsSection: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'planner' | 'timer' | 'unix'>('planner');
  const { t } = useLanguage();

  // Meeting Planner State
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);
  const [selectedMeetingCities, setSelectedMeetingCities] = useState<City[]>([
    CITIES_DATABASE[0], // Santo Domingo
    CITIES_DATABASE[1], // New York
    CITIES_DATABASE[4]  // Madrid
  ]);

  // Unix Timestamp State
  const [inputUnix, setInputUnix] = useState(() => Math.floor(Date.now() / 1000).toString());
  const [convertedDate, setConvertedDate] = useState(() => new Date().toISOString());

  const handleUnixChange = (val: string) => {
    setInputUnix(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setConvertedDate(new Date(num * 1000).toUTCString());
    } else {
      setConvertedDate('Invalid Timestamp');
    }
  };

  const meetingResults = findBestMeetingTime(selectedMeetingCities);

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
          <span>{t.tools.title}</span>
        </div>
      </div>

      {/* Tool Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '0.5rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'planner', label: t.comparator.title, icon: Users },
          { id: 'unix', label: t.tools.converter, icon: Hash },
        ].map(tool => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-navy)' : 'var(--color-text-muted)',
                background: isActive ? 'var(--color-sky-light)' : 'transparent',
                border: isActive ? '1px solid var(--color-sky)' : '1px solid transparent',
                transition: 'var(--transition-fast)'
              }}
            >
              <Icon size={18} color={isActive ? 'var(--color-navy-deep)' : 'currentColor'} />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOOL 1: Meeting Planner */}
      {activeTool === 'planner' && (
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
            {t.comparator.title}
          </h3>

          <div style={{
            padding: '1.25rem',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {selectedMeetingCities.map(city => (
                <div
                  key={city.id}
                  onMouseEnter={() => setHoveredCityId(city.id)}
                  onMouseLeave={() => setHoveredCityId(null)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-white)',
                    border: '1px solid var(--color-sky)',
                    color: 'var(--color-navy)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>{city.name}</span>
                  {selectedMeetingCities.length > 2 && (
                    <button
                      onClick={() => setSelectedMeetingCities(prev => prev.filter(c => c.id !== city.id))}
                      style={{ 
                        color: '#EF4444', 
                        fontWeight: 700, 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        opacity: hoveredCityId === city.id ? 1 : 0,
                        pointerEvents: hoveredCityId === city.id ? 'auto' : 'none',
                        transition: 'opacity 0.2s ease',
                        width: '12px'
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {t.comparator.addCity}:
              <select
                onChange={(e) => {
                  const city = CITIES_DATABASE.find(c => c.id === e.target.value);
                  if (city && !selectedMeetingCities.some(c => c.id === city.id)) {
                    setSelectedMeetingCities(prev => [...prev, city]);
                  }
                }}
                style={{
                  marginLeft: '0.5rem',
                  padding: '0.35rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <option value="">+ {t.comparator.addCity}...</option>
                {CITIES_DATABASE.filter(c => !selectedMeetingCities.some(sc => sc.id === c.id)).map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.country})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Output */}
          <div style={{
            padding: '1.5rem',
            background: 'var(--color-sky-light)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-sky)'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-navy-deep)', letterSpacing: '0.05em' }}>
              {t.comparator.overlap}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {meetingResults.bestLocalTimes.map(res => (
                <div
                  key={res.cityName}
                  style={{
                    padding: '1rem',
                    background: 'var(--color-white)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                    {res.cityName}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--color-navy)',
                    margin: '0.2rem 0'
                  }}>
                    {res.localTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: Unix Timestamp */}
      {activeTool === 'unix' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem 0' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1rem' }}>
            {t.tools.converter}
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              UNIX TIMESTAMP:
            </label>
            <input
              type="text"
              value={inputUnix}
              onChange={(e) => handleUnixChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--color-navy)'
              }}
            />
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
              UTC DATE & TIME:
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--color-navy)',
              marginTop: '0.4rem'
            }}>
              {convertedDate}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

