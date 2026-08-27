'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Earth } from './Earth';
import { ParticleField } from './ParticleField';
import { useScroll, useDeviceProfile } from './hooks';
import { OrbitTrails } from './OrbitTrails';
import { StarsBackdrop } from './StarsBackdrop';
import { WireframeSatellite } from './WireframeSatellite';
import { HologramRings } from './HologramRings';
import { DataRibbon } from './DataRibbon';

/**
 * Persistent 3D backdrop — present on every page.
 * Cinematic, 3D-dense: Earth, satellite, hologram rings, orbiting satellites,
 * data ribbons, telemetry particles, starfield.
 */
export function Scene({ reduced }: { reduced?: boolean }) {
  const scroll = useScroll();
  const profile = useDeviceProfile();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const isLowEnd = profile.isMobile && profile.dpr < 2;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      data-3d-canvas
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 200 }}
        dpr={isLowEnd ? [1, 1.25] : [1, 1.75]}
        gl={{ antialias: !isLowEnd, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x050000, 0);
        }}
      >
        <Suspense fallback={null}>
          {/* Cinematic lighting — deep red, rim accent */}
          <ambientLight intensity={0.15} color="#5A1A1A" />
          <directionalLight position={[6, 4, 5]} intensity={0.85} color="#FF5C3A" />
          <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#D43F3F" />
          <pointLight position={[0, -8, 3]} intensity={0.6} color="#8B0F0F" distance={20} />

          {/* Stars backdrop */}
          <StarsBackdrop count={isLowEnd ? 1000 : 2800} />

          {/* Earth — large, persistent, slow-rotating */}
          <Earth scroll={scroll.progress} />

          {/* Wireframe satellite — slowly orbiting above the Earth */}
          <WireframeSatellite scroll={scroll.progress} />

          {/* Hologram rings — concentric, rotating */}
          <HologramRings scroll={scroll.progress} />

          {/* Orbital trails */}
          <OrbitTrails scroll={scroll.progress} />

          {/* Telemetry particle field */}
          <ParticleField count={isLowEnd ? 120 : 320} />

          {/* Slow data ribbons flowing across the scene */}
          <DataRibbon />
        </Suspense>
      </Canvas>
    </div>
  );
}
