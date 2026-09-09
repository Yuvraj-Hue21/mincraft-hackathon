export type AnimationMode = "full" | "medium" | "light";

let cachedMode: AnimationMode | null = null;
let cachedReduced = false;

export function detectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function detectAnimationMode(): AnimationMode {
  if (typeof window === "undefined") return "full";
  if (detectReducedMotion()) return "light";
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 820;
  const tablet = window.innerWidth >= 820 && window.innerWidth < 1200;
  if (small || isCoarse) return "light";
  if (tablet) return "medium";
  return "full";
}

export function getAnimationContext(): { mode: AnimationMode; reduced: boolean } {
  if (cachedMode === null || cachedReduced === null) {
    recomputeAnimationContext();
  }
  return { mode: cachedMode!, reduced: cachedReduced };
}

export function recomputeAnimationContext(): { mode: AnimationMode; reduced: boolean } {
  cachedReduced = detectReducedMotion();
  cachedMode = detectAnimationMode();
  return { mode: cachedMode, reduced: cachedReduced };
}

export interface AnimationConfig {
  duration: { fast: number; base: number; slow: number };
  easing: { out: string; inOut: string; soft: string };
  stagger: { micro: number; base: number; section: number };
  mobileEnabled: boolean;
  reducedMotion: boolean;
  mode: AnimationMode;
}

export const animationConfig: AnimationConfig = {
  duration: { fast: 0.4, base: 0.8, slow: 1.4 },
  easing: {
    out: "power3.out",
    inOut: "power2.inOut",
    soft: "sine.inOut",
  },
  stagger: { micro: 0.05, base: 0.08, section: 0.12 },
  mobileEnabled: false,
  reducedMotion: false,
  mode: "full",
};

export function isMobileEnabled(): boolean {
  return animationConfig.mobileEnabled && animationConfig.mode !== "light";
}

export function prefersReduced(): boolean {
  return animationConfig.reducedMotion;
}
