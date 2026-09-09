import { useEffect, useRef } from "react";
import { mockTimeline } from "../../data/timeline";
import { ScrollReveal } from "../animations/ScrollReveal";
import { SectionKicker, SplitHeadingNoMax } from "./SectionHeadings";
import { useParallax } from "../../animhooks/useParallax";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { gsap } from "../../lib/animations/gsap";
import { getAnimationContext } from "../../lib/animations/config";

function TimelineItem({ step, index }: { step: (typeof mockTimeline)[number]; index: number }) {
  return (
    <div className="relative pl-10 min-w-[260px] sm:min-w-[300px]">
      <span
        className="absolute left-0 top-1 w-5 h-5 bg-[var(--color-torch)] border-2 border-[var(--color-void)]"
        style={{ boxShadow: "0 0 12px -2px var(--color-torch-glow)" }}
      />
      <p className="font-display text-[10px] text-[var(--color-torch)] mb-1">{step.time}</p>
      <h3 className="text-lg font-semibold text-[var(--color-parchment)]">{step.label}</h3>
      <p className="text-sm text-[var(--color-stone-light)] mt-1 max-w-[260px]">{step.description}</p>
      <span className="font-display text-[10px] text-[var(--color-stone-light)] mt-3 inline-block">
        NO. {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function Timeline() {
  const tier = useDeviceTier();
  const isMobile = tier === "reduced";
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dustRef = useParallax<HTMLDivElement>({ speed: 0.05 });

  useEffect(() => {
    const { reduced } = getAnimationContext();
    if (isMobile || reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth + 100);
      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getScroll() * 1.5,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="timeline" className="relative py-28 md:py-0 md:min-h-screen flex items-center bg-[var(--color-void)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1c1f16 0%, transparent 60%)" }}
        aria-hidden
      />
      <div ref={dustRef} className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute top-1/3 left-0 w-20 h-20 bg-[var(--color-stone)]/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative w-full">
        <ScrollReveal>
          <SectionKicker tone="torch">THE PATH THROUGH THE MINE</SectionKicker>
          <SplitHeadingNoMax text="Timeline" />
        </ScrollReveal>

        {!isMobile ? (
          <>
            <div className="relative mt-16 border-t-2 border-[var(--color-stone)] hidden md:block overflow-hidden">
              <div ref={trackRef} className="flex gap-10 will-change-transform pb-8 w-max">
                {mockTimeline.map((step, i) => (
                  <TimelineItem key={step.id} step={step} index={i} />
                ))}
              </div>
            </div>
            <p className="text-[10px] font-display text-[var(--color-stone-light)] mt-2 tracking-widest hidden md:block">
              KEEP SCROLLING TO MINE
            </p>
            <div className="relative mt-10 border-t-2 border-[var(--color-stone)] md:hidden overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]">
              <div className="flex gap-10 w-max">
                {mockTimeline.map((step, i) => (
                  <TimelineItem key={step.id} step={step} index={i} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="relative pl-8 pt-16 border-l-2 border-[var(--color-stone)]">
            {mockTimeline.map((step, i) => (
              <ScrollReveal key={step.id} delay={i * 0.05} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[42px] top-1 w-5 h-5 bg-[var(--color-torch)] border-2 border-[var(--color-void)]" />
                <p className="font-display text-[10px] text-[var(--color-torch)] mb-1">{step.time}</p>
                <h3 className="text-lg font-semibold text-[var(--color-parchment)]">{step.label}</h3>
                <p className="text-sm text-[var(--color-stone-light)] mt-1">{step.description}</p>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}