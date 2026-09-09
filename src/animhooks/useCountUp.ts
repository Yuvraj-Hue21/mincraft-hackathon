import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAnimationContext } from "../lib/animations/config";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  duration?: number;
  delay?: number;
  start?: string;
  enabled?: boolean;
  format?: (n: number) => string;
}

export function useCountUp<T extends HTMLElement = HTMLSpanElement>(end: number, options: Options = {}) {
  const ref = useRef<T>(null);
  const { duration = 1.6, delay = 0, start = "top 88%", enabled = true, format } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const { reduced } = getAnimationContext();
    if (reduced) {
      el.textContent = format ? format(end) : String(end);
      return;
    }

    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: end,
          duration,
          delay,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format ? format(obj.v) : String(Math.round(obj.v));
          },
        });
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(obj);
    };
  }, [end, duration, delay, start, enabled, format]);

  return ref;
}
