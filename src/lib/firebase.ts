import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDjDE3_2z-t1n3Wiqj3lQT9rnYMsuZxBmg",
  authDomain: "impucalculo-analytics-2026.firebaseapp.com",
  projectId: "impucalculo-analytics-2026",
  storageBucket: "impucalculo-analytics-2026.firebasestorage.app",
  messagingSenderId: "683013434858",
  appId: "1:683013434858:web:fb3e8a906511658c4f1693",
  measurementId: "G-3MRMHTB5PX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics (supported in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

/**
 * Tracks page view events in Firebase Analytics
 */
export const trackPageView = (pageName: string) => {
  if (analytics) {
    try {
      logEvent(analytics, 'page_view', { page_title: pageName });
    } catch (e) {
      console.warn('Firebase Analytics page_view error:', e);
    }
  }
};

/**
 * Tracks city selection events in Firebase Analytics
 */
export const trackCitySelect = (cityName: string, country: string) => {
  if (analytics) {
    try {
      logEvent(analytics, 'select_content', { content_type: 'city', item_id: cityName, country });
    } catch (e) {
      console.warn('Firebase Analytics select_content error:', e);
    }
  }
};
