import { ScrollReveal } from "../animations/ScrollReveal";
import { MinecraftCard } from "../minecraft/MinecraftCard";
import { SectionKicker, SplitHeadingNoMax } from "./SectionHeadings";
import { useTilt } from "../../animhooks/useTilt";
import { RedstonePulseBg } from "./sectionBg";

const rules = [
  { n: "01", title: "Build original", body: "All code must be written during the event window." },
  { n: "02", title: "Respect the rules", body: "Follow the code of conduct at all times, on and off the mic." },
  { n: "03", title: "Teamwork", body: "Teams of 1 to 4. Everyone contributes, everyone is credited." },
  { n: "04", title: "Submit on time", body: "Late submissions are not scored — no exceptions." },
];

function RuleCard({ r, delay }: { r: (typeof rules)[number]; delay: number }) {
  const ref = useTilt<HTMLDivElement>({ maxRotate: 3 });
  return (
    <ScrollReveal delay={delay}>
      <div ref={ref} className="h-full">
        <MinecraftCard glow="nether" className="flex gap-5 items-start h-full">
          <span className="font-display text-2xl text-[var(--color-nether-glow)]">{r.n}</span>
          <div>
            <h3 className="font-semibold text-lg text-[var(--color-parchment)]">{r.title}</h3>
            <p className="mt-1 text-sm text-[var(--color-stone-light)]">{r.body}</p>
          </div>
        </MinecraftCard>
      </div>
    </ScrollReveal>
  );
}

export function Rules() {
  return (
    <section id="rules" className="relative py-28 md:py-36 bg-[var(--color-obsidian)] overflow-hidden">
      {<RedstonePulseBg />}
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
        <ScrollReveal>
          <SectionKicker tone="nether">THE CIRCUIT</SectionKicker>
          <SplitHeadingNoMax text="Rules" />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {rules.map((r, i) => (
            <RuleCard key={r.n} r={r} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
