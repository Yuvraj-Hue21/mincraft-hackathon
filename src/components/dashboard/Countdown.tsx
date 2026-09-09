import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function formatUnit(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block overflow-hidden w-[1em] text-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="inline-block will-change-transform"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({ value, accent }: { value: string; accent: boolean }) {
  return (
    <span className={`inline-flex items-center gap-0 transition-colors duration-200 ${accent ? "text-[var(--color-end-glow)]" : "text-[var(--color-torch)]"}`}>
      {value.split("").map((ch, i) => (
        <Digit key={`${ch}-${i}`} value={ch} />
      ))}
    </span>
  );
}

export function Countdown({ targetHours = 48 }: { targetHours?: number }) {
  const [remainingMs, setRemainingMs] = useState(targetHours * 60 * 60 * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(remainingMs / 3_600_000);
  const minutes = Math.floor((remainingMs % 3_600_000) / 60_000);
  const seconds = Math.floor((remainingMs % 60_000) / 1000);

  return (
    <div className="font-display text-lg md:text-2xl tracking-wider inline-flex items-center gap-[0.35em] text-[var(--color-torch)]">
      <Unit value={formatUnit(hours)} accent={false} />
      <span className="opacity-60">:</span>
      <Unit value={formatUnit(minutes)} accent={false} />
      <span className="opacity-60">:</span>
      <Unit value={formatUnit(seconds)} accent />
    </div>
  );
}