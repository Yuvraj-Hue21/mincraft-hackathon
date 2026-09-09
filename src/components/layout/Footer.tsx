import { useParallax } from "../../animhooks/useParallax";
import { getAnimationContext } from "../../lib/animations/config";

export function Footer() {
  const sunRef = useParallax<HTMLDivElement>({ speed: 0.04 });
  const { mode } = getAnimationContext();
  const light = mode === "light";

  return (
    <footer className="relative border-t border-[var(--color-stone)] pt-20 pb-12 overflow-hidden bg-[var(--color-void)]">
      {/* sunset tint */}
      <div
        ref={sunRef}
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 130%, #3a1c0d 0%, transparent 60%)" }}
        aria-hidden
      />
      {/* stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {!light &&
          Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-parchment)]/40 animate-pulse"
              style={{
                left: `${(i * 47 + 8) % 100}%`,
                top: `${(i * 33 + 5) % 40}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
      </div>
      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {!light &&
          Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-torch-glow)]/40 animate-float-particle"
              style={{
                left: `${(i * 61 + 12) % 100}%`,
                bottom: `${(i * 23 + 8) % 30}%`,
                animationDelay: `${i * 0.55}s`,
                animationDuration: `${8 + (i % 3)}s`,
              }}
            />
          ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-sm md:text-lg text-[var(--color-parchment)] tracking-widest">
          THE WORLD IS YOURS TO BUILD.
        </h2>
        <div className="flex items-center gap-6 text-xs text-[var(--color-stone-light)]">
          <span className="font-display text-[10px]">HACK_WORLD © 2026</span>
          <span className="w-2 h-2 bg-[var(--color-grass)] animate-pulse" aria-hidden />
          <span>World online</span>
        </div>
        <p className="max-w-md text-[11px] text-[var(--color-stone-light)]/70 leading-relaxed">
          Built for a 48-hour hackathon. Not affiliated with Mojang or Microsoft.
        </p>
      </div>
    </footer>
  );
}