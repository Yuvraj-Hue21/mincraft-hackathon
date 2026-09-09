import { ScrollReveal } from "../animations/ScrollReveal";
import { SectionKicker, SplitHeadingNoMax } from "./SectionHeadings";
import { EndParticlesBg, ImageBackdrop } from "./sectionBg";
import { useTilt } from "../../animhooks/useTilt";
import { Marquee } from "../effects/Marquee";
import min6 from "../../assets/min6.jpg";

const sponsors = ["Aetherforge", "Quarrytech", "Lumen Labs", "Basalt Cloud", "Prism Systems", "Nova Robotics"];

function SponsorTile({ s, delay }: { s: string; delay: number }) {
  const ref = useTilt<HTMLDivElement>({ maxRotate: 3 });
  return (
    <ScrollReveal delay={delay}>
      <div
        ref={ref}
        className="flex items-center justify-center h-24 border border-[var(--color-stone)] bg-[var(--color-obsidian)]/60 backdrop-blur-sm text-[var(--color-stone-light)] font-medium hover:border-[var(--color-end)] hover:text-[var(--color-end-glow)] transition-colors"
      >
        {s}
      </div>
    </ScrollReveal>
  );
}

export function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #1c1230 0%, #0a0d0a 70%)" }}
    >
      <ImageBackdrop sources={[min6]} opacity={0.35} />
      <EndParticlesBg />
      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        <ScrollReveal>
          <SectionKicker tone="end">FLOATING ISLES</SectionKicker>
          <SplitHeadingNoMax text="Sponsors" />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
          {sponsors.map((s, i) => (
            <SponsorTile key={s} s={s} delay={i * 0.05} />
          ))}
        </div>

        <div className="mt-20 border-t border-[var(--color-end)]/20">
          <Marquee
            reverse
            items={sponsors.map((s) => (
              <>
                <span className="mx-6 font-display text-sm tracking-widest text-[var(--color-stone-light)]">{s}</span>
                <span className="inline-block w-2 h-2 rotate-45 bg-[var(--color-end)]/50" />
              </>
            ))}
          />
        </div>
      </div>
    </section>
  );
}