import React, { useState, useEffect, useRef } from 'react';
import { CITIES_DATABASE, City } from '../data/cities';
import { getTimeInTimezone } from '../lib/timeEngine';
import { Search, X } from 'lucide-react';
import { useLanguage, getTranslatedCountry, getTranslatedCity, getTranslatedRegion, getCitySeoSlug } from '../lib/i18n.tsx';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: City) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectCity }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, languageInfo } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          inputRef.current?.focus();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCities = CITIES_DATABASE.filter(city => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const transName = getTranslatedCity(city, languageInfo.code).toLowerCase();
    const transCountry = getTranslatedCountry(city.countryCode, languageInfo.locale, city.country).toLowerCase();
    const transRegion = getTranslatedRegion(city.region, languageInfo.code).toLowerCase();
    const localizedSlug = getCitySeoSlug(city, languageInfo.code).toLowerCase();

    return (
      city.name.toLowerCase().includes(q) ||
      transName.includes(q) ||
      city.country.toLowerCase().includes(q) ||
      transCountry.includes(q) ||
      city.timezone.toLowerCase().includes(q) ||
      city.region.toLowerCase().includes(q) ||
      transRegion.includes(q) ||
      localizedSlug.includes(q) ||
      (city.seoSlug && city.seoSlug.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(7, 26, 51, 0.45)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '4rem 1rem 2rem 1rem'
    }} onClick={onClose}>
      <div style={{
        width: '100%',
        maxWidth: '620px',
        background: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden'
      }} onClick={(e) => e.stopPropagation()}>
        {/* Search Bar Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <Search size={22} color="var(--color-sky-hover)" />
          <input
            ref={inputRef}
            type="text"
            placeholder={t.search.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '1.1rem',
              fontWeight: 500,
              color: 'var(--color-navy)',
              background: 'transparent'
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Autocomplete Results List */}
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '0.5rem 0'
        }}>
          {filteredCities.length === 0 ? (
            <div style={{
              padding: '2.5rem',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              fontSize: '0.95rem'
            }}>
              {t.search.noResults} "{query}"
            </div>
          ) : (
            filteredCities.map((city) => {
              const time = getTimeInTimezone(city.timezone, false, false, 0, languageInfo.locale);
              const seoSlug = getCitySeoSlug(city, languageInfo.code);
              return (
                <div
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.9rem 1.5rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                    borderBottom: '1px solid var(--color-bg-secondary)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-bg-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-navy)' }}>
                      {getTranslatedCity(city, languageInfo.code)}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                      {getTranslatedCountry(city.countryCode, languageInfo.locale, city.country)} · {getTranslatedRegion(city.region, languageInfo.code)}
                    </div>
                    {/* SEO Friendly Link Banner Badge */}
                    <div style={{
                      fontSize: '0.73rem',
                      fontWeight: 700,
                      color: '#0284C7',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginTop: '0.15rem'
                    }}>
                      <span>941.am/#{seoSlug}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: 'var(--color-navy)'
                    }}>
                      {time.timeString}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                      {time.utcOffset}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};


