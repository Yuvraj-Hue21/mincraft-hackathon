import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getAnimationContext } from "../lib/animations/config";

interface Options {
  strength?: number;
  enabled?: boolean;
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(options: Options = {}) {
  const ref = useRef<T>(null);
  const { strength = 0.35, enabled = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const { mode, reduced } = getAnimationContext();
    if (mode === "light" || reduced) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, enabled]);

  return ref;
}
