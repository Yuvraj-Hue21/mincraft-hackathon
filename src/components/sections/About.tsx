import { ScrollReveal } from "../animations/ScrollReveal";
import { MinecraftCard } from "../minecraft/MinecraftCard";
import { SectionKicker, SplitHeading } from "./SectionHeadings";
import { ImageBackdrop } from "./sectionBg";
import { useTilt } from "../../animhooks/useTilt";
import minImg from "../../assets/min.jpg";
import min2 from "../../assets/min2.jpg";
import min4 from "../../assets/min4.jpg";

const items = [
  { icon: "⛏", title: "Build something meaningful", body: "Ship a working prototype, not just a pitch deck." },
  { icon: "🧭", title: "Solve real problems", body: "Every track is grounded in a real-world constraint." },
  { icon: "⚔", title: "Compete with the best", body: "Teams from across the region, judged by industry mentors." },
];

function AboutCard({ item, delay }: { item: (typeof items)[number]; delay: number }) {
  const ref = useTilt<HTMLDivElement>({ maxRotate: 4 });
  return (
    <ScrollReveal delay={delay}>
      <div ref={ref} className="h-full">
        <MinecraftCard glow="grass" className="h-full">
          <span className="text-2xl inline-block">{item.icon}</span>
          <h3 className="mt-4 font-semibold text-lg text-[var(--color-parchment)]">{item.title}</h3>
          <p className="mt-2 text-sm text-[var(--color-stone-light)] leading-relaxed">{item.body}</p>
        </MinecraftCard>
      </div>
    </ScrollReveal>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-[var(--color-obsidian)] overflow-hidden">
      <ImageBackdrop sources={[minImg, min2, min4]} opacity={0.35} />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        <ScrollReveal>
          <SectionKicker tone="grass">THE QUEST</SectionKicker>
          <SplitHeading text="48 hours. One challenge. Unlimited possibilities." />
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          {items.map((item, i) => (
            <AboutCard key={item.title} item={item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}