import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { DirectionalLight, AmbientLight, Fog } from "three";
import { Terrain } from "./Terrain";
import { VoxelTree, VoxelMountain, Torch, CaveEntrance, FloatingBlock, MovingCloud } from "./Props";
import { Character, MysteriousEntity } from "./Character";
import { Portal } from "./Portal";
import { Particles } from "./Particles";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function World({ quality = "full" }: { quality?: "full" | "reduced" }) {
  const { camera, pointer } = useThree();
  const reducedMotion = usePrefersReducedMotion();
  const rigRef = useRef({ x: 0, y: 2.6, z: 9, pitch: -0.05 });
  const [showEntity, setShowEntity] = useState(false);
  const dayRef = useRef(1); // 1 = day, 0 = night
  const sunLight = useRef<DirectionalLight>(null);
  const ambient = useRef<AmbientLight>(null);
  const fogRef = useRef<Fog>(null);

  // Cinematic camera entrance
  useEffect(() => {
    if (reducedMotion) return;
    const rig = rigRef.current;
    const startY = 4.4;
    const startZ = 13.5;
    const start = performance.now();
    const dur = 2200;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      rig.y = startY + (2.6 - startY) * e;
      rig.z = startZ + (9 - startZ) * e;
      rig.pitch = -0.16 + (0.02) * e;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Herobrine reveals itself briefly
  useEffect(() => {
    const t = setTimeout(() => {
      setShowEntity(true);
      setTimeout(() => setShowEntity(false), 2600);
    }, 6500);
    return () => clearTimeout(t);
  }, []);

  useFrame(() => {
    if (!reducedMotion) {
      // day -> night driven by scroll toward About section
      const hero = document.querySelector("#about") as HTMLElement | null;
      let progress = 0;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.2;
        const end = vh * 1.5;
        progress = 1 - Math.min(1, Math.max(0, (rect.top - start) / (end - start)));
      }
      const targetDay = 1 - progress * 0.9;
      dayRef.current += (targetDay - dayRef.current) * 0.02;
      const day = dayRef.current;

      // hero scroll -> camera pushes forward into the world (sense of velocity)
      const homeEl = document.getElementById("home") as HTMLElement | null;
      let forward = 0;
      if (homeEl) {
        const hr = homeEl.getBoundingClientRect();
        forward = Math.min(1, Math.max(0, 1 - hr.bottom / window.innerHeight));
      }

      // mouse parallax
      const targetX = pointer.x * 0.5;
      rigRef.current.x += (targetX - rigRef.current.x) * 0.03;
      const targetZ = 9 - forward * 3.4;
      const targetY = 2.6 - forward * 0.2;
      rigRef.current.z += (targetZ - rigRef.current.z) * 0.02;
      rigRef.current.y += (targetY - rigRef.current.y) * 0.02;

      camera.position.x = rigRef.current.x;
      camera.position.y = rigRef.current.y + pointer.y * 0.15;
      camera.position.z = rigRef.current.z;
      camera.lookAt(0, 1.3, -3);

      // lighting responds to day/night
      if (sunLight.current) sunLight.current.intensity = 0.4 + day * 0.75;
      if (ambient.current) ambient.current.intensity = 0.25 + day * 0.35;
      if (fogRef.current) {
        const t = day;
        const r = Math.round(10 * (1 - t) + 10 * t);
        const g = Math.round(13 * (1 - t) + 16 * t);
        const b = Math.round(18 * (1 - t) + 22 * t);
        fogRef.current.color.setRGB(r / 255, g / 255, b / 255);
      }
    }
  });

  const dustCount = quality === "full" ? 40 : 12;
  const fireflyCount = quality === "full" ? 28 : 10;
  const emberCount = quality === "full" ? 28 : 10;
  const starCount = quality === "full" ? 36 : 12;

  return (
    <group>
      <ambientLight ref={ambient} intensity={0.5} color="#a8c8e0" />
      <directionalLight ref={sunLight} position={[8, 12, 6]} intensity={1.05} color="#ffe9c4" castShadow />
      <fog ref={fogRef} attach="fog" args={["#0a0d12", 8, 34]} />

      <Terrain />

      <VoxelTree position={[-4, -0.4, -2]} />
      <VoxelTree position={[-6, -0.6, -4]} scale={1.2} />
      <VoxelTree position={[5, -0.5, -3]} />
      <VoxelTree position={[7, -0.7, -6]} scale={1.3} />
      <VoxelTree position={[-3, -0.3, 3]} scale={0.8} />
      <VoxelTree position={[9, -0.9, 2]} />

      <VoxelMountain position={[-11, -1, -10]} scale={1.4} color="#4a4a50" />
      <VoxelMountain position={[12, -1, -12]} scale={1.7} color="#565660" />

      <CaveEntrance position={[-7, -1.2, -6]} />
      <MysteriousEntity position={[-7, 0.1, -7.5]} visible={showEntity} />

      <Torch position={[-1.8, -0.9, 1.2]} />
      <Torch position={[1.8, -0.9, 1.2]} />

      <Portal position={[0, -0.9, -1]} scale={0.9} active />

      <Character position={[2.6, -0.85, 0.4]} />

      <FloatingBlock position={[4, 3.2, -4]} color="#a566d6" seed={1} />
      <FloatingBlock position={[-5, 4, -8]} color="#5fd6d6" seed={2} />
      <FloatingBlock position={[6, 2.4, -9]} color="#b3392f" seed={3} />

      {quality === "full" && (
        <>
          <Particles count={dustCount} kind="dust" area={18} centerY={1.5} />
          <Particles count={fireflyCount} kind="firefly" area={12} centerY={2} opacity={0.9} />
          <Particles count={emberCount} kind="ember" area={10} centerY={1.5} opacity={0.8} />
          <Particles count={starCount} kind="star" area={22} centerY={4} opacity={0.7} />
        </>
      )}

      <MovingCloud position={[-6, 5, -14]} scale={1} />
      <MovingCloud position={[7, 6, -16]} scale={0.8} />
      <MovingCloud position={[0, 5.5, -18]} scale={1.2} />
    </group>
  );
}
