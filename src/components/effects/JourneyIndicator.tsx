import { useEffect, useState } from "react";
import { getAnimationContext } from "../../lib/animations/config";

const zones = [
  { id: "home", label: "OVERWORLD" },
  { id: "about", label: "FOREST" },
  { id: "timeline", label: "CAVE" },
  { id: "rules", label: "REDSTONE" },
  { id: "prizes", label: "NETHER" },
  { id: "sponsors", label: "END" },
  { id: "faq", label: "CAVE" },
];

export function JourneyIndicator() {
  const [zone, setZone] = useState("OVERWORLD");
  const [enabled] = useState(() => {
    const { mode } = getAnimationContext();
    return mode !== "light";
  });

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      let current = "OVERWORLD";
      for (const z of zones) {
        const el = document.getElementById(z.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = z.label;
      }
      setZone((prev) => (prev === current ? prev : current));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[103] hidden md:flex flex-col items-center gap-3 select-none" aria-hidden>
      <span className="text-[9px] font-display tracking-widest text-[var(--color-stone-light)]" style={{ writingMode: "vertical-rl" }}>
        JOURNEY
      </span>
      <span
        key={zone}
        className="text-[10px] font-display tracking-widest text-[var(--color-torch)] px-2 py-1 border border-[var(--color-torch)]/30 bg-[var(--color-void)]/70 backdrop-blur-sm"
      >
        {zone}
      </span>
    </div>
  );
}