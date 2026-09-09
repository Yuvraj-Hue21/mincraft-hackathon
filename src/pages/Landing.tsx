import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/hero/Hero";
import { LoadingScreen } from "../components/hero/LoadingScreen";
import { Marquee } from "../components/effects/Marquee";
import { About } from "../components/sections/About";
import { Timeline } from "../components/sections/Timeline";
import { Rules } from "../components/sections/Rules";
import { Prizes } from "../components/sections/Prizes";
import { Sponsors } from "../components/sections/Sponsors";
import { FAQ } from "../components/sections/FAQ";
import { FinalCTA } from "../components/sections/FinalCTA";

const tickerItems = ["48 HOURS", "REAL PROBLEMS", "EXPERT JUDGES", "PUSH YOUR LIMITS", "BUILD THE WORLD"];

export default function Landing() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <div className="border-y border-[var(--color-grass)]/20 bg-[var(--color-obsidian)]/60">
          <Marquee
            items={tickerItems.map((t) => (
              <>
                <span className="mx-5 font-display text-xs md:text-sm tracking-[0.25em] text-[var(--color-parchment)]">{t}</span>
                <span className="inline-block w-2 h-2 rotate-45 bg-[var(--color-grass)]/60" />
              </>
            ))}
          />
        </div>
        <About />
        <Timeline />
        <Rules />
        <Prizes />
        <Sponsors />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
