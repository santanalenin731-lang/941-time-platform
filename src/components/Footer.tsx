import React from 'react';
import { City } from '../data/cities';
import { useLanguage } from '../lib/i18n.tsx';
import { TabType } from '../App';

interface FooterProps {
  onSelectCity: (city: City) => void;
  popularCities: City[];
  onNavigate: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCity, popularCities, onNavigate }) => {
  const { t } = useLanguage();

  const globalTimezones = [
    "UTC", "GMT", "CET", "Pacific Time", "Mountain Time", "Central Time", "Eastern Time", "China Standard Time", "India Standard Time"
  ];

  const timezoneCityMap: Record<string, string> = {
    "UTC": "london",
    "GMT": "london",
    "CET": "paris",
    "Pacific Time": "los-angeles",
    "Mountain Time": "denver",
    "Central Time": "chicago",
    "Eastern Time": "new-york",
    "China Standard Time": "beijing",
    "India Standard Time": "new-delhi"
  };

  const handleTimezoneClick = (tz: string) => {
    const targetCityId = timezoneCityMap[tz];
    if (targetCityId) {
      const matchedCity = popularCities.find(c => c.id === targetCityId);
      if (matchedCity) {
        onSelectCity(matchedCity);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer style={{
      width: '100%',
      marginTop: '4rem',
      background: 'var(--color-navy-dark)',
      color: 'var(--color-white)',
      position: 'relative'
    }}>
      {/* Timezones Bar */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 0.85)'
      }}>
        {globalTimezones.map((tz) => (
          <span
            key={tz}
            onClick={() => handleTimezoneClick(tz)}
            title={`Ver hora exacta en ${tz}`}
            style={{ cursor: 'pointer', transition: 'var(--transition-fast)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-sky)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}
          >
            {tz}
          </span>
        ))}
      </div>

      {/* Main Footer Links */}
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '3rem 1.5rem 2rem 1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2.5rem',
        fontSize: '0.88rem',
        opacity: 0.95
      }}>
        {/* Col 1: Brand & Tagline */}
        <div>
          <img
            src={`${import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/'}941am.PNG`}
            alt="Logo 9:41 AM"
            onClick={() => onNavigate('home')}
            style={{
              height: '52px',
              width: '52px',
              borderRadius: '12px',
              objectFit: 'cover',
              display: 'block',
              marginBottom: '0.85rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
              cursor: 'pointer'
            }}
          />
          <p style={{ lineHeight: 1.5, opacity: 0.85, marginBottom: '0.75rem' }}>
            {t.footer.tagline}
          </p>
          <div style={{
            fontSize: '0.78rem',
            color: 'var(--color-sky)',
            fontWeight: 700
          }}>
            <span>Time, beautifully simple.</span>
          </div>
        </div>

        {/* Col 2: Suggested Cities */}
        <div>
          <div style={{ fontWeight: 700, color: 'var(--color-sky)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {t.search.suggested}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', opacity: 0.85 }}>
            {popularCities.slice(0, 5).map(city => (
              <span
                key={city.id}
                onClick={() => onSelectCity(city)}
                style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-sky)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-white)'}
              >
                {city.name} ({city.country})
              </span>
            ))}
          </div>
        </div>

        {/* Col 3: Tools */}
        <div>
          <div style={{ fontWeight: 700, color: 'var(--color-sky)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {t.nav.tools}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', opacity: 0.85 }}>
            <span
              style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
              onClick={() => onNavigate('world-clock')}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-sky)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-white)'}
            >
              {t.nav.worldClock}
            </span>

            <span
              style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
              onClick={() => onNavigate('compare')}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-sky)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-white)'}
            >
              {t.nav.compare}
            </span>

            <span
              style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
              onClick={() => onNavigate('compare')}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-sky)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-white)'}
            >
              {t.comparator.title}
            </span>

            <span
              style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
              onClick={() => onNavigate('tools')}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-sky)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-white)'}
            >
              UTC / GMT
            </span>
          </div>
        </div>

        {/* Col 4: Information & Legal */}
        <div>
          <div style={{ fontWeight: 700, color: 'var(--color-sky)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {t.footer.legalTitle}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <span
              onClick={() => onNavigate('blog')}
              style={{
                color: 'var(--color-white)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-sky)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-white)'}
            >
              {t.nav.blog}
            </span>

            <span
              onClick={() => onNavigate('about')}
              style={{
                color: 'var(--color-white)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-sky)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-white)'}
            >
              {t.about.title}
            </span>

            <span
              onClick={() => onNavigate('privacy')}
              style={{
                color: 'var(--color-white)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-sky)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-white)'}
            >
              {t.privacy.title}
            </span>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div style={{
        textAlign: 'center',
        padding: '1.25rem 1.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '0.78rem',
        opacity: 0.75
      }}>
        {t.privacy.rightsReserved}
      </div>
    </footer>
  );
};
