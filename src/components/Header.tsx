import React, { useState } from 'react';
import { Search, Menu, X, Clock, Globe, ArrowLeftRight, Wrench, Languages, Check, Info, ShieldCheck, BookOpen } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../lib/i18n.tsx';

import { TabType } from '../App';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  is24Hour: boolean;
  setIs24Hour: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  is24Hour,
  setIs24Hour
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, languageInfo, setLanguage, t } = useLanguage();

  return (
    <header style={{
      width: '100%',
      background: 'transparent',
      position: 'relative',
      zIndex: 90
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Top Left: Logo Image on Clean White Background */}
        <div
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          title="9:41 AM"
        >
          <img
            src={`${import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/'}941am.PNG`}
            alt="Logo 9:41 AM"
            style={{
              height: '60px',
              width: '60px',
              borderRadius: '14px',
              objectFit: 'cover',
              display: 'block',
              boxShadow: '0 4px 16px rgba(7, 26, 51, 0.14)',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            lineHeight: 1.15
          }}>
            <span style={{
              fontSize: '1.15rem',
              fontWeight: 900,
              color: '#0D47A1',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase'
            }}>
              Time
            </span>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#0284C7',
              letterSpacing: '0.02em',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic'
            }}>
              beautifully simple.
            </span>
          </div>
        </div>

        {/* Top Right Controls on White Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Language Selector Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setMenuOpen(false);
              }}
              title={t.header.selectLanguage}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                background: langMenuOpen ? 'var(--color-sky-light)' : 'var(--color-bg-secondary)',
                border: `1px solid ${langMenuOpen ? 'var(--color-sky)' : 'var(--color-border)'}`,
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--color-navy)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              <Languages size={16} style={{ color: '#0284C7' }} />
              <span>{languageInfo.code.toUpperCase()}</span>
            </button>

            {/* Language Dropdown Menu (10 Languages) */}
            {langMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '125%',
                right: 0,
                zIndex: 110,
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 12px 36px rgba(7, 26, 51, 0.22)',
                border: '1px solid var(--color-border)',
                width: '190px',
                maxHeight: '380px',
                overflowY: 'auto',
                padding: '0.4rem 0',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  padding: '0.4rem 0.8rem 0.3rem 0.8rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#0284C7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid var(--color-border)',
                  marginBottom: '0.2rem'
                }}>
                  {t.header.selectLanguage}
                </div>
                {SUPPORTED_LANGUAGES.map(lang => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as LanguageCode);
                        setLangMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.55rem 0.85rem',
                        fontSize: '0.88rem',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? '#0284C7' : 'var(--color-navy)',
                        background: isSelected ? 'var(--color-sky-light)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'var(--color-bg-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span>{lang.nativeName}</span>
                      {isSelected && <Check size={16} style={{ color: '#0284C7' }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 12H / 24H Format Toggle */}
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            title="Cambiar formato 12H / 24H"
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--color-navy)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
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
            {is24Hour ? t.header.format24h : t.header.format12h}
          </button>

          {/* Search Icon */}
          <button
            onClick={onOpenSearch}
            title={t.header.searchPlaceholder}
            style={{
              padding: '0.5rem',
              color: 'var(--color-navy)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-sm)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Search size={22} />
          </button>

          {/* Menu Icon */}
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setLangMenuOpen(false);
            }}
            title="Menu"
            style={{
              padding: '0.5rem',
              color: 'var(--color-navy)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-sm)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Slide-out / Dropdown Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '1.5rem',
          zIndex: 100,
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 30px rgba(7, 26, 51, 0.25)',
          border: '1px solid var(--color-border)',
          width: '260px',
          padding: '0.75rem 0',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {[
            { id: 'home', label: t.nav.home, icon: Clock },
            { id: 'world-clock', label: t.nav.worldClock, icon: Globe },
            { id: 'compare', label: t.nav.compare, icon: ArrowLeftRight },
            { id: 'tools', label: t.nav.tools, icon: Wrench },
            { id: 'blog', label: t.nav.blog, icon: BookOpen },
            { id: 'about', label: t.about.title, icon: Info },
            { id: 'privacy', label: t.privacy.title, icon: ShieldCheck },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-sky-hover)' : 'var(--color-navy)',
                  background: isActive ? 'var(--color-sky-light)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};


