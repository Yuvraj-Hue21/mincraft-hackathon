/* eslint-disable react/set-state-in-effect */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroArt from "../../assets/hero.png";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cachedBefore = sessionStorage.getItem("world-cached") === "true";
    if (cachedBefore) {
      setProgress(100);
      setReady(true);
      const t = setTimeout(onDone, 250);
      return () => clearTimeout(t);
    }
    let raf: number;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("world-cached", "true");
        setReady(true);
        setTimeout(onDone, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const blocks = 24;
  const filled = Math.round((progress / 100) * blocks);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="fixed inset-0 z-[100] bg-[var(--color-void)] flex flex-col items-center justify-center gap-7"
      >
        {/* pixel watermark */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -5, 0] }}
          transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
        >
          <img
            src={heroArt}
            alt=""
            className="w-16 h-16 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>

        <p className="font-display text-xs text-[var(--color-parchment)] tracking-[0.3em]">
          {ready ? "WORLD READY" : "LOADING WORLD..."}
        </p>

        <div className="flex gap-1" aria-hidden>
          {Array.from({ length: blocks }).map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 transition-colors duration-100"
              style={{ backgroundColor: i < filled ? "var(--color-torch)" : "var(--color-stone)" }}
            />
          ))}
        </div>

        <p className="font-display text-[9px] text-[var(--color-torch)] tracking-widest uppercase">{ready ? "WORLD ONLINE" : "SYSTEM ONLINE"}</p>
        <p className="font-display text-[9px] text-[var(--color-stone-light)] tracking-widest">{Math.round(progress)}%</p>
      </motion.div>
    </AnimatePresence>
  );
}