import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/animations/gsap";
import { getAnimationContext } from "../lib/animations/config";

interface Options {
  speed?: number;
  axis?: "y" | "x" | "both";
  mouse?: boolean;
  mouseStrength?: number;
  enabled?: boolean;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const ref = useRef<T>(null);
  const { speed = 0.15, axis = "y", mouse = false, mouseStrength = 20, enabled = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const { mode, reduced } = getAnimationContext();
    if (reduced) return;
    const isMobile = mode === "light";
    const scrollAmount = isMobile ? Math.min(speed, 0.08) : speed;

    let xTo: null | ((v: number) => void) = null;
    let yTo: null | ((v: number) => void) = null;

    if (mouse && !isMobile) {
      xTo = gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" });
      yTo = gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" });
      const onMouse = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        xTo!(nx * mouseStrength);
        yTo!(ny * mouseStrength);
      };
      window.addEventListener("mousemove", onMouse);
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const dy = self.progress - 0.5;
          if (axis === "y" || axis === "both") {
            el.style.transform = `translateY(${dy * -2 * scrollAmount * 100}px)`;
          }
        },
      });
      return () => {
        window.removeEventListener("mousemove", onMouse);
        st.kill();
        gsap.killTweensOf(el);
      };
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const dx = self.progress - 0.5;
        let tx = 0;
        let ty = 0;
        if (axis === "x" || axis === "both") tx = dx * -2 * scrollAmount * 100;
        if (axis === "y" || axis === "both") ty = dx * -2 * scrollAmount * 100;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      },
    });

    return () => st.kill();
  }, [speed, axis, mouse, mouseStrength, enabled]);

  return ref;
}
