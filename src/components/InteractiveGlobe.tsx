import React, { useEffect, useRef } from 'react';
import { City, CITIES_DATABASE } from '../data/cities';

interface InteractiveGlobeProps {
  city: City;
  onSelectCity?: (city: City) => void;
}

// Simplified continent landmass point generator for 3D dot-grid globe
function generateContinentPoints(): { lat: number; lng: number }[] {
  const points: { lat: number; lng: number }[] = [];
  
  // Helper to fill grid in lat/lng bounds
  const addRegion = (minLat: number, maxLat: number, minLng: number, maxLng: number, step: number = 4) => {
    for (let lat = minLat; lat <= maxLat; lat += step) {
      for (let lng = minLng; lng <= maxLng; lng += step) {
        // Add slight jitter for natural look
        const jLat = lat + (Math.sin(lat * 3 + lng) * 0.8);
        const jLng = lng + (Math.cos(lng * 3 + lat) * 0.8);
        points.push({ lat: jLat, lng: jLng });
      }
    }
  };

  // North America
  addRegion(15, 65, -130, -60, 4.5);
  // Caribbean
  addRegion(10, 25, -85, -60, 3.5);
  // South America
  addRegion(-55, 12, -80, -35, 4.5);
  // Europe
  addRegion(35, 68, -10, 40, 4.0);
  // Africa
  addRegion(-34, 35, -17, 50, 4.5);
  // Asia
  addRegion(8, 70, 40, 145, 4.5);
  // Japan & Philippines
  addRegion(5, 45, 120, 145, 3.5);
  // Australia
  addRegion(-42, -11, 112, 153, 4.5);
  // New Zealand
  addRegion(-47, -34, 166, 178, 3.5);

  return points;
}

