'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface Props {
  scroll: number;
}

/**
 * Concentric hologram rings: faint rotating tori that read as a HUD reticle
 * behind the Earth. Different axes / speeds to add depth.
 */
export function HologramRings({ scroll }: Props) {
  const ringA = useRef<Group>(null);
  const ringB = useRef<Group>(null);
  const ringC = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + scroll * 0.4;
    if (ringA.current) {
      ringA.current.rotation.x = t * 0.10;
      ringA.current.rotation.y = t * 0.06;
    }
    if (ringB.current) {
      ringB.current.rotation.x = -t * 0.08;
      ringB.current.rotation.z = t * 0.05;
    }
    if (ringC.current) {
      ringC.current.rotation.y = -t * 0.12;
      ringC.current.rotation.z = -t * 0.04;
    }
  });

  return (
    <group>
      <group ref={ringA}>
        <mesh>
          <torusGeometry args={[5.2, 0.012, 8, 96]} />
          <meshBasicMaterial color="#D43F3F" transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.4, 0.006, 8, 96]} />
          <meshBasicMaterial color="#FF5C3A" transparent opacity={0.3} />
        </mesh>
      </group>

      <group ref={ringB} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[6.0, 0.010, 8, 80]} />
          <meshBasicMaterial color="#8B0F0F" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[6.2, 0.005, 8, 80]} />
          <meshBasicMaterial color="#D43F3F" transparent opacity={0.25} />
        </mesh>
      </group>

      <group ref={ringC} rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[7.0, 0.008, 8, 64]} />
          <meshBasicMaterial color="#FF8A5C" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
}
