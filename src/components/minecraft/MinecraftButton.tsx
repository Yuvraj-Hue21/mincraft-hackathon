import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useMagnetic } from "../../animhooks/useMagnetic";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger";
}

const variants = {
  primary: "bg-[var(--color-torch)] text-[var(--color-ink)] border-[#c47f22]",
  ghost: "bg-transparent text-[var(--color-parchment)] border-[var(--color-stone-light)]",
  danger: "bg-[var(--color-nether)] text-white border-[#7a251e]",
};

export function MinecraftButton({ children, variant = "primary", className = "", ...props }: Props) {
  const ref = useMagnetic<HTMLButtonElement>({ strength: 0.25 });
  return (
    <button
      ref={ref}
      {...props}
      className={`
        relative font-display text-[10px] md:text-xs tracking-wide uppercase
        px-6 py-4 border-b-4 border-t border-l border-r
        transition-all duration-150 ease-out
        hover:-translate-y-0.5 hover:brightness-110
        active:translate-y-0.5 active:border-b active:border-t-4
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-diamond)]
        disabled:opacity-40 disabled:pointer-events-none
        select-none
        ${variants[variant]} ${className}
      `}
      style={{ imageRendering: "pixelated" }}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: "linear-gradient(to top, rgba(255,255,255,0.12), transparent)" }}
      />
    </button>
  );
}