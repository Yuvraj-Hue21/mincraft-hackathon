import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "../../lib/animations/gsap";
import { World } from "../3d/World";
import { HeroFallback } from "./HeroFallback";
import { HeroTitle } from "./HeroTitle";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { getAnimationContext } from "../../lib/animations/config";

export function Hero() {
  const tier = useDeviceTier();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { mode, reduced } = getAnimationContext();
    if (reduced || mode === "light") return;
    const el = sectionRef.current;
    const text = textRef.current;
    if (!el || !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.to(text, { yPercent: -18, opacity: 0.3, ease: "none" }, 0);
    tl.to(el.querySelector(".h-hero-grad"), { opacity: 0.2, ease: "none" }, 0);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-void)]">
      {tier === "unsupported" ? (
        <HeroFallback />
      ) : (
        <Canvas
          shadows
          camera={{ position: [0, 2.6, 9], fov: 45 }}
          dpr={tier === "reduced" ? [1, 1.25] : [1, 2]}
          className="absolute inset-0"
        >
          <Suspense fallback={null}>
            <World quality={tier === "reduced" ? "reduced" : "full"} />
          </Suspense>
        </Canvas>
      )}

      <div className="h-hero-grad pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-transparent to-[var(--color-void)]/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--color-void)]/60 via-transparent to-transparent" />

      <div ref={textRef} className="relative z-10 h-full">
        <HeroTitle />
      </div>
    </section>
  );
}
