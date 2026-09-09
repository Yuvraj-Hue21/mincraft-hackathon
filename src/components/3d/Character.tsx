import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";

export function Character({ position }: { position: [number, number, number] }) {
  const group = useRef<Group>(null);
  const head = useRef<Group>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);
  const legL = useRef<Group>(null);
  const legR = useRef<Group>(null);
  const { camera } = useThree();

  const waveTo = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const g = group.current;
    if (!g) return;
    g.position.y = position[1] + Math.sin(t * 1.6) * 0.04;

    const bodyTx = Math.sin(t * 1.6) * Math.sin(t * 1.6 > 0 ? 1 : 0.3);
    void bodyTx;

    if (head.current) {
      const dx = camera.position.x - position[0];
      const dz = camera.position.z - position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      const lookAngle = Math.atan2(dx, dz);
      const idle = Math.sin(t * 0.5) * 0.22;
      g.rotation.y = 0;

      let target = idle;
      let lookAtCam = 0;
      if (dist < 5) {
        const normalized = ((lookAngle - g.rotation.y + Math.PI) % (Math.PI * 2)) - Math.PI;
        lookAtCam = Math.max(-0.7, Math.min(0.7, normalized * 0.5));
      }
      waveTo.current += (lookAtCam - waveTo.current) * 0.03;
      target = idle + waveTo.current;
      head.current.rotation.y = target;
    }
    if (armL.current) armL.current.rotation.x = Math.sin(t * 1.6) * 0.15;
    if (armR.current) armR.current.rotation.x = -Math.sin(t * 1.6) * 0.15;
    if (legL.current) legL.current.rotation.x = Math.sin(t * 0.8) * 0.05;
    if (legR.current) legR.current.rotation.x = -Math.sin(t * 0.8) * 0.05;
  });

  return (
    <group ref={group} position={position}>
      <group ref={head} position={[0, 1.55, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#d9a066" flatShading />
        </mesh>
        <mesh position={[0, -0.02, 0.15]}>
          <boxGeometry args={[0.15, 0.1, 0.32]} />
          <meshStandardMaterial color="#3a2b1e" flatShading />
        </mesh>
      </group>
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[0.55, 0.7, 0.3]} />
        <meshStandardMaterial color="#3ea6d6" flatShading />
      </mesh>
      <group ref={armL} position={[-0.4, 1.15, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#d9a066" flatShading />
        </mesh>
      </group>
      <group ref={armR} position={[0.4, 1.15, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#3ea6d6" flatShading />
        </mesh>
      </group>
      <group ref={legL} position={[-0.14, 0.7, 0]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <boxGeometry args={[0.22, 0.7, 0.22]} />
          <meshStandardMaterial color="#2b3a55" flatShading />
        </mesh>
      </group>
      <group ref={legR} position={[0.14, 0.7, 0]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <boxGeometry args={[0.22, 0.7, 0.22]} />
          <meshStandardMaterial color="#2b3a55" flatShading />
        </mesh>
      </group>
    </group>
  );
}

export function MysteriousEntity({ position, visible }: { position: [number, number, number]; visible: boolean }) {
  const group = useRef<Group>(null);
  const eyeL = useRef<Group>(null);
  const eyeR = useRef<Group>(null);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    g.visible = visible;
    g.position.y = position[1] + Math.sin(t * 0.8) * 0.03;
    if (visible) {
      const glow = (Math.sin(t * 10) + 1) / 2;
      if (eyeL.current) (eyeL.current.children[0] as any).material.emissiveIntensity = 1.5 + glow * 2.5;
      if (eyeR.current) (eyeR.current.children[0] as any).material.emissiveIntensity = 1.5 + glow * 2.5;
    }
  });

  return (
    <group ref={group} position={position} visible={visible}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0e0e10" flatShading />
      </mesh>
      <group ref={eyeL} position={[-0.12, 0.02, 0.26]}>
        <mesh>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#f2f2f2" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
      </group>
      <group ref={eyeR} position={[0.12, 0.02, 0.26]}>
        <mesh>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#f2f2f2" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
      </group>
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[0.55, 0.7, 0.3]} />
        <meshStandardMaterial color="#0e0e10" flatShading />
      </mesh>
    </group>
  );
}
