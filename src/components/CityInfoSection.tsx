import React from 'react';
import { City, CITIES_DATABASE, getCityAirport } from '../data/cities';
import {
  calculateSunTimes,
  getCityDstStatus,
  getBusinessStatus,
  formatCoordinates,
  getTimeDifference,
  getTimeInTimezone
} from '../lib/timeEngine';
import { useLanguage, getTranslatedCity, getTranslatedCountry } from '../lib/i18n';
import {
  Sunrise,
  Sunset,
  Sun,
  Clock,
  MapPin,
  Plane,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import '../styles/cityDetail.css';

interface CityInfoSectionProps {
  city: City;
  is24Hour: boolean;
  onSelectCity: (city: City) => void;
  onOpenMeetingPlanner?: (city: City) => void;
}

const STRATEGIC_COMPARE_CITY_IDS = [
  'nueva-york',
  'londres',
  'tokio',
  'madrid',
  'paris',
  'sao-paulo'
];

export const CityInfoSection: React.FC<CityInfoSectionProps> = ({
  city,
  is24Hour,
  onSelectCity,
  onOpenMeetingPlanner
}) => {
  const { languageInfo, t } = useLanguage();

  // Astronomical NOAA solar calculations (computed numerically with zero NaN)
  const sunTimes = calculateSunTimes(city.lat, city.lng, city.timezone);
  const dstInfo = getCityDstStatus(city.timezone);
  const businessInfo = getBusinessStatus(city.timezone);
  const coords = formatCoordinates(city.lat, city.lng);
  const airport = getCityAirport(city);

  const cityName = getTranslatedCity(city, languageInfo.code);

  // Strategic cities for quick comparison
  const compareCities = STRATEGIC_COMPARE_CITY_IDS
    .map(id => CITIES_DATABASE.find(c => c.id === id))
    .filter((c): c is City => c !== undefined && c.id !== city.id);

  // Live business status badge text & styling (pure blue / slate, zero emojis)
  const getBusinessStatusPill = () => {
    switch (businessInfo.status) {
      case 'business':
        return {
          className: 'city-business-pill open',
          text: t.cityDetail.businessOpen
        };
      case 'afterHours':
        return {
          className: 'city-business-pill afterHours',
          text: t.cityDetail.businessClosed
        };
      case 'weekend':
        return {
          className: 'city-business-pill weekend',
          text: t.cityDetail.businessWeekend
        };
      case 'night':
      default:
        return {
          className: 'city-business-pill night',
          text: t.cityDetail.businessNight
        };
    }
  };

  const businessPill = getBusinessStatusPill();

  // DST status label
  const getDstLabel = () => {
    if (!dstInfo.hasDst) {
      return t.cityDetail.dstNone;
    }
    return dstInfo.isDstActive ? t.cityDetail.dstActive : t.cityDetail.dstInactive;
  };

  return (
    <section className="city-info-section" aria-label={`Información de ${cityName}`}>
      {/* Section Header with Live Business Status */}
      <div className="city-info-header">
        <h2 className="city-info-heading">
          <Compass size={18} />
          <span>{cityName}</span>
          <span style={{ color: 'var(--color-text-light)', fontWeight: 400, fontSize: '0.95rem' }}>
            · {t.cityDetail.techSheetTitle}
          </span>
        </h2>

        <span className={businessPill.className} title="Estado comercial local (09:00 - 18:00)">
          {businessPill.text}
        </span>
      </div>

      {/* 1. Solar & Daylight Metrics Card (Strictly Navy & Electric Blue) */}
      <div className="city-solar-card">
        <div className="city-solar-grid">
          <div>
            <div className="city-solar-metric-label">
              <Sunrise size={14} />
              <span>{t.hero.sunrise}</span>
            </div>
            <div className="city-solar-metric-value">
              {sunTimes.sunrise}
            </div>
          </div>

          <div>
            <div className="city-solar-metric-label">
              <Sun size={14} />
              <span>{t.cityDetail.solarNoon}</span>
            </div>
            <div className="city-solar-metric-value">
              {sunTimes.solarNoon}
            </div>
          </div>

          <div>
            <div className="city-solar-metric-label">
              <Sunset size={14} />
              <span>{t.hero.sunset}</span>
            </div>
            <div className="city-solar-metric-value">
              {sunTimes.sunset}
            </div>
          </div>

          <div>
            <div className="city-solar-metric-label">
              <Clock size={14} />
              <span>{t.hero.dayLength}</span>
            </div>
            <div className="city-solar-metric-value">
              {sunTimes.dayLength}
            </div>
          </div>
        </div>

        {/* Minimal Daylight Bar (Shades of Blue) */}
        <div className="city-daylight-bar-header">
          <span>{t.cityDetail.daylightProgress}</span>
          <span>{sunTimes.daylightPercent}%</span>
        </div>
        <div className="city-daylight-bar-track">
          <div
            className="city-daylight-bar-fill"
            style={{ width: `${sunTimes.daylightPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Technical & Geographic Data Sheet */}
      <div className="city-tech-grid">
        {/* IANA Timezone & UTC Offset */}
        <div className="city-tech-card">
          <div className="city-tech-card-header">
            <Clock size={14} />
            <span>{t.cityDetail.ianaTimezone}</span>
          </div>
          <div className="city-tech-card-value" style={{ fontFamily: 'monospace', fontSize: '0.95rem' }}>
            {city.timezone}
          </div>
          <div className="city-tech-card-sub">
            {t.cityDetail.utcOffset}: <strong>{dstInfo.utcOffsetString}</strong>
          </div>
        </div>

        {/* Daylight Saving Time (DST) */}
        <div className="city-tech-card">
          <div className="city-tech-card-header">
            <Sun size={14} />
            <span>{t.cityDetail.dstTitle}</span>
          </div>
          <div className="city-tech-card-value" style={{ fontSize: '0.95rem' }}>
            {getDstLabel()}
          </div>
          <div className="city-tech-card-sub">
            {dstInfo.hasDst
              ? (dstInfo.isDstActive ? 'Horario de verano activo' : 'Horario estándar')
              : 'Sin ajuste estacional'}
          </div>
        </div>

        {/* Geographic Coordinates */}
        <div className="city-tech-card">
          <div className="city-tech-card-header">
            <MapPin size={14} />
            <span>{t.cityDetail.coordinates}</span>
          </div>
          <div className="city-tech-card-value" style={{ fontSize: '0.95rem' }}>
            {coords.cardinal}
          </div>
          <div className="city-tech-card-sub">
            {coords.decimal}
          </div>
        </div>

        {/* Primary Airport */}
        <div className="city-tech-card">
          <div className="city-tech-card-header">
            <Plane size={14} />
            <span>{t.cityDetail.airportTitle}</span>
          </div>
          <div className="city-tech-card-value" style={{ fontSize: '0.95rem' }}>
            {airport.iata}
          </div>
          <div className="city-tech-card-sub" title={airport.name}>
            {airport.name}
          </div>
        </div>

        {/* Metropolitan Population */}
        <div className="city-tech-card">
          <div className="city-tech-card-header">
            <Users size={14} />
            <span>{t.cityDetail.population}</span>
          </div>
          <div className="city-tech-card-value" style={{ fontSize: '0.95rem' }}>
            {city.population > 0 ? city.population.toLocaleString(languageInfo.locale) : '—'}
          </div>
          <div className="city-tech-card-sub">
            Área metropolitana
          </div>
        </div>
      </div>

      {/* 3. Global Time Comparison */}
      <div className="city-diff-card">
        <div className="city-diff-card-title">
          <span>{t.cityDetail.worldDiffTitle}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: 500, textTransform: 'none' }}>
            vs {cityName}
          </span>
        </div>

        <div className="city-diff-list">
          {compareCities.map(targetCity => {
            const diff = getTimeDifference(city, targetCity, languageInfo.locale);
            const targetCityTime = getTimeInTimezone(targetCity.timezone, is24Hour, false, 0, languageInfo.locale);
            const targetName = getTranslatedCity(targetCity, languageInfo.code);
            const targetCountry = getTranslatedCountry(targetCity.countryCode, languageInfo.locale, targetCity.country);

            let badgeClass = 'city-diff-badge same';
            if (diff.diffHours > 0) badgeClass = 'city-diff-badge ahead';
            else if (diff.diffHours < 0) badgeClass = 'city-diff-badge behind';

            return (
              <div
                key={targetCity.id}
                className="city-diff-item"
                onClick={() => onSelectCity(targetCity)}
                title={`Ver hora y detalles de ${targetName}`}
              >
                <div className="city-diff-item-left">
                  <span className="city-diff-item-name">{targetName}</span>
                  <span className="city-diff-item-country">{targetCountry}</span>
                </div>

                <div className="city-diff-item-right">
                  <span className="city-diff-item-time">{targetCityTime.timeString}</span>
                  <span className={badgeClass}>{diff.formattedDiff}</span>
                </div>
              </div>
            );
          })}
        </div>

        {onOpenMeetingPlanner && (
          <div className="city-diff-cta">
            <button
              type="button"
              className="city-diff-cta-btn"
              onClick={() => onOpenMeetingPlanner(city)}
            >
              <span>{t.cityDetail.planMeetingWith} {cityName}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
