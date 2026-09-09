import { useEffect, useRef, useState } from "react";
import { getAnimationContext } from "../../lib/animations/config";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  const [enabled] = useState(() => {
    const { mode } = getAnimationContext();
    return mode !== "light";
  });
  const ref = useRef<HTMLDivElement>(null);
  const blocks = 12;

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      setPct(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  if (!enabled) return null;

  const activeBlocks = Math.round(pct * blocks);

  return (
    <div ref={ref} className="pointer-events-none fixed right-4 bottom-4 z-[104] flex flex-col-reverse gap-1 opacity-70" aria-hidden>
      {Array.from({ length: blocks }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 transition-colors duration-300 ${i < activeBlocks ? "bg-[var(--color-torch)]" : "border border-[var(--color-stone)] bg-transparent"}`}
        />
      ))}
    </div>
  );
}
