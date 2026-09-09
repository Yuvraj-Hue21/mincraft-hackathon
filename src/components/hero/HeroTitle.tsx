import { useEffect, useRef } from "react";
import { gsap } from "../../lib/animations/gsap";
import { getAnimationContext } from "../../lib/animations/config";
import { useMagnetic } from "../../animhooks/useMagnetic";
import { useScrollToId } from "../effects/SmoothScroll";
import { Countdown } from "../dashboard/Countdown";

export function HeroTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    const el = ref.current;
    if (!el) return;
    const { mode, reduced } = getAnimationContext();
    if (reduced) {
      gsap.set(el.querySelectorAll(".h-reveal"), { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const lines = el.querySelectorAll(".h-reveal");
    gsap.set(el.querySelector(".h-kicker"), { opacity: 0, y: 12 });
    gsap.set(lines, { opacity: 0, y: 40, filter: "blur(6px)" });
    gsap.set(el.querySelector(".h-cta"), { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: mode === "light" ? 0.3 : 0.9 });
    tl.to(el.querySelector(".h-kicker"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(lines[0], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power4.out" }, "-=0.3")
      .to(lines[1], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power4.out" }, "-=0.65")
      .to(lines[2], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power4.out" }, "-=0.65")
      .to(el.querySelector(".h-sub"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .to(el.querySelector(".h-cta"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
    done.current = true;
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center gap-6">
      <div className="h-kicker flex items-center gap-2 text-xs font-display text-[var(--color-grass)] opacity-0">
        <span className="w-2 h-2 rounded-full bg-[var(--color-grass)] animate-pulse" />
        WORLD ONLINE
      </div>

      <div className="overflow-hidden">
        <p className="h-reveal font-display text-[10px] md:text-xs text-[var(--color-torch)] mb-4 tracking-widest">
          48-HOUR HACKATHON
        </p>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.5] md:leading-[1.45] max-w-4xl text-[var(--color-parchment)]">
        <span className="block overflow-hidden">
          <span className="h-reveal block will-change-transform">BUILD.</span>
        </span>
        <span className="block overflow-hidden">
          <span className="h-reveal block will-change-transform">CREATE.</span>
        </span>
        <span className="block overflow-hidden">
          <span className="h-reveal block will-change-transform">SURVIVE.</span>
        </span>
      </h1>

      <p className="h-sub mt-6 max-w-md text-sm sm:text-base md:text-lg text-[var(--color-stone-light)] opacity-0">
        A 48-hour journey where ideas become something real.
      </p>

      <div className="h-cta flex flex-col sm:flex-row sm:items-center gap-6 mt-2 opacity-0">
        <HeroCTA />
        <Countdown />
      </div>
    </div>
  );
}

function HeroCTA() {
  const ref = useMagnetic<HTMLButtonElement>({ strength: 0.35 });
  const scrollToId = useScrollToId();
  return (
    <button
      ref={ref}
      onClick={() => scrollToId("about")}
      className="group relative font-display text-[11px] md:text-xs uppercase px-8 py-5 bg-[var(--color-torch)] text-[var(--color-ink)] border-b-4 border-[#c47f22] transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0.5 active:border-b active:border-t-4 w-fit"
    >
      <span className="relative z-10">Enter the World</span>
      <span className="absolute inset-0 bg-gradient-to-t from-black/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
