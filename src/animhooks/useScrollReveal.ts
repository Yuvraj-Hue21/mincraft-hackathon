import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animationConfig, prefersReduced } from "../lib/animations/config";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  start?: string;
  enabled?: boolean;
  stagger?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const ref = useRef<T>(null);
  const {
    y = 24,
    delay = 0,
    duration = animationConfig.duration.base,
    once = true,
    start = "top 88%",
    enabled = true,
    stagger = 0,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (prefersReduced()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger > 0 ? Array.from(el.children) : el;
    const tl = gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: animationConfig.easing.out,
        stagger,
        overwrite: true,
      }
    );
    tl.pause();

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
  }, [y, delay, duration, once, start, enabled, stagger]);

  return ref;
}
