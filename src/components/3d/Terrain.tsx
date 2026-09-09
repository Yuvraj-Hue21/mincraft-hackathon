import { useMemo } from "react";

// Deterministic pseudo-random so the terrain is stable across renders
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function Terrain() {
  const blocks = useMemo(() => {
    const out: { pos: [number, number, number]; color: string; scale: number }[] = [];
    const size = 14;
    let i = 0;
    for (let x = -size; x <= size; x++) {
      for (let z = -size; z <= size; z++) {
        const d = Math.sqrt(x * x + z * z);
        const heightNoise = rand(x * 3.1 + z * 7.7) * 0.6;
        const y = -1.4 - d * 0.02 + heightNoise;
        const isEdge = d > size - 3;
        const color = isEdge
          ? rand(i) > 0.5
            ? "#3d6b2b"
            : "#5a9c3f"
          : rand(i) > 0.15
          ? "#5a9c3f"
          : "#8b5a3c";
        out.push({ pos: [x, y, z], color, scale: 1 });
        i++;
      }
    }
    return out;
  }, []);

  return (
    <group>
      {blocks.map((b, idx) => (
        <mesh key={idx} position={b.pos} receiveShadow castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={b.color} roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  );
}
