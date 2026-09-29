import { CITIES_DATABASE, City, DEFAULT_USER_CITY } from '../data/cities';

interface GeoLocationResult {
  countryCode: string;
  countryName?: string;
  cityName?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
}

// Distancia Haversine en kilómetros entre dos coordenadas
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Consulta un endpoint de IP Geolocation con límite de tiempo estricto (timeout).
 */
async function fetchWithTimeout(url: string, timeoutMs: number = 3000): Promise<any> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/**
 * Obtiene la geolocalización aproximada de la IP del usuario utilizando
 * múltiples proveedores públicos con fallback resiliente.
 */
async function queryIpLocation(): Promise<GeoLocationResult | null> {
  // Proveedor 1: GeoJS (alta velocidad, sin rate limits agresivos, CORS abierto)
  try {
    const data = await fetchWithTimeout('https://get.geojs.io/v1/ip/geo.json', 3000);
    if (data && data.country_code) {
      return {
        countryCode: data.country_code.toUpperCase(),
        countryName: data.country,
        cityName: data.city,
        timezone: data.timezone,
        latitude: data.latitude ? parseFloat(data.latitude) : undefined,
        longitude: data.longitude ? parseFloat(data.longitude) : undefined
      };
    }
  } catch (e) {
    // Continuar al proveedor de respaldo
  }

  // Proveedor 2: ipwho.is (excelente resolución de ISP y timezones)
  try {
    const data = await fetchWithTimeout('https://ipwho.is/', 3000);
    if (data && data.success && data.country_code) {
      return {
        countryCode: data.country_code.toUpperCase(),
        countryName: data.country,
        cityName: data.city,
        timezone: data.timezone?.id,
        latitude: data.latitude,
        longitude: data.longitude
      };
    }
  } catch (e) {
    // Fallback agotado
  }

  return null;
}

/**
 * Resuelve la ciudad más adecuada de CITIES_DATABASE a partir de los datos de la IP.
 */
export function resolveCityFromGeoIp(geo: GeoLocationResult): City {
  const deviceTz = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return '';
    }
  })();

  const isDominicanDevice =
    deviceTz === 'America/Santo_Domingo' ||
    deviceTz.includes('Santo_Domingo') ||
    (typeof navigator !== 'undefined' && (navigator.language === 'es-DO' || (navigator.languages && navigator.languages.includes('es-DO'))));

  // 1. Si el dispositivo está en Santo Domingo, una IP de EE.UU. (ej. iCloud Private Relay o VPN) NUNCA debe sustituirla
  if (isDominicanDevice) {
    const sd = CITIES_DATABASE.find(c => c.id === 'santo-domingo');
    if (sd) return sd;
  }

  // 2. Regla especial para República Dominicana por IP (ej. oficinas con timezone America/La_Paz)
  if (geo.countryCode === 'DO') {
    const sd = CITIES_DATABASE.find(c => c.id === 'santo-domingo');
    if (sd) return sd;
  }

  // 3. Si el dispositivo tiene America/La_Paz por error de Windows en RD y el navegador está en español
  if (deviceTz === 'America/La_Paz' && (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es'))) {
    const sd = CITIES_DATABASE.find(c => c.id === 'santo-domingo');
    if (sd) return sd;
  }

  const normalizedCityName = (geo.cityName || '').trim().toLowerCase();

  // 2. Coincidencia directa por Nombre de Ciudad dentro del mismo país
  if (normalizedCityName && geo.countryCode) {
    const directCityMatch = CITIES_DATABASE.find(
      c =>
        c.countryCode === geo.countryCode &&
        (c.name.toLowerCase() === normalizedCityName ||
         c.id.toLowerCase() === normalizedCityName.replace(/[^a-z0-9]/g, '-'))
    );
    if (directCityMatch) return directCityMatch;
  }

  // 3. Proximidad geográfica por Coordenadas (Haversine) dentro del mismo país (ej. Miami, Los Ángeles, Chicago)
  if (geo.latitude !== undefined && geo.longitude !== undefined && geo.countryCode) {
    const sameCountryCities = CITIES_DATABASE.filter(c => c.countryCode === geo.countryCode);
    if (sameCountryCities.length > 0) {
      let closestCity = sameCountryCities[0];
      let minDistance = Infinity;
      for (const city of sameCountryCities) {
        const dist = calculateDistance(geo.latitude, geo.longitude, city.lat, city.lng);
        if (dist < minDistance) {
          minDistance = dist;
          closestCity = city;
        }
      }
      return closestCity;
    }
  }

  // 4. Coincidencia por país y timezone exacto
  if (geo.timezone && geo.countryCode) {
    const exactMatch = CITIES_DATABASE.find(
      c => c.countryCode === geo.countryCode && c.timezone === geo.timezone
    );
    if (exactMatch) return exactMatch;
  }

  // 5. Coincidencia por proximidad geográfica global
  if (geo.latitude !== undefined && geo.longitude !== undefined) {
    let closestGlobalCity = CITIES_DATABASE[0];
    let minGlobalDistance = Infinity;
    for (const city of CITIES_DATABASE) {
      const dist = calculateDistance(geo.latitude, geo.longitude, city.lat, city.lng);
      if (dist < minGlobalDistance) {
        minGlobalDistance = dist;
        closestGlobalCity = city;
      }
    }
    if (minGlobalDistance < 1500) {
      return closestGlobalCity;
    }
  }

  // 6. Coincidencia por timezone en cualquier ciudad de la base de datos
  if (geo.timezone) {
    const tzMatch = CITIES_DATABASE.find(c => c.timezone === geo.timezone);
    if (tzMatch) return tzMatch;
  }

  return DEFAULT_USER_CITY;
}

