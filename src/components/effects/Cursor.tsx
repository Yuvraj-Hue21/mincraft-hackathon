/* eslint-disable react/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { getAnimationContext } from "../../lib/animations/config";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const { mode, reduced } = getAnimationContext();
    if (mode === "light" || reduced) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    setEnabled(true);
    setHidden(false);
    document.body.classList.add("has-custom-cursor");
    return () => document.body.classList.remove("has-custom-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf: number;
    const cursorEl = cursorRef.current;
    const dotEl = dotRef.current;
    if (!cursorEl || !dotEl) return;

    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let x = tx;
    let y = ty;
    let scale = 1;

    const updateInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = !!target.closest("a,button,[data-cursor],input,textarea,select,.minecraft-magnetic");
      setActive(interactive);
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dotEl.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
      cursorEl.style.opacity = "1";
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      const targetScale = active ? 2.6 : 1;
      scale += (targetScale - scale) * 0.15;
      cursorEl.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", updateInteractive);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", updateInteractive);
      cancelAnimationFrame(raf);
    };
  }, [enabled, active]);

  if (!enabled || hidden) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[110] h-2 w-2 bg-[var(--color-torch)]"
        style={{ imageRendering: "pixelated" }}
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[109] opacity-0 transition-opacity"
      >
        <div
          className={`border border-[var(--color-parchment)]/60 transition-colors duration-200 ${
            active ? "border-[var(--color-torch)]" : ""
          }`}
          style={{ width: 26, height: 26, clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)", imageRendering: "pixelated" }}
        />
      </div>
    </>
  );
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled] = useState(() => {
    const { mode, reduced } = getAnimationContext();
    return !(mode === "light" || reduced);
  });

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "rgba(10,13,10,0.6)";

    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = [];
    const max = 18;
    let px = innerWidth / 2;
    let py = innerHeight / 2;

    const spawn = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (particles.length < max && Math.random() < 0.5) {
        particles.push({
          x: px + (Math.random() - 0.5) * 4,
          y: py + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.2,
          life: 1,
          size: 2 + Math.random() * 3,
        });
      }
    };
    const onResize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const loop = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01;
        p.life -= 0.02;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(242,161,60,${p.life * 0.5})`;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", spawn);
    window.addEventListener("resize", onResize);
    const raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", spawn);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[105]" aria-hidden />;
}
