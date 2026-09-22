import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, Clock, Globe, Users, Languages, Check, Info, ShieldCheck, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../lib/i18n.tsx';
import { getTimeInTimezone } from '../lib/timeEngine';

import { TabType } from '../App';

interface HeaderProps {
  city: import("../data/cities").City;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  is24Hour: boolean;
  setIs24Hour: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  city,
  activeTab,
  setActiveTab,
  onOpenSearch,
  is24Hour,
  setIs24Hour
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, languageInfo, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setLangMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const [timeData, setTimeData] = useState(() =>
    getTimeInTimezone(city?.timezone || 'UTC', is24Hour, true, 0, languageInfo.locale)
  );

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(scrollPos > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const showTime = activeTab !== 'home' || isScrolled;
    if (!showTime || !city) return;
    const timer = setInterval(() => {
      setTimeData(getTimeInTimezone(city.timezone, is24Hour, true, 0, languageInfo.locale));
    }, 100);
    return () => clearInterval(timer);
  }, [city, is24Hour, languageInfo.locale, activeTab, isScrolled]);

  const showTime = activeTab !== 'home' || isScrolled;

  return (
    <header style={{
      width: '100%',
      background: 'rgba(240, 246, 250, 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: showTime ? '1px solid rgba(7, 26, 51, 0.08)' : '1px solid transparent',
      boxShadow: showTime ? '0 4px 20px rgba(7, 26, 51, 0.06)' : 'none',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'box-shadow 0.25s ease, border-bottom 0.25s ease'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: showTime ? '0.65rem 1rem' : '0.9rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'padding 0.25s ease',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        {/* Top Left: Logo Image and Dynamic Time */}
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
              height: showTime ? '40px' : '50px',
              width: showTime ? '40px' : '50px',
              borderRadius: showTime ? '9px' : '12px',
              objectFit: 'cover',
              display: 'block',
              boxShadow: '0 4px 14px rgba(7, 26, 51, 0.12)',
              transition: 'transform 0.15s ease, height 0.25s ease, width 0.25s ease, border-radius 0.25s ease'
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
            {showTime && city ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                <span style={{
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: '#0284C7',
                  fontVariantNumeric: 'tabular-nums',
                  fontFeatureSettings: '"tnum"',
                  fontFamily: 'var(--font-clock)'
                }}>
                  {timeData.timeDigits}
                </span>
                {!is24Hour && timeData.period && (
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: '#0284C7',
                    fontFamily: 'var(--font-clock)'
                  }}>
                    {timeData.period}
                  </span>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Top Right Controls on White Header (Minimalist: Search + Menu) */}
        <div ref={menuContainerRef} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', position: 'relative' }}>
          {/* Search Icon */}
          <button
            onClick={onOpenSearch}
            title={t.header.searchPlaceholder}
            style={{
              padding: '0.55rem',
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

          {/* Menu Icon (3 bars) */}
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            title="Menu"
            style={{
              padding: '0.55rem',
              color: 'var(--color-navy)',
              background: menuOpen ? 'var(--color-bg-secondary)' : 'transparent',
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
              if (!menuOpen) e.currentTarget.style.background = 'transparent';
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Slide-out / Dropdown Menu */}
          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 0.65rem)',
              right: 0,
              zIndex: 110,
              background: 'var(--color-white)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 12px 36px rgba(7, 26, 51, 0.22)',
              border: '1px solid var(--color-border)',
              width: '280px',
              padding: '0.5rem 0',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Internal Setting 1: 12H / 24H Toggle */}
              <div style={{
                padding: '0.65rem 1rem',
                borderBottom: '1px solid var(--color-border)'
              }}>
                <div style={{
                  display: 'flex',
                  background: '#EAEFF5',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px',
                  gap: '4px',
                  border: '1px solid #D5E1ED'
                }}>
                  <button
                    onClick={() => setIs24Hour(false)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.6rem',
                      fontSize: '0.82rem',
                      fontWeight: !is24Hour ? 800 : 500,
                      color: !is24Hour ? '#0284C7' : '#64748B',
                      background: !is24Hour ? '#FFFFFF' : 'transparent',
                      borderRadius: 'var(--radius-sm)',
                      border: !is24Hour ? '1px solid rgba(2, 132, 199, 0.3)' : '1px solid transparent',
                      cursor: 'pointer',
                      boxShadow: !is24Hour ? '0 4px 14px rgba(7, 26, 51, 0.22), 0 2px 4px rgba(2, 132, 199, 0.2)' : 'none',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      textAlign: 'center',
                      transform: !is24Hour ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    {t.header.format12h} (AM/PM)
                  </button>
                  <button
                    onClick={() => setIs24Hour(true)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.6rem',
                      fontSize: '0.82rem',
                      fontWeight: is24Hour ? 800 : 500,
                      color: is24Hour ? '#0284C7' : '#64748B',
                      background: is24Hour ? '#FFFFFF' : 'transparent',
                      borderRadius: 'var(--radius-sm)',
                      border: is24Hour ? '1px solid rgba(2, 132, 199, 0.3)' : '1px solid transparent',
                      cursor: 'pointer',
                      boxShadow: is24Hour ? '0 4px 14px rgba(7, 26, 51, 0.22), 0 2px 4px rgba(2, 132, 199, 0.2)' : 'none',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      textAlign: 'center',
                      transform: is24Hour ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    {t.header.format24h}
                  </button>
                </div>
              </div>

              {/* Internal Setting 2: Language Selector */}
              <div style={{
                padding: '0.65rem 1rem',
                borderBottom: '1px solid var(--color-border)'
              }}>
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    background: langMenuOpen ? 'var(--color-sky-light)' : 'var(--color-bg-secondary)',
                    border: `1px solid ${langMenuOpen ? 'var(--color-sky)' : 'var(--color-border)'}`,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-navy)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Languages size={17} style={{ color: '#0284C7' }} />
                    <span>{languageInfo.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      background: '#0284C7',
                      color: '#FFFFFF',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px',
                      fontWeight: 800
                    }}>
                      {languageInfo.code.toUpperCase()}
                    </span>
                    {langMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Collapsible 10 Languages List */}
                {langMenuOpen && (
                  <div style={{
                    marginTop: '0.5rem',
                    background: 'var(--color-white)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    maxHeight: '190px',
                    overflowY: 'auto',
                    padding: '0.2rem 0',
                    boxShadow: '0 4px 12px rgba(7, 26, 51, 0.08)'
                  }}>
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
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.45rem 0.85rem',
                            fontSize: '0.84rem',
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
                          {isSelected && <Check size={15} style={{ color: '#0284C7' }} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div style={{ padding: '0.35rem 0' }}>
                {[
                  { id: 'home', label: t.nav.home, icon: Clock },
                  { id: 'world-clock', label: t.nav.worldClock, icon: Globe },
                  { id: 'compare', label: t.comparator.title, icon: Users },
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
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.65rem 1.25rem',
                        fontSize: '0.92rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? 'var(--color-sky-hover)' : 'var(--color-navy)',
                        background: isActive ? 'var(--color-sky-light)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'var(--color-bg-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


