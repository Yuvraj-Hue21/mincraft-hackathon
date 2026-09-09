import { ScrollReveal } from "../animations/ScrollReveal";
import { SectionKicker, SplitHeadingNoMax } from "./SectionHeadings";
import { EmberBg, ImageBackdrop } from "./sectionBg";
import { useTilt } from "../../animhooks/useTilt";
import min1 from "../../assets/min1.jpg";

const prizes = [
  { place: "1st Place", amount: "1,00,000", tone: "border-[var(--color-torch)] text-[var(--color-torch)]" },
  { place: "2nd Place", amount: "60,000", tone: "border-[var(--color-stone-light)] text-[var(--color-parchment)]" },
  { place: "3rd Place", amount: "30,000", tone: "border-[var(--color-dirt)] text-[var(--color-dirt)]" },
];

function PrizeCard({ p, delay }: { p: (typeof prizes)[number]; delay: number }) {
  const ref = useTilt<HTMLDivElement>({ maxRotate: 5 });
  return (
    <ScrollReveal delay={delay}>
      <div ref={ref} className={`border-2 p-8 text-center bg-[var(--color-obsidian)]/70 backdrop-blur-sm ${p.tone.split(" ")[0]} h-full`}>
        <div className="mx-auto w-12 h-12 border border-[var(--color-stone)] bg-[var(--color-void)]/60 mb-4 flex items-center justify-center">
          <div className="w-3 h-3 bg-[var(--color-torch)] animate-pulse" />
        </div>
        <p className="font-display text-[10px] text-[var(--color-stone-light)] mb-4">{p.place}</p>
        <p className={`font-display text-xl md:text-2xl ${p.tone.split(" ")[1]}`}>
          <span className="font-body text-[0.62em] align-middle mr-1">₹</span>
          {p.amount}
        </p>
      </div>
    </ScrollReveal>
  );
}

export function Prizes() {
  return (
    <section
      id="prizes"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 100%, #2a0d09 0%, #0a0d0a 65%)" }}
    >
      <ImageBackdrop sources={[min1]} opacity={0.4} />
      <EmberBg />
      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        <ScrollReveal>
          <SectionKicker tone="nether">THE LOOT</SectionKicker>
          <SplitHeadingNoMax text="Prizes" />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {prizes.map((p, i) => (
            <PrizeCard key={p.place} p={p} delay={i * 0.1} />
          ))}
        </div>
        <p className="text-xs text-[var(--color-stone-light)] mt-8 text-center">
          Placeholder prize values — final amounts confirmed closer to the event.
        </p>
      </div>
    </section>
  );
}