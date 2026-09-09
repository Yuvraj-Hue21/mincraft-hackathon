/* eslint-disable react/set-state-in-effect */
import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getAnimationContext } from "../../lib/animations/config";

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [animationKey, setAnimationKey] = useState(0);
  const { mode, reduced } = getAnimationContext();
  const light = mode === "light" || reduced;

  useEffect(() => {
    setAnimationKey((k) => k + 1);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial={light ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: light ? 0.15 : 0.35, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
