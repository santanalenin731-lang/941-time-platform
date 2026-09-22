import React, { useState, useEffect, useRef } from 'react';
import { City, CITIES_DATABASE } from '../data/cities';
import { getTimeInTimezone, getTimeDifference, calculateSunTimes } from '../lib/timeEngine';
import { useLanguage, getTranslatedCountry, getTranslatedCity, getTranslatedRegion } from '../lib/i18n.tsx';
import { Search, Plus, X } from 'lucide-react';
import dayImage from '../assets/world-clock/day.jpg';
import nightImage from '../assets/world-clock/night.jpg';

interface WorldClockProps {
  primaryCity: City;
  worldClockCities: City[];
  onRemoveCity: (cityId: string) => void;
  onAddCity: (city: City) => void;
  is24Hour: boolean;
  showSeconds: boolean;
}

export const WorldClock: React.FC<WorldClockProps> = ({
  primaryCity,
  worldClockCities,
  onRemoveCity,
  onAddCity,
  is24Hour,
  showSeconds
}) => {
  const { t, languageInfo } = useLanguage();
  const [, setTick] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle clicking outside of search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unaddedCities = CITIES_DATABASE.filter(
    c => c.id !== primaryCity.id && !worldClockCities.some(wc => wc.id === c.id)
  );

  const filteredSearchCities = unaddedCities.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const transName = getTranslatedCity(c, languageInfo.code).toLowerCase();
    const transCountry = getTranslatedCountry(c.countryCode, languageInfo.locale, c.country).toLowerCase();
    const transRegion = getTranslatedRegion(c.region, languageInfo.code).toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      transName.includes(q) ||
      c.country.toLowerCase().includes(q) ||
      transCountry.includes(q) ||
      c.region.toLowerCase().includes(q) ||
      transRegion.includes(q) ||
      (c.seoSlug && c.seoSlug.toLowerCase().includes(q))
    );
  });

  const primaryTime = getTimeInTimezone(primaryCity.timezone, is24Hour, showSeconds, 0, languageInfo.locale);
  const sunData = calculateSunTimes(primaryCity.lat, primaryCity.lng, primaryCity.timezone);
  const isDay = sunData.isDaylight;

  return (
    <div style={{
      maxWidth: 'var(--max-width)',
      margin: '2rem auto',
      padding: '2rem 1.5rem',
      background: 'var(--color-bg-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      border: '1px solid var(--color-border)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--color-navy)'
          }}>
            <span>{t.worldClock.title}</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
            {t.worldClock.subtitle}
          </p>
        </div>
      </div>

      {/* Primary User City Card */}
      <div style={{
        padding: '1.4rem 1.65rem',
        borderRadius: 'var(--radius-md)',
        position: 'relative',
        overflow: 'hidden',
        color: 'var(--color-white)',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: isDay
          ? '0 8px 25px rgba(2, 132, 199, 0.25)'
          : '0 8px 25px rgba(7, 26, 51, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        minHeight: '90px'
      }}>
        {/* Background Day Layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(7, 26, 51, 0.12), rgba(7, 26, 51, 0.28)), url(${dayImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDay ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: 0
        }} />

        {/* Background Night Layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(7, 26, 51, 0.45), rgba(7, 26, 51, 0.62)), url(${nightImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDay ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: isDay ? '#E0F2FE' : 'var(--color-sky)',
            letterSpacing: '0.06em',
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.7)'
          }}>
            {t.worldClock.primaryLocation}
          </div>
          <div style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#FFFFFF',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
          }}>
            {getTranslatedCity(primaryCity, languageInfo.code)}, {getTranslatedCountry(primaryCity.countryCode, languageInfo.locale, primaryCity.country)}
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: '#FFFFFF',
            opacity: 0.92,
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.65)'
          }}>
            {primaryTime.dateString}
          </div>
        </div>

        <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-clock)',
            fontSize: '2.4rem',
            fontWeight: 800,
            color: isDay ? '#FFFFFF' : 'var(--color-sky)',
            textShadow: isDay
              ? '0 4px 16px rgba(0, 0, 0, 0.65), 0 2px 6px rgba(7, 26, 51, 0.8)'
              : '0 4px 18px rgba(56, 189, 248, 0.65), 0 2px 8px rgba(0, 0, 0, 0.7)',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums'
          }}>
            {primaryTime.timeString}
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: '#FFFFFF',
            opacity: 0.9,
            marginTop: '0.2rem',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.65)'
          }}>
            {primaryTime.utcOffset}
          </div>
        </div>
      </div>

      {/* Grid of Pinned World Clock Cities */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {worldClockCities.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            padding: '3rem 1.5rem',
            textAlign: 'center',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-muted)'
          }}>
            {t.worldClock.emptyList}
          </div>
        ) : (
          worldClockCities.map((city) => {
            const time = getTimeInTimezone(city.timezone, is24Hour, showSeconds, 0, languageInfo.locale);
            const diff = getTimeDifference(primaryCity, city, languageInfo.locale);

            return (
              <div
                key={city.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  position: 'relative',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-sky)';
                  const btn = e.currentTarget.querySelector('.wc-remove-btn') as HTMLElement;
                  if (btn) btn.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  const btn = e.currentTarget.querySelector('.wc-remove-btn') as HTMLElement;
                  if (btn) btn.style.opacity = '0';
                }}
              >
                <button
                  className="wc-remove-btn"
                  title={t.worldClock.removeCity}
                  onClick={() => onRemoveCity(city.id)}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#e11d48',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    fontSize: '12px',
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
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      color: 'var(--color-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      {getTranslatedCity(city, languageInfo.code)}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {getTranslatedCountry(city.countryCode, languageInfo.locale, city.country)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-white)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-navy)'
                    }}>
                      {diff.formattedDiff}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'var(--font-clock)',
                      fontSize: '1.65rem',
                      fontWeight: 800,
                      color: '#0284C7',
                      fontVariantNumeric: 'tabular-nums',
                      textShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
                      lineHeight: 1
                    }}>
                      {time.timeString}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.25rem' }}>
                      {time.utcOffset}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {worldClockCities.length < 10 && (
        <>
          {/* Interactive City Search and Full Dropdown Selector Box */}
          <div
            ref={searchContainerRef}
            style={{
              background: 'var(--color-bg-secondary)',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              marginBottom: '1.5rem',
              position: 'relative'
            }}
          >
            <div style={{
              fontSize: '0.92rem',
              fontWeight: 700,
              color: 'var(--color-navy)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Search size={18} color="#0284C7" />
              <span>{t.worldClock.searchTitle}</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'var(--color-white)',
              border: '1.5px solid var(--color-sky)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.65rem 1rem',
              boxShadow: '0 2px 8px rgba(7, 26, 51, 0.06)'
            }}>
              <Search size={18} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder={t.worldClock.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'var(--color-navy)',
                  background: 'transparent'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Floating Live Autocomplete Dropdown */}
            {isSearchFocused && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 80,
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 12px 36px rgba(7, 26, 51, 0.2)',
                border: '1px solid var(--color-border)',
                maxHeight: '320px',
                overflowY: 'auto',
                marginTop: '0.5rem',
                padding: '0.4rem 0'
              }}>
                {filteredSearchCities.length === 0 ? (
                  <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
                    {t.worldClock.noResults} "{searchQuery}"
                  </div>
                ) : (
                  filteredSearchCities.map((city) => {
                    const time = getTimeInTimezone(city.timezone, is24Hour, showSeconds, 0, languageInfo.locale);
                    return (
                      <div
                        key={city.id}
                        onClick={() => {
                          onAddCity(city);
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1.25rem',
                          cursor: 'pointer',
                          borderBottom: '1px solid var(--color-bg-secondary)',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-sky-light)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-navy)' }}>
                            {getTranslatedCity(city, languageInfo.code)}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                            {getTranslatedCountry(city.countryCode, languageInfo.locale, city.country)} · {getTranslatedRegion(city.region, languageInfo.code)}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: 'var(--color-sky-hover)',
                          fontSize: '0.85rem',
                          fontWeight: 600
                        }}>
                          <span>{time.timeString}</span>
                          <button
                            style={{
                              background: 'var(--color-sky-light)',
                              border: 'none',
                              color: 'var(--color-sky)',
                              padding: '0.3rem 0.6rem',
                              borderRadius: 'var(--radius-sm)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <Plus size={14} />
                            <span>{t.worldClock.add}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Quick Add Cities Bar */}
          {unaddedCities.length > 0 && (
            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border)'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                {t.worldClock.quickSuggestions}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {unaddedCities.slice(0, 10).map((city) => (
                  <button
                    key={city.id}
                    onClick={() => onAddCity(city)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: 'var(--color-navy)',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-sky-hover)';
                      e.currentTarget.style.background = 'var(--color-sky-light)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.background = 'var(--color-bg-secondary)';
                    }}
                  >
                    <Plus size={14} color="var(--color-sky-hover)" />
                    <span>{getTranslatedCity(city, languageInfo.code)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
