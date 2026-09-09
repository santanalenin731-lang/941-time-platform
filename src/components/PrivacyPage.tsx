import React from 'react';
import { useLanguage } from '../lib/i18n';
import { PRIVACY_CONTENT } from '../data/privacyContent';

interface PrivacyPageProps {
  onGoHome: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onGoHome }) => {
  const { language } = useLanguage();
  const content = PRIVACY_CONTENT[language] || PRIVACY_CONTENT.es;

  return (
    <div style={{
      maxWidth: '820px',
      margin: '0 auto',
      padding: '3rem 1.5rem 5rem 1.5rem',
      color: 'var(--color-navy)',
      fontFamily: 'var(--font-sans)',
      direction: language === 'ar' ? 'rtl' : 'ltr'
    }}>
      {/* Return Link */}
      <button
        onClick={onGoHome}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#0284C7',
          cursor: 'pointer',
          marginBottom: '2.5rem',
          display: 'inline-block'
        }}
      >
        {content.backToClock}
      </button>

      {/* Main Header */}
      <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          color: 'var(--color-navy)',
          margin: '0 0 0.75rem 0',
          letterSpacing: '-0.025em',
          lineHeight: 1.15
        }}>
          {content.title}
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#047857',
          fontWeight: 500,
          margin: 0,
          lineHeight: 1.6
        }}>
          {content.subtitle}
        </p>
      </header>

      {/* Article Body */}
      <article style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#334155' }}>
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', margin: '0 0 1rem 0', letterSpacing: '-0.01em' }}>
            {content.principlesTitle}
          </h2>
          <p style={{ marginBottom: '1.25rem' }}>
            {content.principlesP1}
          </p>
          <p style={{ marginBottom: '1.25rem' }}>
            {content.principlesP2}
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', margin: '0 0 1rem 0', letterSpacing: '-0.01em' }}>
            {content.noCookiesTitle}
          </h2>
          <p style={{ marginBottom: '1.25rem' }}>
            {content.noCookiesIntro}
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>{content.noCookiesItem1Title}</strong> {content.noCookiesItem1Desc}
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>{content.noCookiesItem2Title}</strong> {content.noCookiesItem2Desc}
          </p>
          <p style={{ marginBottom: '1.25rem' }}>
            <strong>{content.noCookiesItem3Title}</strong> {content.noCookiesItem3Desc}
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', margin: '0 0 1rem 0', letterSpacing: '-0.01em' }}>
            {content.localStorageTitle}
          </h2>
          <p style={{ marginBottom: '1.25rem' }}>
            {content.localStorageP1}
          </p>
          <p style={{ marginBottom: '1.25rem' }}>
            {content.localStorageP2}
          </p>
        </section>

        <section style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', margin: '0 0 1rem 0', letterSpacing: '-0.01em' }}>
            {content.legalTitle}
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            {content.legalP1}
          </p>
          <p style={{ fontSize: '0.95rem', color: '#64748B', margin: 0 }}>
            {content.legalP2}
          </p>
        </section>
      </article>
    </div>
  );
};
