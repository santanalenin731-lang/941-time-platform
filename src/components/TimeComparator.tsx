import React, { useState, useEffect, useRef, useMemo } from 'react';
import { City, CITIES_DATABASE } from '../data/cities';
import { getTimeInTimezone, getTimeDifference, findBestMeetingTime } from '../lib/timeEngine';
import { Users, ArrowLeftRight, CalendarCheck, Clock, Sparkles } from 'lucide-react';
import { useLanguage, getTranslatedCountry, getTranslatedCity } from '../lib/i18n.tsx';
import '../styles/comparator.css';

interface TimeComparatorProps {
  initialCityA?: City;
  initialCityB?: City;
  is24Hour: boolean;
}

interface TimelineSlotData {
  hourIndex: number;
  timeLabel: string;
  cityAHour: number;
  cityAHourDisplay: string;
  cityBHour: number;
  cityBHourDisplay: string;
  isWorkA: boolean;
  isWorkB: boolean;
  isMutual: boolean;
  isCurrentA: boolean;
  isCurrentB: boolean;
}

export const TimeComparator: React.FC<TimeComparatorProps> = ({
  initialCityA = CITIES_DATABASE[0], // Santo Domingo
  initialCityB = CITIES_DATABASE[4], // Madrid
  is24Hour
}) => {
  const [cityA, setCityA] = useState<City>(initialCityA);
  const [cityB, setCityB] = useState<City>(initialCityB);
  const { languageInfo, t } = useLanguage();
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  // Sync state if initial props change
  useEffect(() => {
    if (initialCityA) setCityA(initialCityA);
  }, [initialCityA]);

  useEffect(() => {
    if (initialCityB) setCityB(initialCityB);
  }, [initialCityB]);

  // Current real-time clocks for both cities
  const timeA = getTimeInTimezone(cityA.timezone, is24Hour, true, 0, languageInfo.locale);
  const timeB = getTimeInTimezone(cityB.timezone, is24Hour, true, 0, languageInfo.locale);
  const diff = getTimeDifference(cityA, cityB, languageInfo.locale);

  // Swap cities handler
  const handleSwapCities = () => {
    const temp = cityA;
    setCityA(cityB);
    setCityB(temp);
  };

  // Format hour label based on 12/24 hour format
  const formatHourString = (hour24: number, full: boolean = false): string => {
    if (is24Hour) {
      return full ? `${hour24}:00` : `${hour24}`;
    }
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const h12 = hour24 % 12 || 12;
    return full ? `${h12}:00 ${period}` : `${h12} ${period}`;
  };

  // Generate synchronized 24-hour slots for City A and City B
  const timelineSlots = useMemo<TimelineSlotData[]>(() => {
    const now = new Date();
    const curAHours24 = timeA.hours;
    const curAMinutes = timeA.minutes;
    const curBHours24 = timeB.hours;

    const slots: TimelineSlotData[] = [];

    for (let hA = 0; hA < 24; hA++) {
      // Calculate universal timestamp when City A is at hour hA:00 today
      const slotTime = new Date(now.getTime() + (hA - curAHours24) * 3600000 - curAMinutes * 60000);

      // Extract City B's 24-hour hour at this exact moment
      const partsB = new Intl.DateTimeFormat('en-US', {
        timeZone: cityB.timezone,
        hour: 'numeric',
        hour12: false
      }).formatToParts(slotTime);
      const hBPart = partsB.find(p => p.type === 'hour')?.value || '0';
      const hB24 = parseInt(hBPart, 10) % 24;

      const isWorkA = hA >= 9 && hA <= 17;
      const isWorkB = hB24 >= 9 && hB24 <= 17;
      const isMutual = isWorkA && isWorkB;

      slots.push({
        hourIndex: hA,
        timeLabel: formatHourString(hA, false),
        cityAHour: hA,
        cityAHourDisplay: formatHourString(hA, false),
        cityBHour: hB24,
        cityBHourDisplay: formatHourString(hB24, false),
        isWorkA,
        isWorkB,
        isMutual,
        isCurrentA: hA === curAHours24,
        isCurrentB: hB24 === curBHours24
      });
    }

    return slots;
  }, [cityA.timezone, cityB.timezone, timeA.hours, timeA.minutes, timeB.hours, is24Hour]);

  // Compute Mutual Working Overlap Range
  const mutualOverlap = useMemo(() => {
    const mutuals = timelineSlots.filter(s => s.isMutual);
    if (mutuals.length === 0) {
      // Calculate alternative recommendation from timeEngine
      const alt = findBestMeetingTime([cityA, cityB]);
      return {
        hasOverlap: false,
        count: 0,
        alt
      };
    }

    const first = mutuals[0];
    const last = mutuals[mutuals.length - 1];

    const startAStr = formatHourString(first.cityAHour, true);
    const endAStr = formatHourString((last.cityAHour + 1) % 24, true);

    const startBStr = formatHourString(first.cityBHour, true);
    const endBStr = formatHourString((last.cityBHour + 1) % 24, true);

    return {
      hasOverlap: true,
      count: mutuals.length,
      startA: startAStr,
      endA: endAStr,
      startB: startBStr,
      endB: endBStr
    };
  }, [timelineSlots, cityA, cityB, is24Hour]);

  // Determine if dates differ between cities
  const dateDiffBadge = useMemo(() => {
    if (timeA.dateString === timeB.dateString) return null;
    if (diff.diffHours > 0) {
      return '+1 d';
    } else if (diff.diffHours < 0) {
      return '-1 d';
    }
    return null;
  }, [timeA.dateString, timeB.dateString, diff.diffHours]);

  // Auto-scroll timeline towards the current hour or mutual overlap on mobile
  useEffect(() => {
    if (timelineScrollRef.current) {
      const targetHour = timelineSlots.find(s => s.isMutual)?.cityAHour ?? timeA.hours;
      // Scroll proportionally (approx 29px per column)
      const scrollPos = Math.max(0, targetHour * 29 - 80);
      timelineScrollRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, [cityA.id, cityB.id]);

  return (
    <div className="tc-container">
      {/* Header */}
      <div className="tc-header">
        <div className="tc-header-title">
          <Users size={26} color="var(--color-navy)" />
          <span>{t.comparator.title}</span>
        </div>
      </div>

      {/* Responsive Cities & Difference Layout */}
      <div className="tc-cities-layout">
        {/* City A Card */}
        <div className="tc-city-card">
          <label className="tc-city-label" htmlFor="select-city-a">
            {getTranslatedCity(cityA, languageInfo.code)}
          </label>
          <select
            id="select-city-a"
            className="tc-city-select"
            value={cityA.id}
            onChange={(e) => {
              const selected = CITIES_DATABASE.find(c => c.id === e.target.value);
              if (selected) setCityA(selected);
            }}
          >
            {CITIES_DATABASE.map(c => (
              <option key={c.id} value={c.id}>
                {getTranslatedCity(c, languageInfo.code)} ({getTranslatedCountry(c.countryCode, languageInfo.locale, c.country)})
              </option>
            ))}
          </select>

          <div className="tc-city-clock-box">
            <div className="tc-city-time">
              {timeA.timeString}
            </div>
            <div className="tc-city-meta">
              <span>{timeA.dateString}</span>
              <span>·</span>
              <span>{timeA.utcOffset}</span>
            </div>
          </div>
        </div>

        {/* Difference & Swap Component */}
        <div className="tc-diff-container">
          <div className="tc-diff-badge">
            <div>{t.comparator.difference}</div>
            <div className="tc-diff-value">{diff.formattedDiff}</div>
          </div>

          <button
            className="tc-swap-btn"
            onClick={handleSwapCities}
            title={t.comparator.swapCities}
            aria-label={t.comparator.swapCities}
          >
            <ArrowLeftRight size={18} />
          </button>
        </div>

        {/* City B Card */}
        <div className="tc-city-card">
          <label className="tc-city-label" htmlFor="select-city-b">
            {getTranslatedCity(cityB, languageInfo.code)}
          </label>
          <select
            id="select-city-b"
            className="tc-city-select"
            value={cityB.id}
            onChange={(e) => {
              const selected = CITIES_DATABASE.find(c => c.id === e.target.value);
              if (selected) setCityB(selected);
            }}
          >
            {CITIES_DATABASE.map(c => (
              <option key={c.id} value={c.id}>
                {getTranslatedCity(c, languageInfo.code)} ({getTranslatedCountry(c.countryCode, languageInfo.locale, c.country)})
              </option>
            ))}
          </select>

          <div className="tc-city-clock-box">
            <div className="tc-city-time">
              {timeB.timeString}
            </div>
            <div className="tc-city-meta">
              <span>{timeB.dateString}</span>
              {dateDiffBadge && (
                <span className="tc-day-tag" title="Day Difference">
                  {dateDiffBadge}
                </span>
              )}
              <span>·</span>
              <span>{timeB.utcOffset}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Overlap Intelligence Card */}
      <div className="tc-overlap-card">
        <div className="tc-overlap-header">
          <div className="tc-overlap-title">
            <CalendarCheck size={19} color="#0284C7" />
            <span>{t.comparator.mutualWindow}</span>
          </div>
          {mutualOverlap.hasOverlap && (
            <span className="tc-overlap-count-badge">
              <Sparkles size={13} />
              {mutualOverlap.count} {mutualOverlap.count === 1 ? t.comparator.hourOverlap : t.comparator.hoursOverlap}
            </span>
          )}
        </div>

        {mutualOverlap.hasOverlap ? (
          <div className="tc-overlap-times-row">
            <div className="tc-overlap-city-badge">
              <span className="tc-overlap-city-name">{getTranslatedCity(cityA, languageInfo.code)}:</span>
              <span>{mutualOverlap.startA} – {mutualOverlap.endA}</span>
            </div>
            <span style={{ color: '#0284C7', fontWeight: 800 }}>⟷</span>
            <div className="tc-overlap-city-badge">
              <span className="tc-overlap-city-name">{getTranslatedCity(cityB, languageInfo.code)}:</span>
              <span>{mutualOverlap.startB} – {mutualOverlap.endB}</span>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              {t.comparator.noOverlap}
            </div>
            {mutualOverlap.alt && mutualOverlap.alt.bestLocalTimes.length >= 2 && (
              <div className="tc-overlap-times-row">
                <div className="tc-overlap-city-badge">
                  <span className="tc-overlap-city-name">{getTranslatedCity(cityA, languageInfo.code)}:</span>
                  <span>{mutualOverlap.alt.bestLocalTimes[0].localTime}</span>
                </div>
                <span style={{ color: '#0284C7', fontWeight: 800 }}>⟷</span>
                <div className="tc-overlap-city-badge">
                  <span className="tc-overlap-city-name">{getTranslatedCity(cityB, languageInfo.code)}:</span>
                  <span>{mutualOverlap.alt.bestLocalTimes[1].localTime}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 24-Hour Visual Synchronized Timeline */}
      <div className="tc-timeline-section">
        <div className="tc-timeline-header">
          <div className="tc-timeline-title">
            {t.comparator.overlap}
          </div>
          <div className="tc-scroll-hint">
            <Clock size={13} />
            <span>{t.comparator.scrollHint}</span>
          </div>
        </div>

        {/* Scrollable Timeline Grid */}
        <div className="tc-timeline-scroll" ref={timelineScrollRef}>
          <div className="tc-timeline-grid">
            {/* Header row with hours */}
            <div className="tc-hour-header-row">
              <div />
              {timelineSlots.map(slot => (
                <div key={slot.hourIndex} className="tc-hour-header-cell">
                  {slot.timeLabel}
                </div>
              ))}
            </div>

            {/* City A Row */}
            <div className="tc-timeline-row">
              <div className="tc-timeline-city-label" title={getTranslatedCity(cityA, languageInfo.code)}>
                {getTranslatedCity(cityA, languageInfo.code)}
              </div>
              {timelineSlots.map(slot => {
                const cellClass = slot.isMutual
                  ? 'is-mutual'
                  : slot.isWorkA
                  ? 'is-single-work'
                  : 'is-off';

                return (
                  <div
                    key={slot.hourIndex}
                    className={`tc-hour-cell ${cellClass} ${slot.isCurrentA ? 'is-current' : ''}`}
                    title={`${getTranslatedCity(cityA, languageInfo.code)}: ${slot.cityAHourDisplay}`}
                  >
                    <span>{slot.cityAHour}</span>
                  </div>
                );
              })}
            </div>

            {/* City B Row */}
            <div className="tc-timeline-row">
              <div className="tc-timeline-city-label" title={getTranslatedCity(cityB, languageInfo.code)}>
                {getTranslatedCity(cityB, languageInfo.code)}
              </div>
              {timelineSlots.map(slot => {
                const cellClass = slot.isMutual
                  ? 'is-mutual'
                  : slot.isWorkB
                  ? 'is-single-work'
                  : 'is-off';

                return (
                  <div
                    key={slot.hourIndex}
                    className={`tc-hour-cell ${cellClass} ${slot.isCurrentB ? 'is-current' : ''}`}
                    title={`${getTranslatedCity(cityB, languageInfo.code)}: ${slot.cityBHourDisplay}`}
                  >
                    <span>{slot.cityBHour}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Color Legend */}
        <div className="tc-legend">
          <div className="tc-legend-item">
            <span className="tc-legend-box mutual" />
            <span>{t.comparator.mutualTag}</span>
          </div>
          <div className="tc-legend-item">
            <span className="tc-legend-box single" />
            <span>{t.comparator.singleTag}</span>
          </div>
          <div className="tc-legend-item">
            <span className="tc-legend-box off" />
            <span>{t.comparator.offTag}</span>
          </div>
          <div className="tc-legend-item">
            <span className="tc-legend-box current" />
            <span>{t.comparator.currentTag}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
