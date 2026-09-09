import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { City } from '../data/cities';

interface RealisticEarthGlobeProps {
  city: City;
  onSelectCity?: (city: City) => void;
}

export const RealisticEarthGlobe: React.FC<RealisticEarthGlobeProps> = ({ city }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Exact target rotation angles to bring any city (city.lat, city.lng) directly to camera center (+Z):
  // rotY = -lngRad - PI / 2
  // rotX = latRad
  const getTargetAngles = (targetCity: City) => {
    const latRad = targetCity.lat * (Math.PI / 180);
    const lngRad = targetCity.lng * (Math.PI / 180);
    return {
      rotY: -lngRad - Math.PI / 2,
      rotX: latRad
    };
  };

  const initialAngles = getTargetAngles(city);
  const targetRotYRef = useRef<number>(initialAngles.rotY);
  const targetRotXRef = useRef<number>(initialAngles.rotX);

  // Current smooth camera rotation angles
  const rotYRef = useRef<number>(initialAngles.rotY);
  const rotXRef = useRef<number>(initialAngles.rotX);

  // Mouse drag state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Update target rotation angles smoothly when active city changes
  useEffect(() => {
    const { rotY: newTargetY, rotX: newTargetX } = getTargetAngles(city);

    // Calculate shortest angular path around 2*PI for smooth rotation
    let diffY = (newTargetY - rotYRef.current) % (2 * Math.PI);
    if (diffY > Math.PI) diffY -= 2 * Math.PI;
    if (diffY < -Math.PI) diffY += 2 * Math.PI;

    targetRotYRef.current = rotYRef.current + diffY;
    targetRotXRef.current = newTargetX;
  }, [city]);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 540;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    const cameraDistance = 280;
    camera.position.set(0, 0, cameraDistance);

    // 2. WebGL Renderer (Transparent Alpha for clean white background integration)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    // 3. Lighting (Sun & Realistic Ambient Light for 3D Volume Relief)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(180, 120, 220);
    scene.add(sunLight);

    // 4. Photorealistic NASA Earth Satellite Globe
    const globeRadius = 90;
    const earthGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);

    // Load High-Res NASA Blue Marble Satellite Photograph with base path fallback
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : import.meta.env.BASE_URL + '/';
    const textureUrl = `${baseUrl}earth-blue-marble.jpg`;

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      textureUrl,
      undefined,
      undefined,
      (err) => console.warn('Earth texture loading error:', err)
    );
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0xffffff), // White base so the texture renders with its original colors
      map: earthTexture,
      shininess: 25,
      specular: new THREE.Color(0x38bdf8)
    });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // 5. Subtle Glowing Google Maps Red Location Pin Marker
    const pinGroup = new THREE.Group();

    // Red Head Sphere
    const headGeo = new THREE.SphereGeometry(3.2, 24, 24);
    const headMat = new THREE.MeshBasicMaterial({ color: 0xe11d48 }); // Google Maps Red
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.y = 5;
    pinGroup.add(headMesh);

    // White Core Center Dot
    const coreGeo = new THREE.SphereGeometry(1.4, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 5;
    pinGroup.add(coreMesh);

    // Pin Point Cone Base pointing directly down at surface
    const coneGeo = new THREE.ConeGeometry(2.4, 5.5, 16);
    const coneMat = new THREE.MeshBasicMaterial({ color: 0xe11d48 });
    const coneMesh = new THREE.Mesh(coneGeo, coneMat);
    coneMesh.rotation.x = Math.PI; // point down
    coneMesh.position.y = 2;
    pinGroup.add(coneMesh);

    // Soft Subtle Pulsing Aura Ring on Planet Surface
    const ringGeo = new THREE.RingGeometry(1.2, 3.0, 32);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2; // Flat on planet surface
    pinGroup.add(ringMesh1);

    // Gentle Outer Wave Ring
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    });
    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2;
    pinGroup.add(ringMesh2);

    earthMesh.add(pinGroup);

    // Update 3D Pin position on Earth sphere surface
    const updatePinPosition = () => {
      const latRad = city.lat * (Math.PI / 180);
      const lngRad = city.lng * (Math.PI / 180);

      // Exact Three.js SphereGeometry 3D surface coordinates for (lat, lng)
      const px = globeRadius * Math.cos(latRad) * Math.cos(lngRad);
      const py = globeRadius * Math.sin(latRad);
      const pz = -globeRadius * Math.cos(latRad) * Math.sin(lngRad);

      pinGroup.position.set(px, py, pz);

      // Orient pin vector perpendicular to globe surface
      const normal = new THREE.Vector3(px, py, pz).normalize();
      pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    };

    updatePinPosition();

    // Set initial rotation
    earthMesh.rotation.y = rotYRef.current;
    earthMesh.rotation.x = rotXRef.current;

    // 6. Animation Loop (Calm, Smooth & Subtle Breathing Pulse)
    let animationFrameId: number;
    let pulseTime = 0;

    const animate = () => {
      pulseTime += 0.015; // Slow, calm frequency for gentle blinking

      // 1. Subtle, smooth breathing scale on red pin head (+-6% variation)
      const gentlePulse = 1 + 0.06 * Math.sin(pulseTime * 2);
      headMesh.scale.set(gentlePulse, gentlePulse, gentlePulse);

      // 2. Soft breathing opacity on inner ring
      const opacityGlow = 0.4 + 0.3 * Math.sin(pulseTime * 2);
      ringMat1.opacity = opacityGlow;

      // 3. Smooth, slow expanding wave
      const wave = (pulseTime * 0.3) % 1;
      const waveScale = 1 + wave * 2.0;
      ringMesh2.scale.set(waveScale, waveScale, waveScale);
      ringMat2.opacity = 0.35 * (1 - wave);

      // Interpolate smooth rotation towards target coordinates
      if (!isDraggingRef.current) {
        rotYRef.current += (targetRotYRef.current - rotYRef.current) * 0.07;
        rotXRef.current += (targetRotXRef.current - rotXRef.current) * 0.07;
      }

      earthMesh.rotation.y = rotYRef.current;
      earthMesh.rotation.x = rotXRef.current;

      updatePinPosition();

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [city]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotYRef.current += deltaX * 0.005;
    rotXRef.current += deltaY * 0.005;

    // Clamp X rotation to prevent flipping upside down
    rotXRef.current = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotXRef.current));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section style={{
      width: '100%',
      maxWidth: 'var(--max-width)',
      margin: '0.5rem auto 1.5rem auto',
      padding: '0 1.5rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Restored Preferred Electric Blue & Navy Shadow Glow Backdrop */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '450px',
          height: '450px',
          marginTop: '-225px',
          marginLeft: '-225px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.65) 0%, rgba(2, 132, 199, 0.35) 50%, rgba(7, 26, 51, 0.15) 75%, transparent 100%)',
          boxShadow: '0 25px 80px rgba(2, 132, 199, 0.7), 0 12px 35px rgba(7, 26, 51, 0.4)',
          filter: 'blur(26px)',
          transform: 'translateY(12px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* 3D Photorealistic Satellite Globe Viewport */}
        <div
          ref={mountRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            width: '100%',
            height: '540px',
            cursor: isDraggingRef.current ? 'grabbing' : 'grab',
            position: 'relative',
            zIndex: 1
          }}
          title="Arrastra para rotar la Tierra en 3D"
        />
      </div>
    </section>
  );
};
