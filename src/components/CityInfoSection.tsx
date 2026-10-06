import React from 'react';
import { City, getCityAirport } from '../data/cities';
import {
  calculateSunTimes,
  getCityDstStatus,
  formatCoordinates
} from '../lib/timeEngine';
import { useLanguage, getTranslatedCity } from '../lib/i18n';
import '../styles/cityDetail.css';

interface CityInfoSectionProps {
  city: City;
  is24Hour: boolean;
  onSelectCity: (city: City) => void;
  onOpenMeetingPlanner?: (city: City) => void;
}

export const CityInfoSection: React.FC<CityInfoSectionProps> = ({
  city,
  is24Hour: _is24Hour,
  onSelectCity: _onSelectCity,
  onOpenMeetingPlanner: _onOpenMeetingPlanner
}) => {
  const { languageInfo, t } = useLanguage();

  // Astronomical NOAA solar calculations (computed numerically with zero NaN)
  const sunTimes = calculateSunTimes(city.lat, city.lng, city.timezone);
  const dstInfo = getCityDstStatus(city.timezone);
  const coords = formatCoordinates(city.lat, city.lng);
  const airport = getCityAirport(city);

  const cityName = getTranslatedCity(city, languageInfo.code);

  // DST status label
  const getDstLabel = () => {
    if (!dstInfo.hasDst) {
      return t.cityDetail.dstNone;
    }
    return dstInfo.isDstActive ? t.cityDetail.dstActive : t.cityDetail.dstInactive;
  };

  return (
    <section id="city-info-section" className="city-info-section" aria-label={`Información de ${cityName}`}>
      {/* 1. Solar & Daylight Metrics Card (Soft Light Blue with Depth) */}
      <div className="city-solar-card">
        <div className="city-solar-grid">
          <div>
            <div className="city-solar-metric-label">{t.hero.sunrise}</div>
            <div className="city-solar-metric-value">{sunTimes.sunrise}</div>
          </div>

          <div>
            <div className="city-solar-metric-label">{t.cityDetail.solarNoon}</div>
            <div className="city-solar-metric-value">{sunTimes.solarNoon}</div>
          </div>

          <div>
            <div className="city-solar-metric-label">{t.hero.sunset}</div>
            <div className="city-solar-metric-value">{sunTimes.sunset}</div>
          </div>

          <div>
            <div className="city-solar-metric-label">{t.hero.dayLength}</div>
            <div className="city-solar-metric-value">{sunTimes.dayLength}</div>
          </div>
        </div>

        {/* Minimal Daylight Bar (Inverted: Light to Dark) */}
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

      {/* 2. Technical & Geographic Data Sheet (Soft Light Blue Cards with Shadows) */}
      <div className="city-tech-grid">
        {/* Official Time Zone & UTC Offset */}
        <div className="city-tech-card">
          <div className="city-tech-card-header">{t.cityDetail.ianaTimezone}</div>
          <div className="city-tech-card-value">
            {city.timezone}
          </div>
          <div className="city-tech-card-sub">
            {t.cityDetail.utcOffset}: <strong>{dstInfo.utcOffsetString}</strong>
          </div>
        </div>

        {/* Daylight Saving Time (DST) */}
        <div className="city-tech-card">
          <div className="city-tech-card-header">{t.cityDetail.dstTitle}</div>
          <div className="city-tech-card-value">
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
          <div className="city-tech-card-header">{t.cityDetail.coordinates}</div>
          <div className="city-tech-card-value">
            {coords.cardinal}
          </div>
          <div className="city-tech-card-sub">
            {coords.decimal}
          </div>
        </div>

        {/* Primary Airport */}
        <div className="city-tech-card">
          <div className="city-tech-card-header">{t.cityDetail.airportTitle}</div>
          <div className="city-tech-card-value">
            {airport.iata}
          </div>
          <div className="city-tech-card-sub" title={airport.name}>
            {airport.name}
          </div>
        </div>

        {/* Metropolitan Population */}
        <div className="city-tech-card">
          <div className="city-tech-card-header">{t.cityDetail.population}</div>
          <div className="city-tech-card-value">
            {city.population > 0 ? city.population.toLocaleString(languageInfo.locale) : '—'}
          </div>
          <div className="city-tech-card-sub">
            Área metropolitana
          </div>
        </div>
      </div>
    </section>
  );
};