const STORAGE_KEY_CITY = '941_detected_ip_city';
const STORAGE_KEY_TIMESTAMP = '941_detected_ip_time';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas

/**
 * Detecta la ciudad del usuario por IP en segundo plano con soporte de caché.
 */
export async function detectUserCityByIp(): Promise<City | null> {
  try {
    const deviceTz = (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch {
        return '';
      }
    })();

    const isDominicanDevice =
      deviceTz === 'America/Santo_Domingo' ||
      deviceTz.includes('Santo_Domingo') ||
      (typeof navigator !== 'undefined' && (navigator.language === 'es-DO' || (navigator.languages && navigator.languages.includes('es-DO'))));

    // Si el dispositivo está en Santo Domingo, siempre Santo Domingo y purgar New York
    if (isDominicanDevice) {
      const sd = CITIES_DATABASE.find(c => c.id === 'santo-domingo') || DEFAULT_USER_CITY;
      localStorage.setItem(STORAGE_KEY_CITY, sd.id);
      localStorage.setItem(STORAGE_KEY_TIMESTAMP, Date.now().toString());
      return sd;
    }

    // 1. Verificar si hay una ciudad válida en caché reciente
    const cachedCityId = localStorage.getItem(STORAGE_KEY_CITY);
    const cachedTime = localStorage.getItem(STORAGE_KEY_TIMESTAMP);

    if (cachedCityId && cachedTime) {
      const age = Date.now() - parseInt(cachedTime, 10);
      if (age < CACHE_DURATION_MS) {
        const city = CITIES_DATABASE.find(c => c.id === cachedCityId);
        if (city) return city;
      }
    }

    // 2. Consultar servicios de geolocalización por IP
    const geo = await queryIpLocation();
    if (!geo) return null;

    const resolvedCity = resolveCityFromGeoIp(geo);

    // 3. Guardar en caché para futuras visitas instantáneas
    localStorage.setItem(STORAGE_KEY_CITY, resolvedCity.id);
    localStorage.setItem(STORAGE_KEY_TIMESTAMP, Date.now().toString());

    return resolvedCity;
  } catch (err) {
    console.error('Error in detectUserCityByIp:', err);
    return null;
  }
}
