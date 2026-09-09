import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../animations/ScrollReveal";
import { SectionKicker, SplitHeadingNoMax } from "./SectionHeadings";
import { CaveFogBg, ImageBackdrop } from "./sectionBg";
import min3 from "../../assets/min3.jpg";

const faqs = [
  { q: "Who can participate?", a: "Any currently enrolled college student, individually or in a team of up to 4." },
  { q: "What should I bring?", a: "Your laptop, charger, ID, and anything that helps you sleep for a couple hours." },
  { q: "How are teams formed?", a: "Register with your own team, or join solo and we'll help you match with others." },
  { q: "When are problems released?", a: "Immediately after the opening ceremony — watch your dashboard." },
  { q: "How does submission work?", a: "Push your repo and a short demo video through the dashboard before the deadline." },
  { q: "What are the judging criteria?", a: "Technical execution, originality, real-world relevance, and presentation." },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-36 bg-[var(--color-obsidian)] overflow-hidden">
      <ImageBackdrop sources={[min3]} opacity={0.3} />
      <CaveFogBg />
      <div className="max-w-3xl mx-auto px-6 md:px-10 relative z-10">
        <ScrollReveal>
          <SectionKicker tone="diamond">THE CHAMBER</SectionKicker>
          <SplitHeadingNoMax text="Frequently asked questions" />
        </ScrollReveal>

        <div className="mt-16 divide-y divide-[var(--color-stone)] border-y border-[var(--color-stone)] bg-[var(--color-obsidian)]/60 backdrop-blur-sm">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left py-5 px-4 gap-4"
                >
                  <span className="font-medium text-[var(--color-parchment)]">{f.q}</span>
                  <span
                    className={`font-display text-[var(--color-torch)] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-5 text-sm text-[var(--color-stone-light)] leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}