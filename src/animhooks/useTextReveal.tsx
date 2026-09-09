import { useEffect, useRef } from "react";
import { gsap } from "../lib/animations/gsap";
import { ScrollTrigger } from "../lib/animations/gsap";
import { animationConfig, getAnimationContext } from "../lib/animations/config";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  once?: boolean;
  start?: string;
  stagger?: number;
  delay?: number;
  enabled?: boolean;
}

export function useTextReveal<T extends HTMLElement = HTMLHeadingElement>(options: Options = {}) {
  const ref = useRef<T>(null);
  const { once = true, start = "top 86%", stagger = animationConfig.stagger.section, delay = 0, enabled = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const { mode, reduced } = getAnimationContext();
    if (reduced || mode === "light") {
      gsap.set(el.querySelectorAll("[data-line]"), { yPercent: 0, opacity: 1 });
      return;
    }

    const lines = el.querySelectorAll("[data-line]");
    if (lines.length === 0) return;

    gsap.set(lines, { yPercent: 110, opacity: 0, filter: "blur(4px)" });
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out", duration: 1 } });
    tl.to(
      Array.from(lines),
      {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger,
        delay,
      },
      0
    );

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [once, start, stagger, delay, enabled]);

  return ref;
}
