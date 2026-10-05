import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent, Analytics } from 'firebase/analytics';

/**
 * Configuración oficial de Firebase para el proyecto 941 Time Platform (platform-941-app).
 * El measurementId se obtiene automáticamente al habilitar Google Analytics en Firebase Console.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyBLE7GUJfrRW6vR6fBoU2RUooOkK9nKyps",
  authDomain: "platform-941-app.firebaseapp.com",
  projectId: "platform-941-app",
  storageBucket: "platform-941-app.firebasestorage.app",
  messagingSenderId: "1018514208706",
  appId: "1:1018514208706:web:eb4e290de123d13446885b",
  measurementId: (import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID || "G-8X2ESZZSR7"
};

// Inicialización de la aplicación Firebase
export const app = initializeApp(firebaseConfig);

// Instancia segura de Analytics (se activa si el entorno lo soporta y existe un measurementId configurado)
export let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported && firebaseConfig.measurementId) {
      try {
        analytics = getAnalytics(app);
      } catch (err) {
        console.warn('[Firebase] Analytics init notice:', err);
      }
    }
  }).catch(() => {});
}

// Registro en consola en modo desarrollo para verificar telemetría en vivo
const logDev = (eventName: string, params?: Record<string, any>) => {
  if ((import.meta as any).env?.DEV) {
    console.log(`%c[941 Analytics] %c${eventName}`, 'color: #0284C7; font-weight: bold;', 'color: #071A33; font-weight: 600;', params || {});
  }
};

/**
 * Registra vistas de página y cambios de sección (Inicio, Reloj Mundial, Blog, etc.)
 */
export const trackPageView = (pageName: string, path?: string) => {
  const currentPath = path || (typeof window !== 'undefined' ? window.location.hash || '/' : '/');
  logDev('page_view', { page_title: pageName, page_path: currentPath });
  if (analytics) {
    try {
      logEvent(analytics, 'page_view', {
        page_title: pageName,
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: currentPath
      });
    } catch (e) {
      console.warn('Firebase Analytics page_view error:', e);
    }
  }
};

/**
 * Registra cuando el usuario selecciona o consulta una ciudad
 */
export const trackCitySelect = (cityName: string, country: string, source: string = 'direct') => {
  logDev('select_city', { city: cityName, country, source });
  if (analytics) {
    try {
      logEvent(analytics, 'select_content', {
        content_type: 'city',
        item_id: cityName,
        country,
        source
      });
    } catch (e) {
      console.warn('Firebase Analytics select_city error:', e);
    }
  }
};

/**
 * Registra búsquedas de ciudades y husos horarios realizadas en el buscador
 */
export const trackCitySearch = (searchTerm: string, resultsCount: number) => {
  logDev('search_city', { search_term: searchTerm, results_count: resultsCount });
  if (analytics) {
    try {
      logEvent(analytics, 'search', {
        search_term: searchTerm,
        number_of_results: resultsCount
      });
    } catch (e) {
      console.warn('Firebase Analytics search error:', e);
    }
  }
};

/**
 * Registra cambios de idioma de la plataforma
 */
export const trackLanguageChange = (languageCode: string) => {
  logDev('change_language', { language: languageCode });
  if (analytics) {
    try {
      logEvent(analytics, 'select_content', {
        content_type: 'language',
        item_id: languageCode
      });
    } catch (e) {
      console.warn('Firebase Analytics language change error:', e);
    }
  }
};

/**
 * Registra alternancia del formato horario (12 horas AM/PM vs 24 horas)
 */
export const trackTimeFormatToggle = (format: '12h' | '24h') => {
  logDev('toggle_time_format', { format });
  if (analytics) {
    try {
      logEvent(analytics, 'select_content', {
        content_type: 'time_format',
        item_id: format
      });
    } catch (e) {
      console.warn('Firebase Analytics format toggle error:', e);
    }
  }
};

/**
 * Registra interacciones con herramientas del tiempo (Comparador, Cronómetro, Temporizador, Alarma)
 */
export const trackToolUsage = (toolName: string, action: string = 'view') => {
  logDev('use_tool', { tool: toolName, action });
  if (analytics) {
    try {
      logEvent(analytics, 'tool_interaction', {
        tool_name: toolName,
        action
      });
    } catch (e) {
      console.warn('Firebase Analytics tool usage error:', e);
    }
  }
};

/**
 * Registra interacciones con la instalación de la Progressive Web App (PWA)
 */
export const trackPWAInstall = (action: 'prompt_shown' | 'accepted' | 'dismissed' | 'guide_opened') => {
  logDev('pwa_install_action', { action });
  if (analytics) {
    try {
      logEvent(analytics, 'pwa_interaction', {
        action
      });
    } catch (e) {
      console.warn('Firebase Analytics PWA error:', e);
    }
  }
};
