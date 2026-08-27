'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, BufferAttribute, Points } from 'three';

/**
 * Data ribbon: a slow flowing river of crimson points crossing the scene
 * diagonally. ~400 particles, faint, suggests telemetry / data flow.
 */
export function DataRibbon() {
  const points = useRef<Points>(null);

  const { positions, baseY } = useMemo(() => {
    const N = 400;
    const positions = new Float32Array(N * 3);
    const baseY = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const t = i / N;
      // Diagonal ribbon path
      positions[i * 3 + 0] = (t - 0.5) * 18;          // x: -9..9
      positions[i * 3 + 1] = Math.sin(t * Math.PI) * 1.5 - 4; // y: gentle arc
      positions[i * 3 + 2] = Math.cos(t * Math.PI) * 0.5;     // z: depth
      baseY[i] = positions[i * 3 + 1];
    }
    return { positions, baseY };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    const arr = (points.current.geometry as BufferGeometry).attributes.position as BufferAttribute;
    const data = arr.array as Float32Array;
    for (let i = 0; i < baseY.length; i++) {
      data[i * 3 + 0] = ((i / baseY.length) - 0.5) * 18 + Math.sin(t * 0.4 + i * 0.05) * 0.4;
      data[i * 3 + 1] = baseY[i] + Math.cos(t * 0.3 + i * 0.03) * 0.3;
    }
    arr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF5C3A"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}
