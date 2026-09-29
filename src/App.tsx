import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroClock } from './components/HeroClock';
import { WorldClock } from './components/WorldClock';
import { TimeComparator } from './components/TimeComparator';
import { Stopwatch } from './components/Stopwatch';
import { Timer } from './components/Timer';
import { Alarm } from './components/Alarm';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CountryMarquee } from './components/CountryMarquee';
import { RealisticEarthGlobe } from './components/RealisticEarthGlobe';
import { AboutPage } from './components/AboutPage';
import { PrivacyPage } from './components/PrivacyPage';
import { BlogListPage } from './components/BlogListPage';
import { BlogPostPage } from './components/BlogPostPage';
import { CityInfoSection } from './components/CityInfoSection';
import { PWAInstallButton } from './components/PWAInstallButton';
import { CITIES_DATABASE, City, getDetectedUserCity } from './data/cities';
import { detectUserCityByIp } from './lib/geoIp';
import { getBlogPostBySlug } from './data/blogPosts';
import { LanguageProvider, useLanguage, getTranslatedCity, getTranslatedCountry, getCitySeoSlug } from './lib/i18n.tsx';
import { trackPageView, trackCitySelect } from './lib/firebase';

export type TabType = 'home' | 'city-detail' | 'world-clock' | 'compare' | 'stopwatch' | 'timer' | 'alarm' | 'about' | 'privacy' | 'blog';

