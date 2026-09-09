import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { getAnimationContext } from "./config";

let lenis: Lenis | null = null;
let rafId: number | null = null;

function onRaf(time: number) {
  lenis?.raf(time * 1000);
}

export function initLenis(): Lenis | null {
  if (lenis) return lenis;
  const { mode, reduced } = getAnimationContext();
  if (mode === "light" || reduced) return null;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(onRaf);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function scrollToTarget(target: string | number | HTMLElement, opts?: { offset?: number; duration?: number }) {
  const y =
    typeof target === "number"
      ? target
      : typeof target === "string"
      ? (document.querySelector(target) as HTMLElement | null)?.getBoundingClientRect().top ?? 0
      : target.getBoundingClientRect().top;
  if (lenis) {
    lenis.scrollTo(target, {
      offset: opts?.offset ?? 0,
      duration: opts?.duration ?? 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    (el as HTMLElement | null)?.scrollIntoView({ behavior: "smooth" });
  }
  void y;
}

export function lenisScrollToId(id: string) {
  scrollToTarget(`#${id}`);
}

export function destroyLenis() {
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
  lenis?.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}
