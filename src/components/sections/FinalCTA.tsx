import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ScrollReveal } from "../animations/ScrollReveal";
import { MinecraftButton } from "../minecraft/MinecraftButton";
import { useScramble } from "../../animhooks/useScramble";

export function FinalCTA() {
  const navigate = useNavigate();
  const scrambleRef = useScramble<HTMLHeadingElement>();
  const portalRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative py-32 md:py-44 flex items-center justify-center text-center overflow-hidden"
      style={{ background: "radial-gradient(circle at 50% 60%, #2a1240 0%, #0a0d0a 70%)" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-[var(--color-end-glow)]/60 animate-float-particle"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 31 + 20) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${7 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div ref={portalRef} className="absolute left-1/2 top-1/2 w-[46vw] max-w-[560px] aspect-square -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-25" aria-hidden>
        <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: "radial-gradient(circle, var(--color-end) 0%, transparent 65%)" }} />
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-[var(--color-end-glow)]/60 animate-[spin_14s_linear_infinite]" />
        <div className="absolute inset-10 rounded-full border border-[var(--color-end-glow)]/40 animate-[spin_24s_linear_infinite_reverse]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-10 origin-top animate-portal-beam" style={{ background: "linear-gradient(to bottom, transparent, var(--color-end-glow)/50, transparent)" }} />
      </div>

      <ScrollReveal className="relative px-6">
        <h2 ref={scrambleRef} className="font-display text-2xl md:text-4xl leading-relaxed">
          YOUR ADVENTURE
          <br />
          STARTS HERE.
        </h2>
        <p className="mt-6 text-[var(--color-stone-light)]">Ready to enter?</p>
        <div className="mt-10">
          <MinecraftButton onClick={() => navigate("/login")}>Login to Hackathon</MinecraftButton>
        </div>
      </ScrollReveal>
    </section>
  );
}