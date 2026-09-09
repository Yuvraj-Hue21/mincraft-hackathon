import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { getAnimationContext } from "../lib/animations/config";
import { scrambleTo } from "../lib/animations/transitions";

export function useScramble<T extends HTMLElement = HTMLParagraphElement>(trigger = true) {
  const ref = useRef<T>(null);
  const inView = useInView(ref as any, { once: true, margin: "-60px" });
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !trigger) return;
    if (!inView || done.current) return;
    const { mode, reduced } = getAnimationContext();
    if (reduced || mode === "light") return;
    const text = el.textContent || "";
    done.current = true;
    let cancelled = false;
    scrambleTo(el, text).then(() => {
      if (!cancelled) el.textContent = text;
    });
    return () => {
      cancelled = true;
      if (el) el.textContent = text;
    };
  }, [inView, trigger]);

  return ref;
}

export { scrambleTo };
