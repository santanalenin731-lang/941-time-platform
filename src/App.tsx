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
import { trackPageView, trackCitySelect, trackToolUsage } from './lib/firebase';

export type TabType = 'home' | 'city-detail' | 'world-clock' | 'compare' | 'stopwatch' | 'timer' | 'alarm' | 'about' | 'privacy' | 'blog';

interface ParsedRoute {
  tab: TabType;
  blogSlug: string | null;
  city: City | null;
  isSpecificCity: boolean;
}

const HASH_TO_TAB: Record<string, TabType> = {
  'world-clock': 'world-clock',
  'reloj-mundial': 'world-clock',
  'meeting-planner': 'compare',
  'compare': 'compare',
  'comparador': 'compare',
  'stopwatch': 'stopwatch',
  'cronometro': 'stopwatch',
  'timer': 'timer',
  'temporizador': 'timer',
  'alarm': 'alarm',
  'alarma': 'alarm',
  'about': 'about',
  'acerca-de': 'about',
  'privacy': 'privacy',
  'privacidad': 'privacy',
  'blog': 'blog',
};

const TAB_TO_HASH: Record<TabType, string | null> = {
  'home': null,
  'city-detail': null,
  'world-clock': 'world-clock',
  'compare': 'meeting-planner',
  'stopwatch': 'stopwatch',
  'timer': 'timer',
  'alarm': 'alarm',
  'about': 'about',
  'privacy': 'privacy',
  'blog': 'blog',
};

function parseRouteFromLocation(): ParsedRoute {
  if (typeof window === 'undefined') {
    return { tab: 'home', blogSlug: null, city: null, isSpecificCity: false };
  }

  const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!rawHash) {
    return { tab: 'home', blogSlug: null, city: null, isSpecificCity: false };
  }

  if (rawHash === 'blog') {
    return { tab: 'blog', blogSlug: null, city: null, isSpecificCity: false };
  }

  if (rawHash.startsWith('blog/')) {
    const slug = rawHash.replace('blog/', '').trim();
    return { tab: 'blog', blogSlug: slug || null, city: null, isSpecificCity: false };
  }

  if (HASH_TO_TAB[rawHash]) {
    return { tab: HASH_TO_TAB[rawHash], blogSlug: null, city: null, isSpecificCity: false };
  }

  // Check city SEO slugs (e.g. hora-en-madrid, time-in-new-york, or raw city id)
  const cleanSlug = rawHash.replace(/^hora-en-/, '').replace(/^time-in-/, '');
  const matched = CITIES_DATABASE.find(c =>
    c.seoSlug === rawHash ||
    c.id === cleanSlug ||
    c.id === rawHash ||
    c.seoSlug === `hora-en-${cleanSlug}`
  );

  if (matched) {
    return { tab: 'home', blogSlug: null, city: matched, isSpecificCity: true };
  }

  return { tab: 'home', blogSlug: null, city: null, isSpecificCity: false };
}

