import { City } from '../data/cities';

export interface TimeState {
  now: Date;
  seconds: number;
  formattedTime: string;
  formattedDate: string;
  utcOffsetString: string;
  isNight: boolean;
  accuracyMs: number;
  latencyMs: number;
}

// Sunrise & Sunset solar calculation based on NOAA Solar Calculation Algorithm (Jean Meeus Astronomical Algorithms)
export function calculateSunTimes(lat: number, lng: number, timezone: string, date: Date = new Date()) {
  const d = new Date(date);

  // Day of year in UTC
  const startOfYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((d.getTime() - startOfYear.getTime()) / 86400000) + 1;
  const year = d.getUTCFullYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const daysInYear = isLeapYear ? 366 : 365;

  // Fractional year gamma (radians)
  const gamma = (2 * Math.PI / daysInYear) * (dayOfYear - 1 + (12 - 12) / 24);

  // Equation of Time (EoT in minutes)
  const eqtime = 229.18 * (
    0.000075 +
    0.001868 * Math.cos(gamma) -
    0.032077 * Math.sin(gamma) -
    0.014615 * Math.cos(2 * gamma) -
    0.040849 * Math.sin(2 * gamma)
  );

  // Solar declination (radians)
  const decl = 0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const latRad = lat * (Math.PI / 180);
  // Standard solar zenith angle for sunrise/sunset: 90.833°
  // (90° zenith + 34 arcminutes atmospheric refraction + 16 arcminutes solar semi-diameter = 90° 50' = 90.833°)
  const zenithRad = 90.833 * (Math.PI / 180);

  const cosH = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(decl)) /
               (Math.cos(latRad) * Math.cos(decl));

  if (cosH > 1) {
    return { sunrise: "--:--", sunset: "--:--", dayLength: "0h 0m", isDaylight: false };
  }
  if (cosH < -1) {
    return { sunrise: "--:--", sunset: "--:--", dayLength: "24h 0m", isDaylight: true };
  }

  const haDeg = Math.acos(cosH) * (180 / Math.PI);

  // Solar noon in UTC minutes: 720 (12:00) - 4 * longitude - eqtime
  // Longitude: positive for East, negative for West
  const solarNoonMinutesUTC = 720 - 4 * lng - eqtime;
  const sunriseMinutesUTC = solarNoonMinutesUTC - haDeg * 4;
  const sunsetMinutesUTC = solarNoonMinutesUTC + haDeg * 4;

  let offsetMinutes = 0;
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'shortOffset'
    });
    const parts = formatter.formatToParts(d);
    const tzPart = parts.find(p => p.type === 'timeZoneName')?.value || '';
    const match = tzPart.match(/GMT([+-])(\d+)(?::(\d+))?/);
    if (match) {
      const sign = match[1] === '+' ? 1 : -1;
      const hours = parseInt(match[2], 10);
      const mins = match[3] ? parseInt(match[3], 10) : 0;
      offsetMinutes = sign * (hours * 60 + mins);
    }
  } catch (e) {
    const invDate = new Date(d.toLocaleString('en-US', { timeZone: timezone }));
    const utcDate = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
    offsetMinutes = Math.round((invDate.getTime() - utcDate.getTime()) / 60000);
  }

  const sunriseMinutesLocal = sunriseMinutesUTC + offsetMinutes;
  const sunsetMinutesLocal = sunsetMinutesUTC + offsetMinutes;

  const formatMinutesToTime = (totalMinutes: number) => {
    let mins = (Math.round(totalMinutes) + 1440) % 1440;
    const hours = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const dayLengthMins = Math.round((sunsetMinutesUTC - sunriseMinutesUTC + 1440) % 1440);
  const dlHours = Math.floor(dayLengthMins / 60);
  const dlMins = dayLengthMins % 60;

  const localDate = new Date(d.toLocaleString('en-US', { timeZone: timezone }));
  const nowMinutesLocal = localDate.getHours() * 60 + localDate.getMinutes();
  const normSunrise = (Math.round(sunriseMinutesLocal) + 1440) % 1440;
  const normSunset = (Math.round(sunsetMinutesLocal) + 1440) % 1440;
  const isDaylight = normSunrise <= normSunset
    ? (nowMinutesLocal >= normSunrise && nowMinutesLocal < normSunset)
    : (nowMinutesLocal >= normSunrise || nowMinutesLocal < normSunset);

  const solarNoonMinutesLocal = (sunriseMinutesLocal + sunsetMinutesLocal) / 2;
  const daylightSpan = normSunset >= normSunrise ? (normSunset - normSunrise) : (1440 - normSunrise + normSunset);
  let daylightPercent = 0;
  if (isDaylight && daylightSpan > 0) {
    const elapsed = nowMinutesLocal >= normSunrise ? (nowMinutesLocal - normSunrise) : (1440 - normSunrise + nowMinutesLocal);
    daylightPercent = Math.round((elapsed / daylightSpan) * 100);
  } else if (!isDaylight) {
    daylightPercent = nowMinutesLocal >= normSunset ? 100 : 0;
  }

  return {
    sunrise: formatMinutesToTime(sunriseMinutesLocal),
    sunset: formatMinutesToTime(sunsetMinutesLocal),
    solarNoon: formatMinutesToTime(solarNoonMinutesLocal),
    dayLength: `${dlHours}h ${dlMins}m`,
    isDaylight,
    daylightPercent: Math.min(100, Math.max(0, daylightPercent))
  };
}

