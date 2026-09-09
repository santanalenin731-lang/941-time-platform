import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroClock } from './components/HeroClock';
import { WorldClock } from './components/WorldClock';
import { TimeComparator } from './components/TimeComparator';
import { ToolsSection } from './components/ToolsSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CountryMarquee } from './components/CountryMarquee';
import { RealisticEarthGlobe } from './components/RealisticEarthGlobe';
import { AboutPage } from './components/AboutPage';
import { PrivacyPage } from './components/PrivacyPage';
import { BlogListPage } from './components/BlogListPage';
import { BlogPostPage } from './components/BlogPostPage';
import { CITIES_DATABASE, City, getDetectedUserCity } from './data/cities';
import { getBlogPostBySlug } from './data/blogPosts';
import { LanguageProvider } from './lib/i18n.tsx';
import { trackPageView, trackCitySelect } from './lib/firebase';

export type TabType = 'home' | 'world-clock' | 'compare' | 'tools' | 'about' | 'privacy' | 'blog';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(null);
  const [primaryCity, setPrimaryCity] = useState<City>(() => getDetectedUserCity());
  const [is24Hour, setIs24Hour] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const showSeconds = true; // Always show seconds permanently per user request

  // Load World Clock Cities from localStorage
  const [worldClockCities, setWorldClockCities] = useState<City[]>(() => {
    try {
      const saved = localStorage.getItem('941_world_clock');
      if (saved) {
        const parsedIds: string[] = JSON.parse(saved);
        return CITIES_DATABASE.filter(c => parsedIds.includes(c.id));
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

  // Save to localStorage
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
        pageTitle = 'Blog 9:41 AM — Inteligencia Horaria, Tiempo & Cultura Tech';
      }
    } else if (primaryCity) {
      const slug = primaryCity.seoSlug || `hora-en-${primaryCity.id}`;
      window.location.hash = slug;
      pageTitle = `${primaryCity.seoTitle || `Hora exacta en ${primaryCity.name}`} — 9:41 AM`;
    }
    document.title = pageTitle;
    trackPageView(pageTitle);
  }, [primaryCity, activeTab, activeBlogSlug]);

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
        const matched = CITIES_DATABASE.find(c => c.seoSlug === hash || c.id === hash.replace('hora-en-', ''));
        if (matched) {
          setPrimaryCity(matched);
        }
      }
    }
  }, []);

  const handleAddWorldClockCity = (city: City) => {
    if (!worldClockCities.some(c => c.id === city.id) && city.id !== primaryCity.id) {
      setWorldClockCities(prev => [...prev, city]);
    }
  };

  const handleRemoveWorldClockCity = (cityId: string) => {
    setWorldClockCities(prev => prev.filter(c => c.id !== cityId));
  };

  const handleSelectCityFromSearch = (city: City) => {
    setPrimaryCity(city);
    setActiveTab('home');
    trackCitySelect(city.name, city.country);
  };

  const handleSelectBlogPost = (slug: string) => {
    setActiveBlogSlug(slug);
    setActiveTab('blog');
    window.scrollTo(0, 0);
  };

  const currentBlogPost = activeBlogSlug ? getBlogPostBySlug(activeBlogSlug) : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-main)' }}>
      {/* Navbar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'blog') setActiveBlogSlug(null);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        is24Hour={is24Hour}
        setIs24Hour={setIs24Hour}
      />

      {/* Main Content Body */}
      <main style={{ flex: 1, padding: '0 1rem' }}>
        {activeTab === 'home' && (
          <>
            {/* Single Focal Hero Clock */}
            <HeroClock
              city={primaryCity}
              is24Hour={is24Hour}
              showSeconds={showSeconds}
              onSelectCity={setPrimaryCity}
              onAddToWorldClock={handleAddWorldClockCity}
              isCityInWorldClock={worldClockCities.some(c => c.id === primaryCity.id)}
            />

            {/* Realistic 3D Earth Globe Section (Google Maps Style) */}
            <RealisticEarthGlobe
              city={primaryCity}
              onSelectCity={setPrimaryCity}
            />

            {/* Aesthetic Differentiation Section: Interactive 4-Row Typographic Country Stream */}
            <CountryMarquee onSelectCity={setPrimaryCity} />
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

        {activeTab === 'tools' && (
          <ToolsSection />
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
              onGoHome={() => setActiveTab('home')}
            />
          )
        )}

        {activeTab === 'about' && (
          <AboutPage onGoHome={() => setActiveTab('home')} />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPage onGoHome={() => setActiveTab('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCity={handleSelectCityFromSearch}
        popularCities={CITIES_DATABASE}
        onNavigate={setActiveTab}
      />

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
