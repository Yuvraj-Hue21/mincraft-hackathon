/* eslint-disable react/purity */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, PointLight } from "three";

export function VoxelTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color="#5c3a21" flatShading />
      </mesh>
      {[1.1, 1.5, 1.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <boxGeometry args={[1.4 - i * 0.3, 0.6, 1.4 - i * 0.3]} />
          <meshStandardMaterial color="#3d6b2b" flatShading />
        </mesh>
      ))}
    </group>
  );
}

export function VoxelMountain({ position, scale = 1, color = "#5a5a5f" }: { position: [number, number, number]; scale?: number; color?: string }) {
  return (
    <group position={position} scale={scale}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, i * 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[6 - i * 1.4, 1.4, 6 - i * 1.4]} />
          <meshStandardMaterial color={i === 3 ? "#e8e1d0" : color} flatShading roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

export function Torch({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const flame = useRef<Mesh>(null);
  const light = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flicker = Math.sin(t * 12) * 0.15 + Math.sin(t * 27 + 3) * 0.08;
    if (flame.current) flame.current.scale.setScalar(1 + flicker * 0.15);
    if (light.current) light.current.intensity = 2 + flicker;
  });

  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[0.12, 0.8, 0.12]} />
        <meshStandardMaterial color="#5c3a21" flatShading />
      </mesh>
      <mesh ref={flame} position={[0, 0.5, 0]}>
        <boxGeometry args={[0.22, 0.3, 0.22]} />
        <meshStandardMaterial color="#ffb347" emissive="#ff8c1a" emissiveIntensity={2} flatShading />
      </mesh>
      <pointLight ref={light} position={[0, 0.55, 0]} color="#ffb347" intensity={2} distance={5} decay={2} />
    </group>
  );
}

export function CaveEntrance({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 3, 2]} />
        <meshStandardMaterial color="#050505" flatShading />
      </mesh>
      <mesh position={[-1.7, 0.8, 0]} castShadow>
        <boxGeometry args={[0.6, 2.4, 2]} />
        <meshStandardMaterial color="#3d3d42" flatShading />
      </mesh>
      <mesh position={[1.7, 0.8, 0]} castShadow>
        <boxGeometry args={[0.6, 2.4, 2]} />
        <meshStandardMaterial color="#3d3d42" flatShading />
      </mesh>
    </group>
  );
}

export function FloatingBlock({ position, color = "#a566d6", seed = 0 }: { position: [number, number, number]; color?: string; seed?: number }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + seed;
    const g = ref.current;
    if (!g) return;
    g.position.y = position[1] + Math.sin(t * 0.7) * 0.3;
    g.rotation.y += 0.004;
    g.rotation.x = Math.sin(t * 0.5) * 0.05;
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </group>
  );
}

export function MovingCloud({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<Group>(null);
  const speed = useMemo(() => 0.2 + Math.random() * 0.4, []);
  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    g.position.x = position[0] + Math.sin(t * speed * 0.3) * 6;
    g.position.y = position[1] + Math.sin(t * 0.2 + position[0]) * 0.2;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[2.4, 0.5, 1.4]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} flatShading />
      </mesh>
      <mesh position={[1, 0, 0.2]}>
        <boxGeometry args={[1.2, 0.4, 1]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} flatShading />
      </mesh>
      <mesh position={[-1, 0.2, 0]}>
        <boxGeometry args={[1, 0.4, 1]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.55} flatShading />
      </mesh>
    </group>
  );
}

export function RedstoneNode({
  position,
  progress,
  index,
}: {
  position: [number, number, number];
  progress: number;
  index: number;
}) {
  const core = useRef<Mesh>(null);
  useFrame(() => {
    const active = progress >= index;
    if (core.current) {
      const mat = core.current.material as any;
      mat.emissiveIntensity = active ? 1.5 + Math.sin(Date.now() * 0.01) * 0.3 : 0.1;
      core.current.scale.setScalar(active ? 1 : 0.6);
    }
  });
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshStandardMaterial color="#8b4513" flatShading />
      </mesh>
      <mesh ref={core} position={[0, 0.02, 0]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#e3302b" emissive="#ff2b23" emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
}

export function ChestLid({ open, position }: { open: boolean; position: [number, number, number] }) {
  const lid = useRef<Group>(null);
  useFrame(() => {
    if (lid.current) {
      const target = open ? -1.6 : 0;
      const cur = lid.current.rotation.x;
      lid.current.rotation.x += (target - cur) * 0.1;
    }
  });
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.2, 0.7, 0.8]} />
        <meshStandardMaterial color="#5c3a21" flatShading />
      </mesh>
      <group ref={lid} position={[0, 0.7, 0]}>
        <mesh position={[0, 0.35, -0.2]}>
          <boxGeometry args={[1.2, 0.7, 0.8]} />
          <meshStandardMaterial color="#6b4423" flatShading />
        </mesh>
      </group>
    </group>
  );
}
