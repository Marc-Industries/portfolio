'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural Earth — deep red / black cinematic look.
 * No external textures, no licensing concerns.
 * The body is a dark marble lit by crimson emissive; wireframe lat/long overlay
 * gives the engineering-telemetry feel; layered atmospheric shells add depth.
 */
export function Earth({ scroll = 0 }: { scroll?: number }) {
  const group = useRef<THREE.Group>(null);
  const atm  = useRef<THREE.Mesh>(null);

  useFrame((state, dt) => {
    if (!group.current) return;
    // Slow rotation — engineering, not cinematic.
    group.current.rotation.y += dt * 0.04;
    // Tilt slightly as we scroll deeper into the journey.
    group.current.rotation.x = -0.18 + scroll * 0.05;
    // Pull back as the user scrolls.
    const z = 6 - scroll * 4;
    group.current.position.z = z;
    if (atm.current) {
      atm.current.rotation.y -= dt * 0.02;
      atm.current.rotation.z += dt * 0.005;
    }
  });

  return (
    <group ref={group} position={[0, 0, 6]}>
      {/* Earth body — deep black/blood marble, crimson emissive */}
      <Sphere args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#0E0202"
          emissive="#5A1A1A"
          emissiveIntensity={0.65}
          roughness={0.85}
          metalness={0.25}
          distort={0.08}
          speed={0.25}
        />
      </Sphere>

      {/* Latitude / longitude wireframe overlay — crimson */}
      <Sphere args={[1.605, 32, 16]}>
        <meshBasicMaterial
          color="#D43F3F"
          wireframe
          transparent
          opacity={0.32}
        />
      </Sphere>

      {/* Atmosphere shells — multi-layer crimson glow */}
      <Sphere ref={atm} args={[1.75, 64, 64]}>
        <meshBasicMaterial
          color="#FF5C3A"
          transparent
          opacity={0.10}
          side={THREE.BackSide}
        />
      </Sphere>
      <Sphere args={[1.88, 48, 48]}>
        <meshBasicMaterial
          color="#D43F3F"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>
      <Sphere args={[2.05, 32, 32]}>
        <meshBasicMaterial
          color="#8B0F0F"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}
