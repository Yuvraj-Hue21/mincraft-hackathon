/* eslint-disable react/only-export-components */
import { useEffect, type ReactNode } from "react";
import { initLenis, destroyLenis, getLenis } from "../../lib/animations/scroll";
import { recomputeAnimationContext } from "../../lib/animations/config";
import { useLocation } from "react-router-dom";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    recomputeAnimationContext();
    initLenis();
    const lenis = getLenis();
    const handleUrlChange = () => {
      requestAnimationFrame(() => lenis?.scrollTo(0, { immediate: true }));
    };
    handleUrlChange();
    return () => destroyLenis();
  }, [location.pathname]);

  return <>{children}</>;
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function useScrollToId() {
  return (id: string) => {
    const lenis = getLenis();
    const el = document.getElementById(id);
    if (lenis) {
      lenis.scrollTo(el ?? `#${id}`, { offset: 0, duration: 1.2 });
    } else {
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };
}
