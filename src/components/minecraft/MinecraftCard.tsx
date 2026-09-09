import type { ReactNode } from "react";

export function MinecraftCard({
  children,
  className = "",
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: "torch" | "nether" | "end" | "grass" | "none";
}) {
  const glowMap: Record<string, string> = {
    torch: "hover:shadow-[0_12px_36px_-8px_var(--color-torch-glow)]",
    nether: "hover:shadow-[0_12px_36px_-8px_var(--color-nether-glow)]",
    end: "hover:shadow-[0_12px_36px_-8px_var(--color-end-glow)]",
    grass: "hover:shadow-[0_12px_36px_-8px_var(--color-grass)]",
    none: "",
  };
  return (
    <div
      className={`
        relative
        bg-[var(--color-obsidian)]/80 backdrop-blur-sm
        border border-[var(--color-stone)]
        p-6
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:border-[var(--color-stone-light)] hover:bg-[var(--color-obsidian)]
        ${glowMap[glow ?? "none"]}
        ${className}
      `}
    >
      {/* block-depth edge */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-black/40 transition-colors duration-300 group-hover:bg-black/20" aria-hidden />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/5" aria-hidden />
      <div className="relative">{children}</div>
    </div>
  );
}