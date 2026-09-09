/* eslint-disable react/purity */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color } from "three";

const dummy = new Object3D();

export type ParticleKind = "dust" | "firefly" | "ember" | "leaf" | "star";

interface ParticleConfig {
  color: string;
  size?: number;
  gravity?: number;
  rise?: number;
  drift?: number;
  spreadX?: number;
  spreadY?: number;
  spreadZ?: number;
}

const configs: Record<ParticleKind, ParticleConfig> = {
  dust: { color: "#cfc4a8", size: 0.05, drift: 0.3, spreadY: 4 },
  firefly: { color: "#ffe66d", size: 0.06, drift: 0.6, spreadY: 4, spreadX: 10, spreadZ: 10 },
  ember: { color: "#ff8c3b", size: 0.05, rise: 0.8, drift: 0.4, spreadY: 5 },
  leaf: { color: "#7ac74f", size: 0.12, gravity: 0.3, drift: 0.7, spreadY: 4 },
  star: { color: "#c88ff2", size: 0.06, drift: 0.5, rise: 0.3, spreadY: 6 },
};

export function Particles({
  count = 40,
  kind = "dust",
  area = 16,
  centerY = 2,
  opacity = 0.7,
}: {
  count?: number;
  kind?: ParticleKind;
  area?: number;
  centerY?: number;
  opacity?: number;
}) {
  const ref = useRef<InstancedMesh>(null);
  const cfg = configs[kind];
  const size = cfg.size ?? 0.05;
  const gravity = cfg.gravity ?? 0;
  const rise = cfg.rise ?? 0;
  const drift = cfg.drift ?? 0.3;
  const ySpan = cfg.spreadY ?? 4;

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * area,
        y: centerY + (Math.random() - 0.5) * ySpan,
        z: (Math.random() - 0.5) * area,
        speed: 0.15 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        size: size * (0.7 + Math.random() * 0.6),
      })),
    [count, area, centerY, ySpan, size]
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    seeds.forEach((s, i) => {
      let x = s.x + Math.sin(t * s.speed + s.phase) * drift;
      let y = s.y + Math.sin(t * 0.6 + s.phase) * 0.4;
      let z = s.z + Math.cos(t * s.speed * 0.7 + s.phase) * drift;
      if (rise) y += t * rise * 0.1;
      if (gravity) y -= t * gravity * 0.1;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(s.size);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, kind === "dust" ? 4 : 4, 4]} />
      <meshBasicMaterial color={new Color(cfg.color)} transparent opacity={opacity} />
    </instancedMesh>
  );
}

export function FloatingDust({ count = 60, area = 20 }: { count?: number; area?: number }) {
  return <Particles count={count} kind="dust" area={area} opacity={0.6} />;
}
