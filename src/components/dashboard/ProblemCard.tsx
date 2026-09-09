import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Problem } from "../../data/problems";
import { MinecraftCard } from "../minecraft/MinecraftCard";
import { PixelBadge } from "../minecraft/PixelBadge";
import { useTilt } from "../../animhooks/useTilt";

export function ProblemCard({ problem, index = 0 }: { problem: Problem; index?: number }) {
  const [open, setOpen] = useState(false);
  const tiltRef = useTilt<HTMLDivElement>({ maxRotate: 3 });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: "easeOut" }}
      >
        <div ref={tiltRef}>
          <MinecraftCard glow="torch">
            <div className="flex items-start justify-between gap-4">
              <span className="font-display text-xs text-[var(--color-torch)]">PROBLEM #{problem.code}</span>
              <PixelBadge tone="stone">{problem.category}</PixelBadge>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[var(--color-parchment)]">{problem.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-stone-light)] leading-relaxed">{problem.summary}</p>
            <button
              onClick={() => setOpen(true)}
              className="mt-5 font-display text-[10px] uppercase text-[var(--color-torch)] hover:underline"
            >
              View Challenge →
            </button>
          </MinecraftCard>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-[var(--color-obsidian)] border border-[var(--color-stone)] p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-xs text-[var(--color-torch)]">PROBLEM #{problem.code}</span>
                <button onClick={() => setOpen(false)} aria-label="Close" className="text-[var(--color-stone-light)] hover:text-[var(--color-parchment)]">
                  ✕
                </button>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[var(--color-parchment)]">{problem.title}</h3>
              <PixelBadge tone="stone">{problem.category}</PixelBadge>
              <p className="mt-4 text-sm text-[var(--color-stone-light)] leading-relaxed">{problem.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}