// Get current date/time formatted for a specific timezone and locale
export function getTimeInTimezone(
  timezone: string,
  is24Hour: boolean = false,
  showSeconds: boolean = true,
  customOffsetMs: number = 0,
  locale: string = 'es-DO'
): {
  timeString: string;
  timeDigits: string;
  dateString: string;
  utcOffset: string;
  hours: number;
  minutes: number;
  seconds: number;
  period: string;
  rawDate: Date;
} {
  const targetTime = new Date(Date.now() + customOffsetMs);

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
    hour12: !is24Hour
  });

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const parts = timeFormatter.formatToParts(targetTime);
  let hoursStr = "0", minsStr = "0", secsStr = "0", period = "";
  
  parts.forEach(p => {
    if (p.type === 'hour') hoursStr = p.value;
    if (p.type === 'minute') minsStr = p.value;
    if (p.type === 'second') secsStr = p.value;
    if (p.type === 'dayPeriod') period = p.value;
  });

  // Calculate UTC offset
  const tzOffsetFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short'
  });
  const tzParts = tzOffsetFormatter.formatToParts(targetTime);
  const tzNamePart = tzParts.find(p => p.type === 'timeZoneName')?.value || '';

  const timeDigits = showSeconds
    ? `${hoursStr}:${minsStr}:${secsStr}`
    : `${hoursStr}:${minsStr}`;

  // Calculate 24-hour integer for accurate timeline matching
  const hour24Formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    hour12: false
  });
  const hour24Str = hour24Formatter.format(targetTime);
  const hours24 = parseInt(hour24Str, 10) % 24;

  return {
    timeString: timeFormatter.format(targetTime),
    timeDigits,
    dateString: dateFormatter.format(targetTime),
    utcOffset: tzNamePart,
    hours: hours24,
    minutes: parseInt(minsStr, 10),
    seconds: parseInt(secsStr, 10),
    period: period.toUpperCase(),
    rawDate: targetTime
  };
}

// Calculate time difference between two cities in hours
export function getTimeDifference(cityA: City, cityB: City, locale: string = 'es'): {
  diffHours: number;
  formattedDiff: string;
} {
  const now = new Date();
  const dateA = new Date(now.toLocaleString('en-US', { timeZone: cityA.timezone }));
  const dateB = new Date(now.toLocaleString('en-US', { timeZone: cityB.timezone }));

  const diffMs = dateB.getTime() - dateA.getTime();
  const diffHours = Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10;

  const sameTimeDict: Record<string, string> = {
    es: "Misma hora", en: "Same time", fr: "Même heure", zh: "同一时间",
    hi: "उसी समय", ar: "في نفس الوقت", bn: "একই সময়", pt: "Mesma hora",
    ru: "То же время", ja: "同じ時間"
  };

  const hoursDict: Record<string, string> = {
    es: "hora", en: "hour", fr: "heure", zh: "小时",
    hi: "घंटा", ar: "ساعة", bn: "ঘন্টা", pt: "hora",
    ru: "час", ja: "時間"
  };

  const hoursPluralDict: Record<string, string> = {
    es: "horas", en: "hours", fr: "heures", zh: "小时",
    hi: "घंटे", ar: "ساعات", bn: "ঘন্টা", pt: "horas",
    ru: "часов", ja: "時間"
  };

  const langCode = locale.split('-')[0];
  const sameTime = sameTimeDict[langCode] || sameTimeDict['en'];
  const hourLabel = Math.abs(diffHours) > 1 ? (hoursPluralDict[langCode] || hoursPluralDict['en']) : (hoursDict[langCode] || hoursDict['en']);

  let formattedDiff = "";
  if (diffHours === 0) {
    formattedDiff = sameTime;
  } else if (diffHours > 0) {
    formattedDiff = `+${diffHours} ${hourLabel}`;
  } else {
    formattedDiff = `${diffHours} ${hourLabel}`;
  }

  return {
    diffHours,
    formattedDiff
  };
}

