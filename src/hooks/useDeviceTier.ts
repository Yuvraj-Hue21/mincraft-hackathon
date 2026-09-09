import { useState } from "react";

export type DeviceTier = "full" | "reduced" | "unsupported";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function detectTier(): DeviceTier {
  if (typeof window === "undefined") return "full";
  if (!detectWebGL()) return "unsupported";
  const isSmallScreen = window.innerWidth < 820;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  return isSmallScreen || isCoarsePointer || cores <= 4 ? "reduced" : "full";
}

export function useDeviceTier(): DeviceTier {
  const [tier] = useState<DeviceTier>(detectTier);
  return tier;
}