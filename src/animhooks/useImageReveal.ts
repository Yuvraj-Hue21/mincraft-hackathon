import { useEffect, useRef } from "react";
import { gsap } from "../lib/animations/gsap";
import { getAnimationContext } from "../lib/animations/config";

interface Options {
  direction?: "up" | "left" | "right" | "scale";
  duration?: number;
  start?: string;
  enabled?: boolean;
}

export function useImageReveal<T extends HTMLElement = HTMLImageElement>(options: Options = {}) {
  const ref = useRef<T>(null);
  const { direction = "up", duration = 1, start = "top 80%", enabled = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const { mode, reduced } = getAnimationContext();
    if (reduced || mode === "light") return;

    const clipFrom = () => {
      switch (direction) {
        case "up": return "inset(100% 0% 0% 0%)";
        case "left": return "inset(0% 100% 0% 0%)";
        case "right": return "inset(0% 0% 0% 100%)";
        default: return "inset(0% 0% 0% 0%)";
      }
    };

    gsap.set(el, { clipPath: clipFrom() });
    const tween = gsap.fromTo(
      el,
      { clipPath: clipFrom(), opacity: 0.3, scale: direction === "scale" ? 1.1 : 1 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        scale: 1,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once: true },
      }
    );
    const st = tween.scrollTrigger;
    return () => {
      st?.kill();
      tween.kill();
    };
  }, [direction, duration, start, enabled]);

  return ref;
}