const CONTINENT_POINTS = generateContinentPoints();

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ city, onSelectCity }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Target angles based on active city coordinates
  const targetRotYRef = useRef<number>(-city.lng * (Math.PI / 180));
  const targetRotXRef = useRef<number>(city.lat * (Math.PI / 180));

  // Current smooth rotation angles
  const rotYRef = useRef<number>(-city.lng * (Math.PI / 180));
  const rotXRef = useRef<number>(city.lat * (Math.PI / 180));

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const userInteractedRef = useRef(false);

  // Update target rotation when active city changes
  useEffect(() => {
    let targetLngRad = -city.lng * (Math.PI / 180);
    let targetLatRad = city.lat * (Math.PI / 180);

    // Normalize angle differences to take shortest rotation path
    let diffY = (targetLngRad - rotYRef.current) % (2 * Math.PI);
    if (diffY > Math.PI) diffY -= 2 * Math.PI;
    if (diffY < -Math.PI) diffY += 2 * Math.PI;

    targetRotYRef.current = rotYRef.current + diffY;
    targetRotXRef.current = targetLatRad;
    userInteractedRef.current = false;
  }, [city]);

  // Main 3D Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let pulsePhase = 0;

    const render = () => {
      pulsePhase += 0.05;
      
      // Canvas sizing
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      // Lerp rotation towards target if not dragging
      if (!isDraggingRef.current) {
        rotYRef.current += (targetRotYRef.current - rotYRef.current) * 0.07;
        rotXRef.current += (targetRotXRef.current - rotXRef.current) * 0.07;
      }

      const rotY = rotYRef.current;
      const rotX = rotXRef.current;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Outer Atmospheric Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.35);
      glowGrad.addColorStop(0, 'rgba(2, 132, 199, 0.35)');
      glowGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
      glowGrad.addColorStop(1, 'rgba(7, 26, 51, 0)');
      
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // 2. Draw Planet Sphere Base Background
      const planetGrad = ctx.createRadialGradient(
        cx - radius * 0.3, 
        cy - radius * 0.3, 
        radius * 0.1, 
        cx, 
        cy, 
        radius
      );
      planetGrad.addColorStop(0, '#0D47A1');
      planetGrad.addColorStop(0.65, '#071A33');
      planetGrad.addColorStop(1, '#040E1C');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = planetGrad;
      ctx.fill();

      // Sphere border ring
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.stroke();

      // 3. Helper for 3D Projection
      const project3D = (lat: number, lng: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        // Spherical to Cartesian (r = radius)
        const x0 = -radius * Math.sin(phi) * Math.cos(theta);
        const z0 = radius * Math.sin(phi) * Math.sin(theta);
        const y0 = radius * Math.cos(phi);

        // Rotate around Y axis
        const x1 = x0 * Math.cos(rotY) + z0 * Math.sin(rotY);
        const z1 = -x0 * Math.sin(rotY) + z0 * Math.cos(rotY);

        // Rotate around X axis
        const y1 = y0 * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y0 * Math.sin(rotX) + z1 * Math.cos(rotX);

        return {
          x: cx + x1,
          y: cy + y1,
          z: z2,
          visible: z2 > 5 // Front hemisphere
        };
      };

      // 4. Draw Latitude & Longitude Graticule Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 10) {
          const pt = project3D(lat, lng);
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Longitude lines
      for (let lng = -180; lng < 180; lng += 45) {
        ctx.beginPath();
        let started = false;
        for (let lat = -80; lat <= 80; lat += 5) {
          const pt = project3D(lat, lng);
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // 5. Draw Landmass Continent Points
      for (let i = 0; i < CONTINENT_POINTS.length; i++) {
        const p = CONTINENT_POINTS[i];
        const pt = project3D(p.lat, p.lng);
        if (pt.visible) {
          // Scale size and opacity based on depth (z)
          const depthRatio = pt.z / radius; // 0 to 1
          const dotSize = Math.max(0.8, 1.8 * depthRatio);
          const opacity = 0.25 + 0.55 * depthRatio;

          ctx.fillStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 6. Draw All Secondary Database Cities
      CITIES_DATABASE.forEach(dbCity => {
        if (dbCity.id === city.id) return; // Skip primary active city for hero marker
        const pt = project3D(dbCity.lat, dbCity.lng);
        if (pt.visible) {
          const alpha = 0.4 + (pt.z / radius) * 0.4;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 7. Draw Active Selected City (Primary Beacon / Marker)
      const heroPt = project3D(city.lat, city.lng);
      if (heroPt.visible) {
        const pulseScale = (Math.sin(pulsePhase) + 1) / 2; // 0 to 1
        
        // Expanding Radar Ping Ring 1
        const ring1Radius = 6 + pulseScale * 14;
        const ring1Alpha = 0.8 * (1 - pulseScale);
        ctx.beginPath();
        ctx.arc(heroPt.x, heroPt.y, ring1Radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(2, 132, 199, ${ring1Alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Expanding Radar Ping Ring 2 (Offset phase)
        const pulseScale2 = (Math.sin(pulsePhase + Math.PI / 2) + 1) / 2;
        const ring2Radius = 5 + pulseScale2 * 20;
        const ring2Alpha = 0.6 * (1 - pulseScale2);
        ctx.beginPath();
        ctx.arc(heroPt.x, heroPt.y, ring2Radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${ring2Alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Vertical Location Pin Light Line
        ctx.beginPath();
        ctx.moveTo(heroPt.x, heroPt.y);
        ctx.lineTo(heroPt.x, heroPt.y - 20);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Top Pin Head Dot
        ctx.beginPath();
        ctx.arc(heroPt.x, heroPt.y - 22, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38BDF8';
        ctx.shadowColor = '#0284C7';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Center Solid Origin Core
        ctx.beginPath();
        ctx.arc(heroPt.x, heroPt.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(heroPt.x, heroPt.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#0284C7';
        ctx.fill();

        // City Label Floating Badge on Globe
        ctx.font = 'bold 11px Inter, sans-serif';
        const labelText = `📍 ${city.name}`;
        const textWidth = ctx.measureText(labelText).width;
        const badgeX = heroPt.x - textWidth / 2 - 6;
        const badgeY = heroPt.y - 42;

        // Label background pill
        ctx.fillStyle = 'rgba(7, 26, 51, 0.9)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(badgeX, badgeY, textWidth + 12, 18, 9);
        } else {
          ctx.rect(badgeX, badgeY, textWidth + 12, 18);
        }
        ctx.fill();
        ctx.stroke();

        // Label Text
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(labelText, badgeX + 6, badgeY + 13);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [city]);

  // Mouse Interaction Handlers for Dragging Globe
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    userInteractedRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    rotYRef.current += deltaX * 0.006;
    rotXRef.current += deltaY * 0.006;

    // Clamp X rotation to prevent flipping upside down
    rotXRef.current = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotXRef.current));

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleResetLocation = () => {
    let targetLngRad = -city.lng * (Math.PI / 180);
    let targetLatRad = city.lat * (Math.PI / 180);

    let diffY = (targetLngRad - rotYRef.current) % (2 * Math.PI);
    if (diffY > Math.PI) diffY -= 2 * Math.PI;
    if (diffY < -Math.PI) diffY += 2 * Math.PI;

    targetRotYRef.current = rotYRef.current + diffY;
    targetRotXRef.current = targetLatRad;
    userInteractedRef.current = false;
  };

  return (
    <section style={{
      width: '100%',
      maxWidth: 'var(--max-width)',
      margin: '0 auto 2.5rem auto',
      padding: '0 1.5rem'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #071A33 0%, #040E1C 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        boxShadow: '0 16px 40px rgba(7, 26, 51, 0.25)',
        padding: '1.75rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.2) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        {/* 3D Canvas Globe Viewport */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <canvas
            ref={canvasRef}
            width={380}
            height={380}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              width: '100%',
              maxWidth: '380px',
              height: 'auto',
              aspectRatio: '1/1',
              cursor: isDraggingRef.current ? 'grabbing' : 'grab',
              touchAction: 'none'
            }}
            title="Haz clic y arrastra para rotar el globo terráqueo 3D"
          />

          <div style={{
            position: 'absolute',
            bottom: '5px',
            fontSize: '0.7rem',
            color: 'rgba(255, 255, 255, 0.5)',
            pointerEvents: 'none',
            background: 'rgba(7, 26, 51, 0.6)',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            🖱️ Arrastra para girar en 3D
          </div>
        </div>

        {/* City Info & Location Controls Side Panel */}
        <div style={{ color: '#FFFFFF', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(2, 132, 199, 0.2)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            color: '#38BDF8',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '0.3rem 0.75rem',
            borderRadius: '20px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.85rem'
          }}>
            🌐 Globo Terráqueo 3D · Origen de Hora
          </div>

          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '0.35rem',
            fontFamily: 'var(--font-display)'
          }}>
            {city.name}
          </h2>

          <p style={{
            fontSize: '0.95rem',
            color: '#38BDF8',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            {city.country} ({city.countryCode}) · {city.region}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>COORDENADAS</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                {Math.abs(city.lat).toFixed(2)}° {city.lat >= 0 ? 'N' : 'S'}, {Math.abs(city.lng).toFixed(2)}° {city.lng >= 0 ? 'E' : 'O'}
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>ZONA HORARIA</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px', wordBreak: 'break-all' }}>
                {city.timezone.split('/')[1]?.replace(/_/g, ' ') || city.timezone}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={handleResetLocation}
              style={{
                background: 'linear-gradient(135deg, #0284C7 0%, #0D47A1 100%)',
                color: '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: 700,
                padding: '0.6rem 1.1rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
                transition: 'var(--transition-fast)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              📍 Centrar Origen en {city.name}
            </button>

            {onSelectCity && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {CITIES_DATABASE.slice(0, 4).filter(c => c.id !== city.id).map(quickCity => (
                  <button
                    key={quickCity.id}
                    onClick={() => onSelectCity(quickCity)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#E0F2FE',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                    title={`Ver hora y rotar globo a ${quickCity.name}`}
                  >
                    ✈️ {quickCity.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
