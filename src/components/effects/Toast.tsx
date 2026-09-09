import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onToast, type ToastItem } from "./toastEvents";

export function ToastHost() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const dismiss = (id: number) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  const dismissRef = useRef(dismiss);
  dismissRef.current = dismiss;

  useEffect(() => {
    return onToast((t) => {
      const id = t.id ?? Math.round(Math.random() * 1e9) + 1;
      setToasts((prev) => [...prev, { ...t, id }]);
      timers.current[id] = setTimeout(() => dismissRef.current(id), 3200);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tone =
    toasts.length > 0
      ? {
          success: "border-[var(--color-grass)] text-[var(--color-grass)]",
          info: "border-[var(--color-torch)] text-[var(--color-torch)]",
          error: "border-[var(--color-nether)] text-[var(--color-nether-glow)]",
        }[toasts[0].type ?? "info"]
      : "";

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[120] flex flex-col items-center gap-3 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={() => dismiss(t.id)}
            className="flex items-center gap-3 bg-[var(--color-obsidian)]/95 backdrop-blur border px-5 py-3 text-sm shadow-lg cursor-pointer"
          >
            <span className="text-base leading-none">{t.icon ?? "✓"}</span>
            <span className="text-[var(--color-parchment)]">{t.message}</span>
            <span className={`w-1.5 h-1.5 self-start border ${tone}`} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}