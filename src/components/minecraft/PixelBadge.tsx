export function PixelBadge({
  children,
  tone = "grass",
}: {
  children: string;
  tone?: "grass" | "torch" | "nether" | "end" | "stone";
}) {
  const tones: Record<string, string> = {
    grass: "bg-[var(--color-grass-dark)]/30 text-[var(--color-grass)] border-[var(--color-grass-dark)]",
    torch: "bg-[var(--color-torch)]/15 text-[var(--color-torch)] border-[var(--color-torch)]/50",
    nether: "bg-[var(--color-nether)]/15 text-[var(--color-nether-glow)] border-[var(--color-nether)]/50",
    end: "bg-[var(--color-end)]/15 text-[var(--color-end-glow)] border-[var(--color-end)]/50",
    stone: "bg-[var(--color-stone)]/30 text-[var(--color-stone-light)] border-[var(--color-stone)]",
  };
  return (
    <span className={`inline-flex items-center gap-2 text-[10px] font-display px-3 py-1.5 border ${tones[tone]}`}>
      {children}
    </span>
  );
}
