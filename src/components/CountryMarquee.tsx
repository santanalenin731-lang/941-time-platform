import React, { useMemo } from 'react';
import { City, CITIES_DATABASE } from '../data/cities';

interface CountryMarqueeProps {
  onSelectCity?: (city: City) => void;
}

// Varied & Vibrant Shades of Blue (No Black)
const BLUE_SHADES = [
  '#0284C7', // Electric Blue
  '#38BDF8', // Sky Light Blue
  '#0D47A1', // Deep Royal Blue
  '#1E40AF', // Deep Blue
  '#0077B6', // Ocean Blue
  '#2563EB', // Vibrant Royal Blue
  '#0096C7', // Bright Cyan Blue
  '#1D4ED8', // Rich Cobalt Blue
  '#60A5FA', // Soft Light Blue
  '#0369A1', // Vivid Deep Blue
];

// Extreme font size contrast (from 0.82rem to 4.5rem)
const FONT_VARIATIONS = [
  { size: '4.5rem', weight: 900 },
  { size: '0.85rem', weight: 600 },
  { size: '3.6rem', weight: 900 },
  { size: '1.1rem', weight: 600 },
  { size: '2.8rem', weight: 800 },
  { size: '0.95rem', weight: 500 },
  { size: '4.0rem', weight: 900 },
  { size: '1.4rem', weight: 700 },
  { size: '2.4rem', weight: 800 },
  { size: '0.82rem', weight: 500 },
];

interface CountryMapping {
  countryName: string;
  cityId: string;
}

const COUNTRY_MAPPINGS: CountryMapping[] = [
  { countryName: "República Dominicana", cityId: "santo-domingo" },
  { countryName: "Estados Unidos", cityId: "new-york" },
  { countryName: "Japón", cityId: "tokyo" },
  { countryName: "España", cityId: "madrid" },
  { countryName: "Reino Unido", cityId: "london" },
  { countryName: "Francia", cityId: "paris" },
  { countryName: "Alemania", cityId: "berlin" },
  { countryName: "Italia", cityId: "rome" },
  { countryName: "Brasil", cityId: "sao-paulo" },
  { countryName: "Argentina", cityId: "buenos-aires" },
  { countryName: "México", cityId: "mexico-city" },
  { countryName: "Australia", cityId: "sydney" },
  { countryName: "Canadá", cityId: "toronto" },
  { countryName: "Egipto", cityId: "cairo" },
  { countryName: "Emiratos Árabes Unidos", cityId: "dubai" },
  { countryName: "Corea del Sur", cityId: "seoul" },
  { countryName: "Singapur", cityId: "singapore" },
  { countryName: "China", cityId: "hong-kong" },
  { countryName: "Colombia", cityId: "bogota" },
  { countryName: "Suiza", cityId: "madrid" },
  { countryName: "Noruega", cityId: "london" },
  { countryName: "Portugal", cityId: "madrid" },
  { countryName: "Grecia", cityId: "rome" },
  { countryName: "Países Bajos", cityId: "paris" },
  { countryName: "Suecia", cityId: "berlin" },
  { countryName: "Chile", cityId: "buenos-aires" },
  { countryName: "Perú", cityId: "bogota" },
  { countryName: "India", cityId: "tokyo" },
  { countryName: "Sudáfrica", cityId: "cairo" },
  { countryName: "Nueva Zelanda", cityId: "sydney" },
  { countryName: "Austria", cityId: "berlin" },
  { countryName: "Bélgica", cityId: "paris" },
  { countryName: "Dinamarca", cityId: "berlin" },
  { countryName: "Finlandia", cityId: "london" },
  { countryName: "Irlanda", cityId: "london" },
  { countryName: "Panamá", cityId: "bogota" },
  { countryName: "Costa Rica", cityId: "mexico-city" },
  { countryName: "Uruguay", cityId: "buenos-aires" },
  { countryName: "Tailandia", cityId: "singapore" }
];

// Helper to generate dense row items with extreme size contrast and 100% blue colors (no black)
function generateDenseRowData(seed: number, count: number = 20) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const mappingIdx = (seed * 7 + i * 13) % COUNTRY_MAPPINGS.length;
    const colorIdx = (seed * 3 + i * 5) % BLUE_SHADES.length;
    const varIdx = (seed * 11 + i * 17) % FONT_VARIATIONS.length;
    const mapping = COUNTRY_MAPPINGS[mappingIdx];
    const font = FONT_VARIATIONS[varIdx];
    
    items.push({
      name: mapping.countryName,
      cityId: mapping.cityId,
      color: BLUE_SHADES[colorIdx],
      size: font.size,
      weight: font.weight
    });
  }
  return items;
}

interface MarqueeRowProps {
  items: Array<{ name: string; cityId: string; color: string; size: string; weight: number }>;
  speed: number;
  reverse?: boolean;
  onSelectCity?: (city: City) => void;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, speed, reverse = false, onSelectCity }) => {
  const duplicatedItems = [...items, ...items];

  const handleCountryClick = (cityId: string) => {
    if (!onSelectCity) return;
    const matchedCity = CITIES_DATABASE.find(c => c.id === cityId) || CITIES_DATABASE[0];
    onSelectCity(matchedCity);
  };

  return (
    <div style={{
      overflow: 'hidden',
      width: '100%',
      padding: '0.15rem 0'
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '1.8rem',
          width: 'max-content',
          animation: `${reverse ? 'scrollRight' : 'scrollLeft'} ${speed}s linear infinite`
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <span
            key={idx}
            onClick={() => handleCountryClick(item.cityId)}
            style={{
              fontSize: item.size,
              fontWeight: item.weight,
              color: item.color,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              whiteSpace: 'nowrap',
              userSelect: 'none',
              cursor: 'pointer',
              transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease, text-shadow 0.2s ease',
              padding: '0 0.15rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
              e.currentTarget.style.color = '#38BDF8';
              e.currentTarget.style.textShadow = '0 4px 15px rgba(56, 189, 248, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.color = item.color;
              e.currentTarget.style.textShadow = 'none';
            }}
            title={`Haz clic para ver la hora y rotar el globo a ${item.name}`}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export const CountryMarquee: React.FC<CountryMarqueeProps> = ({ onSelectCity }) => {
  const row1 = useMemo(() => generateDenseRowData(1), []);
  const row2 = useMemo(() => generateDenseRowData(2), []);
  const row3 = useMemo(() => generateDenseRowData(3), []);
  const row4 = useMemo(() => generateDenseRowData(4), []);

  return (
    <section style={{
      width: '100%',
      maxWidth: 'var(--max-width)',
      margin: '1.5rem auto 2.5rem auto',
      padding: '0 1rem',
      overflow: 'hidden'
    }}>
      {/* Container with Mask Fading Borders and Dynamic Horizontal Scroll Rows */}
      <div style={{
        position: 'relative',
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem'
      }}>
        {/* 4 Continuous Marquee Rows with Alternating Directions, Extreme Size Contrast & Click-to-Select */}
        <MarqueeRow items={row1} speed={38} onSelectCity={onSelectCity} />
        <MarqueeRow items={row2} speed={28} reverse={true} onSelectCity={onSelectCity} />
        <MarqueeRow items={row3} speed={44} onSelectCity={onSelectCity} />
        <MarqueeRow items={row4} speed={32} reverse={true} onSelectCity={onSelectCity} />
      </div>
    </section>
  );
};
