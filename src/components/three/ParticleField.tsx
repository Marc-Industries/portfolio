'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Floating telemetry points — Points geometry, advected slowly.
 * Used as background "data dust" that gives depth without distraction.
 * Palette: crimson / amber mix.
 */
export function ParticleField({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      speeds[i] = 0.02 + Math.random() * 0.06;
      // 70% crimson, 25% ember, 5% amber
      const r0 = Math.random();
      if (r0 < 0.70) {
        colors[i * 3] = 0.83; colors[i * 3 + 1] = 0.25; colors[i * 3 + 2] = 0.25;
      } else if (r0 < 0.95) {
        colors[i * 3] = 1.00; colors[i * 3 + 1] = 0.54; colors[i * 3 + 2] = 0.36;
      } else {
        colors[i * 3] = 0.95; colors[i * 3 + 1] = 0.71; colors[i * 3 + 2] = 0.26;
      }
    }
    return { positions, speeds, colors };
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] * dt;
      if (arr[i * 3 + 1] < -10) arr[i * 3 + 1] = 10;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
