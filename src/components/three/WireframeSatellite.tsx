'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

interface Props {
  scroll: number;
}

/**
 * Wireframe satellite: a procedural CubeSat-style structure that slowly orbits
 * above the Earth. Pure three.js geometry — crimson wireframe with bright vertices.
 */
export function WireframeSatellite({ scroll }: Props) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Smooth orbit
    group.current.position.x = Math.sin(t * 0.18 + scroll * 1.6) * 4.5;
    group.current.position.y = Math.cos(t * 0.12 + scroll * 0.8) * 1.8;
    group.current.position.z = Math.sin(t * 0.06) * 0.6 + 0.5;
    // Self-rotation
    group.current.rotation.x = t * 0.15 + scroll * 0.4;
    group.current.rotation.y = t * 0.22 + scroll * 0.6;
    group.current.rotation.z = t * 0.08;
  });

  return (
    <group ref={group}>
      {/* Central bus */}
      <mesh>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshBasicMaterial color="#D43F3F" wireframe transparent opacity={0.95} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.92, 0.92, 0.92]} />
        <meshBasicMaterial color="#FF5C3A" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Solar panel wings */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.05, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.2, 0.7, 0.05]} />
            <meshBasicMaterial color="#D43F3F" wireframe transparent opacity={0.7} />
          </mesh>
          {/* grid lines on panel */}
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.15, 0.65, 4, 3]} />
            <meshBasicMaterial color="#FF5C3A" wireframe transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Antenna */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
        <meshBasicMaterial color="#F2D9D9" />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshBasicMaterial color="#D43F3F" />
      </mesh>

      {/* Corner vertex points (bright dots) */}
      {[
        [-0.45, -0.45, -0.45], [0.45, -0.45, -0.45], [-0.45, 0.45, -0.45], [0.45, 0.45, -0.45],
        [-0.45, -0.45, 0.45], [0.45, -0.45, 0.45], [-0.45, 0.45, 0.45], [0.45, 0.45, 0.45],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#FF8A5C" />
        </mesh>
      ))}
    </group>
  );
}
