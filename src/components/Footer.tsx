import React from 'react';
import { useLanguage } from '../lib/i18n.tsx';
import { TabType } from '../App';

interface FooterProps {
  onNavigate: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer style={{
      width: '100%',
      marginTop: '4rem',
      background: 'var(--color-navy-dark)',
      color: 'var(--color-white)',
      position: 'relative'
    }}>
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