// Find optimal meeting overlap between multiple cities
export function findBestMeetingTime(cities: City[]): {
  startHourUTC: number;
  endHourUTC: number;
  bestLocalTimes: { city: City; cityName: string; localTime: string; isWithinWorkHours: boolean }[];
  found: boolean;
} {
  if (cities.length === 0) return { startHourUTC: 14, endHourUTC: 15, bestLocalTimes: [], found: false };

  let bestHour = -1;
  let maxScore = -1;

  for (let utcHour = 0; utcHour < 24; utcHour++) {
    let score = 0;
    cities.forEach(city => {
      const now = new Date();
      now.setUTCHours(utcHour, 0, 0, 0);
      const localTimeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: city.timezone,
        hour: 'numeric',
        hour12: false
      }).format(now);
      const localH = parseInt(localTimeStr, 10);
      
      if (localH >= 9 && localH <= 17) {
        score += 2;
      } else if (localH >= 7 && localH <= 21) {
        score += 1;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestHour = utcHour;
    }
  }

  const bestDateUTC = new Date();
  bestDateUTC.setUTCHours(bestHour, 0, 0, 0);

  const bestLocalTimes = cities.map(city => {
    const localTimeFormatted = new Intl.DateTimeFormat('en-US', {
      timeZone: city.timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(bestDateUTC);

    const localH = parseInt(new Intl.DateTimeFormat('en-US', {
      timeZone: city.timezone,
      hour: 'numeric',
      hour12: false
    }).format(bestDateUTC), 10);

    return {
      city,
      cityName: city.name,
      localTime: localTimeFormatted,
      isWithinWorkHours: localH >= 9 && localH <= 17
    };
  });

  return {
    startHourUTC: bestHour,
    endHourUTC: (bestHour + 1) % 24,
    bestLocalTimes,
    found: maxScore > 0
  };
}

export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export interface DstInfo {
  hasDst: boolean;
  isDstActive: boolean;
  currentOffsetMinutes: number;
  utcOffsetString: string;
  dstDiffMinutes: number;
}

/**
 * Computa dinámicamente si una zona horaria aplica Horario de Verano (DST)
 * y si se encuentra activo en el momento actual, analizando solsticios.
 */
export function getCityDstStatus(timezone: string): DstInfo {
  try {
    const year = new Date().getFullYear();
    const janDate = new Date(year, 0, 15);
    const julDate = new Date(year, 6, 15);
    const nowDate = new Date();

    const getOffsetMin = (d: Date) => {
      const utcDate = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzDate = new Date(d.toLocaleString('en-US', { timeZone: timezone }));
      return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
    };

    const janOffset = getOffsetMin(janDate);
    const julOffset = getOffsetMin(julDate);
    const nowOffset = getOffsetMin(nowDate);

    const hasDst = janOffset !== julOffset;
    const standardOffset = Math.min(janOffset, julOffset);
    const isDstActive = hasDst && nowOffset > standardOffset;
    const dstDiffMinutes = Math.abs(julOffset - janOffset);

    const sign = nowOffset >= 0 ? '+' : '-';
    const absM = Math.abs(nowOffset);
    const h = Math.floor(absM / 60);
    const m = absM % 60;
    const utcOffsetString = m > 0 ? `UTC${sign}${h}:${m.toString().padStart(2, '0')}` : `UTC${sign}${h}`;

    return {
      hasDst,
      isDstActive,
      currentOffsetMinutes: nowOffset,
      utcOffsetString,
      dstDiffMinutes
    };
  } catch (e) {
    return {
      hasDst: false,
      isDstActive: false,
      currentOffsetMinutes: 0,
      utcOffsetString: 'UTC',
      dstDiffMinutes: 0
    };
  }
}

export type BusinessStatus = 'business' | 'afterHours' | 'night' | 'weekend';

/**
 * Determina el estado de conveniencia comercial de una ciudad en base a su hora local.
 */
export function getBusinessStatus(timezone: string): {
  status: BusinessStatus;
  hour: number;
  isWeekend: boolean;
} {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      hour: 'numeric',
      hour12: false
    }).formatToParts(now);

    let weekday = '';
    let hour = 12;

    parts.forEach(p => {
      if (p.type === 'weekday') weekday = p.value;
      if (p.type === 'hour') hour = parseInt(p.value, 10);
    });

    const isWeekend = weekday === 'Sat' || weekday === 'Sun';

    if (isWeekend) {
      return { status: 'weekend', hour, isWeekend: true };
    }

    if (hour >= 9 && hour < 18) {
      return { status: 'business', hour, isWeekend: false };
    }

    if ((hour >= 7 && hour < 9) || (hour >= 18 && hour < 22)) {
      return { status: 'afterHours', hour, isWeekend: false };
    }

    return { status: 'night', hour, isWeekend: false };
  } catch (e) {
    return { status: 'business', hour: 12, isWeekend: false };
  }
}

/**
 * Formatea coordenadas en grados, minutos y dirección cardinal (N/S, E/W).
 */
export function formatCoordinates(lat: number, lng: number): {
  cardinal: string;
  decimal: string;
} {
  const latDeg = Math.floor(Math.abs(lat));
  const latMin = Math.round((Math.abs(lat) - latDeg) * 60);
  const latDir = lat >= 0 ? 'N' : 'S';

  const lngDeg = Math.floor(Math.abs(lng));
  const lngMin = Math.round((Math.abs(lng) - lngDeg) * 60);
  const lngDir = lng >= 0 ? 'E' : 'W';

  return {
    cardinal: `${latDeg}° ${latMin}' ${latDir}, ${lngDeg}° ${lngMin}' ${lngDir}`,
    decimal: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`
  };
}