const AppContent: React.FC = () => {
  const { languageInfo } = useLanguage();

  // Synchronous route parsing on initial render so there is NO reset to home on page refresh
  const initialRoute = useRef<ParsedRoute>(parseRouteFromLocation()).current;

  const [activeTab, setActiveTab] = useState<TabType>(initialRoute.tab);
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(initialRoute.blogSlug);
  const detectedUserCityRef = useRef<City>(getDetectedUserCity());
  const [primaryCity, setPrimaryCity] = useState<City>(() => initialRoute.city || detectedUserCityRef.current);
  const [isSpecificCitySelected, setIsSpecificCitySelected] = useState<boolean>(initialRoute.isSpecificCity);
  const [isCityTransitioning, setIsCityTransitioning] = useState(false);
  const [is24Hour, setIs24Hour] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isManuallySelectedRef = useRef<boolean>(initialRoute.isSpecificCity);
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
    const isEn = languageInfo.code === 'en';

    if (activeTab === 'blog') {
      if (activeBlogSlug) {
        const targetHash = `blog/${activeBlogSlug}`;
        if (window.location.hash !== `#${targetHash}`) {
          window.location.hash = targetHash;
        }
        pageTitle = `Blog 9:41 AM — ${activeBlogSlug}`;
      } else {
        if (window.location.hash !== '#blog') {
          window.location.hash = 'blog';
        }
        pageTitle = isEn
          ? 'Blog 9:41 AM — Time Intelligence & Tech Culture'
          : 'Blog 9:41 AM — Inteligencia Horaria, Tiempo & Cultura Tech';
      }
    } else if (activeTab === 'world-clock') {
      if (window.location.hash !== '#world-clock') {
        window.location.hash = 'world-clock';
      }
      pageTitle = isEn ? 'World Clock — 9:41 AM' : 'Reloj Mundial — 9:41 AM';
    } else if (activeTab === 'compare') {
      if (window.location.hash !== '#meeting-planner') {
        window.location.hash = 'meeting-planner';
      }
      pageTitle = isEn
        ? 'Meeting Planner & Time Zone Comparator — 9:41 AM'
        : 'Planificador de Reuniones & Comparador Horario — 9:41 AM';
    } else if (activeTab === 'stopwatch') {
      if (window.location.hash !== '#stopwatch') {
        window.location.hash = 'stopwatch';
      }
      pageTitle = isEn ? 'Online Stopwatch — 9:41 AM' : 'Cronómetro Online — 9:41 AM';
    } else if (activeTab === 'timer') {
      if (window.location.hash !== '#timer') {
        window.location.hash = 'timer';
      }
      pageTitle = isEn ? 'Countdown Timer — 9:41 AM' : 'Temporizador Online — 9:41 AM';
    } else if (activeTab === 'alarm') {
      if (window.location.hash !== '#alarm') {
        window.location.hash = 'alarm';
      }
      pageTitle = isEn ? 'Online Alarm Clock — 9:41 AM' : 'Alarma Online — 9:41 AM';
    } else if (activeTab === 'about') {
      if (window.location.hash !== '#about') {
        window.location.hash = 'about';
      }
      pageTitle = isEn ? 'About 9:41 AM — Time, beautifully simple' : 'Acerca de 9:41 AM — Tiempo simple y exacto';
    } else if (activeTab === 'privacy') {
      if (window.location.hash !== '#privacy') {
        window.location.hash = 'privacy';
      }
      pageTitle = isEn ? 'Privacy Policy — 9:41 AM' : 'Política de Privacidad — 9:41 AM';
    } else if (isSpecificCitySelected && primaryCity) {
      const cityName = getTranslatedCity(primaryCity, languageInfo.code);
      const countryName = getTranslatedCountry(primaryCity.countryCode, languageInfo.locale, primaryCity.country);
      const slug = getCitySeoSlug(primaryCity, languageInfo.code);
      if (slug && window.location.hash !== `#${slug}`) {
        window.location.hash = slug;
      }
      pageTitle = isEn
        ? `Exact time in ${cityName}, ${countryName} — 9:41 AM`
        : `Hora exacta en ${cityName}, ${countryName} — 9:41 AM`;
    } else {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      pageTitle = isEn
        ? '9:41 AM — Time, beautifully simple'
        : '9:41 AM — Hora exacta, hermosa y simple';
    }

    document.title = pageTitle;
    trackPageView(pageTitle);
  }, [primaryCity, activeTab, activeBlogSlug, languageInfo, isSpecificCitySelected]);

  // Synchronize browser history Back/Forward button clicks
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseRouteFromLocation();
      setActiveTab(route.tab);
      setActiveBlogSlug(route.blogSlug);
      if (route.isSpecificCity && route.city) {
        isManuallySelectedRef.current = true;
        setIsSpecificCitySelected(true);
        setPrimaryCity(route.city);
      } else if (route.tab === 'home' && !route.isSpecificCity) {
        setIsSpecificCitySelected(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
    if (tab === 'home') {
      setIsSpecificCitySelected(false);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      const targetHash = TAB_TO_HASH[tab];
      if (targetHash && window.location.hash !== `#${targetHash}`) {
        window.location.hash = targetHash;
      }
    }
    trackToolUsage(tab, 'navigate');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Background IP Geolocation Detection: Automatically detects real physical location (e.g. Dominican Republic)
  // even if the user's computer/browser in an office has an inaccurate or generic timezone like America/La_Paz.
  useEffect(() => {
    const route = parseRouteFromLocation();
    if (route.isSpecificCity) {
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

  const handleSelectCity = (city: City, source: string = 'direct') => {
    isManuallySelectedRef.current = true;
    setIsSpecificCitySelected(true);
    setPrimaryCity(city);
    setActiveTab('home');
    const slug = getCitySeoSlug(city, languageInfo.code);
    if (slug && window.location.hash !== `#${slug}`) {
      window.location.hash = slug;
    }
    trackCitySelect(city.name, city.country, source);

    // Trigger visual screen transition / flash
    setIsCityTransitioning(true);
    setTimeout(() => {
      setIsCityTransitioning(false);
    }, 400);
  };

  const handleSelectCityFromSearch = (city: City) => {
    handleSelectCity(city, 'search_modal');
  };

  const handleLogoClick = () => {
    isManuallySelectedRef.current = false;
    setIsSpecificCitySelected(false);

    const deviceTz = (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch {
        return '';
      }
    })();
    const isDominican =
      deviceTz === 'America/Santo_Domingo' ||
      deviceTz.includes('Santo_Domingo') ||
      (typeof navigator !== 'undefined' && (navigator.language === 'es-DO' || (navigator.languages && navigator.languages.includes('es-DO'))));

    const targetCity = isDominican
      ? (CITIES_DATABASE.find(c => c.id === 'santo-domingo') || detectedUserCityRef.current)
      : detectedUserCityRef.current;

    setPrimaryCity(targetCity);
    setActiveTab('home');
    setActiveBlogSlug(null);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleSelectBlogPost = (slug: string) => {
    setActiveBlogSlug(slug);
    setActiveTab('blog');
    window.location.hash = `blog/${slug}`;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
              isSpecificCitySelected={isSpecificCitySelected}
              isTransitioning={isCityTransitioning}
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
                  handleNavigate('compare');
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
              onBackToBlog={() => {
                setActiveBlogSlug(null);
                window.location.hash = 'blog';
              }}
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
