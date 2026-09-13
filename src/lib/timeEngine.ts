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

// Sunrise & Sunset solar calculation
export function calculateSunTimes(lat: number, lng: number, timezone: string, date: Date = new Date()) {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Solar declination
  const declination = 23.45 * Math.sin((((284 + dayOfYear) * 360) / 365) * (Math.PI / 180));
  const radLat = lat * (Math.PI / 180);
  const radDec = declination * (Math.PI / 180);

  const cosH = (Math.cos(90.83 * (Math.PI / 180)) - Math.sin(radLat) * Math.sin(radDec)) /
               (Math.cos(radLat) * Math.cos(radDec));

  if (cosH > 1) {
    return { sunrise: "--:--", sunset: "--:--", dayLength: "0h 0m", isDaylight: false };
  }
  if (cosH < -1) {
    return { sunrise: "--:--", sunset: "--:--", dayLength: "24h 0m", isDaylight: true };
  }

  const hourAngle = Math.acos(cosH) * (180 / Math.PI);
  const solarNoonMinutesUTC = 720 - 4 * lng;
  const sunriseMinutesUTC = solarNoonMinutesUTC - hourAngle * 4;
  const sunsetMinutesUTC = solarNoonMinutesUTC + hourAngle * 4;

  const tzDateStr = date.toLocaleString('en-US', { timeZone: timezone });
  const tzDate = new Date(tzDateStr);
  const utcDateStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
  const utcDate = new Date(utcDateStr);
  const offsetMinutes = Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);

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

  const dayLengthMins = Math.round(sunsetMinutesUTC - sunriseMinutesUTC);
  const dlHours = Math.floor(dayLengthMins / 60);
  const dlMins = dayLengthMins % 60;

  const nowUTC = date.getUTCHours() * 60 + date.getUTCMinutes();
  const isDaylight = nowUTC >= sunriseMinutesUTC && nowUTC <= sunsetMinutesUTC;

  return {
    sunrise: formatMinutesToTime(sunriseMinutesLocal),
    sunset: formatMinutesToTime(sunsetMinutesLocal),
    dayLength: `${dlHours}h ${dlMins}m`,
    isDaylight
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

  return {
    timeString: timeFormatter.format(targetTime),
    timeDigits,
    dateString: dateFormatter.format(targetTime),
    utcOffset: tzNamePart,
    hours: parseInt(hoursStr, 10),
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
  bestLocalTimes: { cityName: string; localTime: string; isWithinWorkHours: boolean }[];
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
