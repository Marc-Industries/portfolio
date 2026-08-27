'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Dense starfield behind everything else.
 * Mixes small (background) and slightly larger (foreground) stars for depth.
 * Palette: cool whites + occasional ember warm star.
 */
export function StarsBackdrop({ count = 2000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 30 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      // Mostly cool white, occasional warm red/amber star
      const warm = Math.random() < 0.08;
      if (warm) {
        colors[i * 3] = 1.00; colors[i * 3 + 1] = 0.45; colors[i * 3 + 2] = 0.30;
      } else {
        const c = 0.7 + Math.random() * 0.3;
        colors[i * 3] = c; colors[i * 3 + 1] = c; colors[i * 3 + 2] = c + 0.04;
      }
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
