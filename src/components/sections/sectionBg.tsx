import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { getAnimationContext } from "../../lib/animations/config";

export type { ReactNode };

/** Redstone pulse background — a dim, animated red glow. */
export function RedstonePulseBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 opacity-[0.06] mix-blend-screen" style={{ background: "repeating-linear-gradient(90deg, var(--color-nether-glow) 0 2px, transparent 2px 48px)" }} />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[80%] h-64 rounded-full blur-3xl bg-[var(--color-nether)]/15 animate-pulse" />
    </div>
  );
}

/** Ember background for Prizes. */
export function EmberBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full blur-3xl bg-[var(--color-nether)]/20 animate-pulse" />
      <div className="absolute top-20 right-16 w-32 h-32 rounded-full blur-3xl bg-[var(--color-nether-glow)]/10 animate-pulse [animation-delay:0.6s]" />
    </div>
  );
}

/** Floating particle background for Sponsors (End). */
export function EndParticlesBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-1.5 h-1.5 bg-[var(--color-end-glow)]/50 animate-float-particle"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 29 + 10) % 100}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${6 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Cave fog background for FAQ. */
export function CaveFogBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 50% 50%, var(--color-stone) 0%, transparent 60%)" }} />
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[var(--color-stone)]/20 to-transparent animate-fog-drift" />
    </div>
  );
}

export function ImageBackdrop({
  sources,
  opacity = 0.42,
  interval = 8000,
  scrim = true,
}: {
  sources: string[];
  opacity?: number;
  interval?: number;
  scrim?: boolean;
}) {
  const { reduced } = getAnimationContext();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced || sources.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % sources.length), interval);
    return () => clearInterval(t);
  }, [reduced, sources.length, interval]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sources.map((src, i) => {
        const active = i === idx;
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[2200ms] ease-in-out ${
              active ? (reduced ? "opacity-100" : i % 2 ? "animate-ken-burns-reverse" : "animate-ken-burns") : "opacity-0"
            }`}
            style={{ opacity: active ? opacity : 0 }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.85) brightness(0.8)" }}
            />
          </div>
        );
      })}
      {scrim && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void)]/70 via-[var(--color-void)]/30 to-[var(--color-void)]/85" />
          <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 180px 40px var(--color-void)" }} />
        </>
      )}
    </div>
  );
}