const AppContent: React.FC = () => {
  const { languageInfo } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(null);
  const detectedUserCityRef = useRef<City>(getDetectedUserCity());
  const [primaryCity, setPrimaryCity] = useState<City>(() => detectedUserCityRef.current);
  const [isSpecificCitySelected, setIsSpecificCitySelected] = useState(false);
  const [is24Hour, setIs24Hour] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isManuallySelectedRef = useRef(false);
  const showSeconds = true; // Always show seconds permanently per user request

  // Load World Clock Cities from localStorage
  const [worldClockCities, setWorldClockCities] = useState<City[]>(() => {
    try {
      const saved = localStorage.getItem('941_world_clock');
      if (saved) {
        const parsedIds: string[] = JSON.parse(saved);
        return CITIES_DATABASE.filter(c => parsedIds.includes(c.id)).slice(0, 10);
      }
    } catch (e) {
      console.error(e);
    }
    return [
      CITIES_DATABASE[1], // New York
      CITIES_DATABASE[2], // London
      CITIES_DATABASE[3], // Tokyo
      CITIES_DATABASE[4]  // Madrid
    ];
  });

  // Track user preferences in LocalStorage
  useEffect(() => {
    try {
      const ids = worldClockCities.map(c => c.id);
      localStorage.setItem('941_world_clock', JSON.stringify(ids));
    } catch (e) {
      console.error(e);
    }
  }, [worldClockCities]);

  // Dynamic SEO Title, URL Hash Routing & Firebase Analytics
  useEffect(() => {
    let pageTitle = '9:41 AM — Time, beautifully simple';
    if (activeTab === 'blog') {
      if (activeBlogSlug) {
        window.location.hash = `blog/${activeBlogSlug}`;
        pageTitle = `Blog 9:41 AM — ${activeBlogSlug}`;
      } else {
        window.location.hash = 'blog';
        pageTitle = languageInfo.code === 'en'
          ? 'Blog 9:41 AM — Time Intelligence & Tech Culture'
          : 'Blog 9:41 AM — Inteligencia Horaria, Tiempo & Cultura Tech';
      }
    } else if (isSpecificCitySelected && primaryCity) {
      const cityName = getTranslatedCity(primaryCity, languageInfo.code);
      const countryName = getTranslatedCountry(primaryCity.countryCode, languageInfo.locale, primaryCity.country);
      const slug = getCitySeoSlug(primaryCity, languageInfo.code);
      window.location.hash = slug;
      pageTitle = languageInfo.code === 'en'
        ? `Exact time in ${cityName}, ${countryName} — 9:41 AM`
        : `Hora exacta en ${cityName}, ${countryName} — 9:41 AM`;
    } else if (primaryCity) {
      if (window.location.hash && !window.location.hash.startsWith('#blog')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      pageTitle = languageInfo.code === 'en'
        ? '9:41 AM — Time, beautifully simple'
        : '9:41 AM — Hora exacta, hermosa y simple';
    }
    document.title = pageTitle;
    trackPageView(pageTitle);
  }, [primaryCity, activeTab, activeBlogSlug, languageInfo, isSpecificCitySelected]);

  // Scroll to top immediately whenever active tab or blog slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab, activeBlogSlug]);

  const handleNavigate = (tab: TabType) => {
    setActiveTab(tab);
    if (tab !== 'blog') {
      setActiveBlogSlug(null);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Initial SEO Hash Resolution on Load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash) {
      if (hash === 'blog') {
        setActiveTab('blog');
        setActiveBlogSlug(null);
      } else if (hash.startsWith('blog/')) {
        const slug = hash.replace('blog/', '');
        setActiveTab('blog');
        setActiveBlogSlug(slug);
      } else {
        const cleanSlug = hash.replace('hora-en-', '').replace('time-in-', '');
        const matched = CITIES_DATABASE.find(c => c.seoSlug === hash || c.id === cleanSlug);
        if (matched) {
          isManuallySelectedRef.current = true;
          setIsSpecificCitySelected(true);
          setPrimaryCity(matched);
          setActiveTab('home');
        }
      }
    }
  }, []);

  // Background IP Geolocation Detection: Automatically detects real physical location (e.g. Dominican Republic)
  // even if the user's computer/browser in an office has an inaccurate or generic timezone like America/La_Paz.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').trim();
    const hasExplicitCityHash = Boolean(
      hash &&
      !hash.startsWith('blog') &&
      CITIES_DATABASE.some(c => c.seoSlug === hash || c.id === hash.replace('hora-en-', '').replace('time-in-', ''))
    );

    if (hasExplicitCityHash) {
      // User entered via a direct specific city URL link, do not override
      return;
    }

    detectUserCityByIp().then(ipCity => {
      if (ipCity) {
        detectedUserCityRef.current = ipCity;
        if (!isManuallySelectedRef.current) {
          setPrimaryCity(prevCity => {
            if (prevCity.id !== ipCity.id) {
              return ipCity;
            }
            return prevCity;
          });
        }
      }
    });
  }, []);

  const handleAddWorldClockCity = (city: City) => {
    if (worldClockCities.length >= 10) return;
    if (!worldClockCities.some(c => c.id === city.id) && city.id !== primaryCity.id) {
      setWorldClockCities(prev => [...prev, city]);
    }
  };

  const handleRemoveWorldClockCity = (cityId: string) => {
    setWorldClockCities(prev => prev.filter(c => c.id !== cityId));
  };

  const handleSelectCity = (city: City) => {
    isManuallySelectedRef.current = true;
    setIsSpecificCitySelected(true);
    setPrimaryCity(city);
    setActiveTab('home');
    trackCitySelect(city.name, city.country);
  };

  const handleSelectCityFromSearch = (city: City) => {
    handleSelectCity(city);
  };

  const handleLogoClick = () => {
    isManuallySelectedRef.current = false;
    setIsSpecificCitySelected(false);
    setPrimaryCity(detectedUserCityRef.current);
    setActiveTab('home');
    setActiveBlogSlug(null);
    if (window.location.hash && !window.location.hash.startsWith('#blog')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleSelectBlogPost = (slug: string) => {
    setActiveBlogSlug(slug);
    setActiveTab('blog');
    window.scrollTo(0, 0);
  };

  const currentBlogPost = activeBlogSlug ? getBlogPostBySlug(activeBlogSlug) : null;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-bg-main)',
      width: '100%',
      maxWidth: '100vw'
    }}>
      {/* Navbar Header */}
      <Header
        city={primaryCity}
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        is24Hour={is24Hour}
        setIs24Hour={setIs24Hour}
        onLogoClick={handleLogoClick}
      />

      {/* Main Content Body */}
      <main style={{
        flex: 1,
        padding: '0 1rem',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        {(activeTab === 'home' || activeTab === 'city-detail') && (
          <>
            {/* Master Clock - High contrast, maximum readability */}
            <HeroClock
              city={primaryCity}
              is24Hour={is24Hour}
              showSeconds={showSeconds}
              onSelectCity={handleSelectCity}
            />

            {/* Realistic 3D Earth Globe Section (Google Maps Style) */}
            <RealisticEarthGlobe
              city={primaryCity}
              onSelectCity={handleSelectCity}
            />

            {/* Minimalist Enriched City Information Section — ONLY visible when searching/selecting a specific city */}
            {isSpecificCitySelected && (
              <CityInfoSection
                city={primaryCity}
                is24Hour={is24Hour}
                onSelectCity={handleSelectCity}
                onOpenMeetingPlanner={(selectedCity) => {
                  setPrimaryCity(selectedCity);
                  setActiveTab('compare');
                }}
              />
            )}

            {/* Aesthetic Differentiation Section: Interactive 4-Row Typographic Country Stream */}
            <CountryMarquee onSelectCity={handleSelectCity} />
          </>
        )}

        {activeTab === 'world-clock' && (
          <WorldClock
            primaryCity={primaryCity}
            worldClockCities={worldClockCities}
            onRemoveCity={handleRemoveWorldClockCity}
            onAddCity={handleAddWorldClockCity}
            is24Hour={is24Hour}
            showSeconds={showSeconds}
          />
        )}

        {activeTab === 'compare' && (
          <TimeComparator
            initialCityA={primaryCity}
            initialCityB={CITIES_DATABASE[4]}
            is24Hour={is24Hour}
          />
        )}

        {activeTab === 'stopwatch' && (
          <Stopwatch />
        )}

        {activeTab === 'timer' && (
          <Timer />
        )}

        {activeTab === 'alarm' && (
          <Alarm is24Hour={is24Hour} />
        )}

        {activeTab === 'blog' && (
          currentBlogPost ? (
            <BlogPostPage
              post={currentBlogPost}
              onBackToBlog={() => setActiveBlogSlug(null)}
              onSelectPost={handleSelectBlogPost}
              is24Hour={is24Hour}
            />
          ) : (
            <BlogListPage
              onSelectPost={handleSelectBlogPost}
              onGoHome={() => handleNavigate('home')}
            />
          )
        )}

        {activeTab === 'about' && (
          <AboutPage onGoHome={() => handleNavigate('home')} />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPage onGoHome={() => handleNavigate('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating PWA Install Button */}
      <PWAInstallButton />

      {/* Instant Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCity={handleSelectCityFromSearch}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
