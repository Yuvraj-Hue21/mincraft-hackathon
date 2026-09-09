/* eslint-disable react/purity */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Mesh, MeshStandardMaterial } from "three";

const dummy = new Object3D();

export function Portal({ position, scale = 1, active = true }: { position: [number, number, number]; scale?: number; active?: boolean }) {
  const inner = useRef<Mesh>(null);
  const particles = useRef<InstancedMesh>(null);

  const seeds = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: 0.4 + Math.random() * 0.6,
        y: Math.random(),
        speed: 0.5 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (inner.current) {
      const mat = inner.current.material as MeshStandardMaterial;
      mat.emissiveIntensity = active ? 1.6 + Math.sin(t * 3) * 0.4 : 0.2;
    }
    if (particles.current) {
      if (!active) {
        particles.current.visible = false;
        return;
      }
      particles.current.visible = true;
      seeds.forEach((s, i) => {
        const x = Math.cos(s.angle + t * s.speed) * s.radius;
        const z = Math.sin(s.angle + t * s.speed) * s.radius * 0.3;
        const y = ((s.y + t * s.speed * 0.3) % 1) * 2.6;
        dummy.position.set(x, y, z);
        dummy.scale.setScalar(0.05 + Math.sin(t * 5 + s.offset) * 0.02);
        dummy.updateMatrix();
        particles.current!.setMatrixAt(i, dummy.matrix);
      });
      particles.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh position={[-1.1, 1, 0]} castShadow>
        <boxGeometry args={[0.4, 3, 0.4]} />
        <meshStandardMaterial color="#14131a" flatShading />
      </mesh>
      <mesh position={[1.1, 1, 0]} castShadow>
        <boxGeometry args={[0.4, 3, 0.4]} />
        <meshStandardMaterial color="#14131a" flatShading />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[2.6, 0.4, 0.4]} />
        <meshStandardMaterial color="#14131a" flatShading />
      </mesh>
      <mesh position={[0, -0.5, 0]} castShadow>
        <boxGeometry args={[2.6, 0.4, 0.4]} />
        <meshStandardMaterial color="#14131a" flatShading />
      </mesh>
      <mesh ref={inner} position={[0, 1, 0]}>
        <planeGeometry args={[1.8, 2.8]} />
        <meshStandardMaterial color="#a566d6" emissive="#c88ff2" emissiveIntensity={1.6} />
      </mesh>
      <instancedMesh ref={particles} args={[undefined, undefined, 40]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#c88ff2" transparent opacity={0.9} />
      </instancedMesh>
    </group>
  );
}
