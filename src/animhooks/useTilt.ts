import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getAnimationContext } from "../lib/animations/config";

interface Options {
  maxRotate?: number;
  enabled?: boolean;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const ref = useRef<T>(null);
  const { maxRotate = 4, enabled = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const { mode, reduced } = getAnimationContext();
    if (mode === "light" || reduced) return;

    el.style.transformStyle = "preserve-3d";

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * maxRotate;
      const ry = (px - 0.5) * maxRotate;
      gsap.to(el, {
        rotationX: rx,
        rotationY: ry,
        transformPerspective: 600,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [maxRotate, enabled]);

  return ref;
}
