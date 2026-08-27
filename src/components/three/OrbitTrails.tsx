'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitConfig {
  radius: number;
  tilt: number;
  speed: number;
  color: string;
  offset: number;
  marker: 'oct' | 'box' | 'tetra';
}

/**
 * Crimson orbital trails around the central Earth.
 * Each trail is a thin torus plus a moving marker. Markers vary shape so the
 * scene reads as multiple distinct satellites rather than a uniform swarm.
 */
const ORBITS: OrbitConfig[] = [
  { radius: 2.3, tilt: 0.0,  speed: 0.45, color: '#D43F3F', offset: 0.0, marker: 'oct' },
  { radius: 2.8, tilt: 0.4,  speed: 0.32, color: '#FF5C3A', offset: 1.0, marker: 'box' },
  { radius: 3.4, tilt: -0.3, speed: 0.24, color: '#F2B441', offset: 2.0, marker: 'tetra' },
  { radius: 4.1, tilt: 0.15, speed: 0.18, color: '#FF8A5C', offset: 3.0, marker: 'oct' },
];

export function OrbitTrails({ scroll = 0 }: { scroll?: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.position.z = 6 - scroll * 4;
    group.current.rotation.x = -0.18 + scroll * 0.05;
  });

  return (
    <group ref={group} position={[0, 0, 6]}>
      {ORBITS.map((o, i) => (
        <Orbit key={i} {...o} />
      ))}
    </group>
  );
}

function Orbit({ radius, tilt, speed, color, offset, marker }: OrbitConfig) {
  const satRef = useRef<THREE.Mesh>(null);
  const t0 = useRef(Math.random() * 10 + offset);

  useFrame((_, dt) => {
    if (!satRef.current) return;
    t0.current += dt * speed;
    const a = t0.current;
    satRef.current.position.set(
      Math.cos(a) * radius,
      Math.sin(tilt) * Math.sin(a) * radius,
      Math.sin(a) * radius,
    );
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      {/* Trail */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.005, 8, 256]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      {/* Satellite marker */}
      <mesh ref={satRef}>
        {marker === 'oct'   && <octahedronGeometry args={[0.045, 0]} />}
        {marker === 'box'   && <boxGeometry       args={[0.07, 0.07, 0.07]} />}
        {marker === 'tetra' && <tetrahedronGeometry args={[0.07, 0]} />}
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
