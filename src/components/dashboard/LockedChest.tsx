/* eslint-disable react/set-state-in-effect */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LockedChest({ released }: { released: boolean }) {
  const [particles, setParticles] = useState<{ x: number; delay: number }[]>([]);
  const [wasReleased, setWasReleased] = useState(false);

  useEffect(() => {
    if (released && !wasReleased) {
      setWasReleased(true);
      setParticles(
        Array.from({ length: 16 }, (_, i) => ({
          x: (i % 4) * 24 - 36 + Math.random() * 12,
          delay: i * 0.04,
        }))
      );
    }
  }, [released, wasReleased]);

  return (
    <div className="relative flex flex-col items-center justify-center py-16 text-center overflow-visible">
      {/* redstone base beneath the chest */}
      <motion.div
        animate={{ opacity: released ? 1 : 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-3"
        style={{ background: "repeating-linear-gradient(90deg, var(--color-nether-glow) 0 2px, transparent 2px 12px)" }}
      />

      <motion.div
        animate={
          released
            ? { rotate: [0, -3, 3, -1, 0], scale: [1, 1.06, 1] }
            : { y: [0, -4, 0] }
        }
        transition={released ? { duration: 0.7 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* light beam when opened */}
        <AnimatePresence>
          {released && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 0.5, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-16 h-32 origin-bottom"
              style={{
                background: "linear-gradient(to top, var(--color-torch-glow), transparent)",
                clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* chest body */}
        <div className="relative" style={{ perspective: 600 }}>
          <motion.div className="relative w-28 h-18 flex items-end justify-center">
            {/* box */}
            <div className="w-28 h-16 bg-gradient-to-b from-[#7a4b26] to-[#5c3a21] border border-[var(--color-ink)] relative">
              {/* lid */}
              <motion.div
                initial={false}
                animate={released ? { rotateX: -125 } : { rotateX: 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.3, 0.64, 1] }}
                style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
                className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#8b5a32] to-[#6b4423] border-b-2 border-[var(--color-ink)]"
              >
                {/* lock on lid */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-4 bg-[var(--color-torch)] border border-[var(--color-ink)]" />
              </motion.div>
              {/* chest front */}
              <div className="absolute inset-x-0 bottom-0 h-2 bg-[var(--color-ink)]/40" />
            </div>
            {/* iron trim */}
            <div className="absolute inset-x-1 bottom-0 h-1 bg-[var(--color-stone-light)]/40" />
            {/* feet */}
            <div className="absolute -bottom-3 left-2 w-3 h-3 bg-[#3a2412]" />
            <div className="absolute -bottom-3 right-2 w-3 h-3 bg-[#3a2412]" />
          </motion.div>
        </div>

        {/* status ring */}
        {!released && (
          <motion.div
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute -inset-6 border-2 border-dashed border-[var(--color-torch-glow)]/40"
          />
        )}

        {/* unlock particles */}
        <AnimatePresence>
          {released &&
            particles.map((p, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, y: -20, x: p.x }}
                animate={{ opacity: 0, y: -90 - (i % 5) * 18, x: p.x + (i % 2 ? 14 : -14) }}
                transition={{ duration: 1, delay: p.delay, ease: "easeOut" }}
                className="absolute left-1/2 top-0 w-1.5 h-1.5"
                style={{ background: i % 3 === 0 ? "var(--color-end-glow)" : "var(--color-torch-glow)" }}
              />
            ))}
        </AnimatePresence>
      </motion.div>

      <h3 className="font-display text-sm md:text-base mt-8 text-[var(--color-parchment)]">
        {released ? "THE QUEST HAS BEGUN" : "PROBLEM STATEMENTS"}
      </h3>

      {!released ? (
        <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="mt-2 text-xs font-display text-[var(--color-torch)] tracking-wide">LOCKED</p>
          <p className="mt-4 text-sm text-[var(--color-stone-light)] max-w-sm">
            The challenges haven't been revealed yet.
          </p>
          <p className="mt-6 text-[10px] font-display text-[var(--color-stone-light)] tracking-widest">WAITING...</p>
        </motion.div>
      ) : (
        <motion.div key="open" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <p className="mt-3 text-sm text-[var(--color-stone-light)] max-w-sm">
            The chest is open — pick a challenge below and start building.
          </p>
        </motion.div>
      )}
    </div>
  );
}