import { SplitTextBlock } from "../../animhooks/SplitTextBlock";
import { useScramble } from "../../animhooks/useScramble";
import { useParallax } from "../../animhooks/useParallax";

export function SectionKicker({ children, tone = "grass", className = "" }: { children: string; tone?: string; className?: string }) {
  const toneClasses: Record<string, string> = {
    grass: "text-[var(--color-grass)]",
    torch: "text-[var(--color-torch)]",
    nether: "text-[var(--color-nether-glow)]",
    end: "text-[var(--color-end-glow)]",
    diamond: "text-[var(--color-diamond)]",
  };
  const ref = useScramble<HTMLParagraphElement>();
  return (
    <p ref={ref} className={`font-display text-[9px] sm:text-[10px] mb-4 ${toneClasses[tone] ?? ""} ${className}`}>
      {children}
    </p>
  );
}

export function SplitHeading({ text, className = "", tone = "" }: { text: string; className?: string; tone?: string }) {
  return (
    <SplitTextBlock text={text} className={`font-display text-3xl sm:text-4xl md:text-5xl leading-[1.8] max-w-3xl ${tone} ${className}`} />
  );
}

export function SplitHeadingNoMax({ text, className = "", tone = "" }: { text: string; className?: string; tone?: string }) {
  return <SplitTextBlock text={text} className={`font-display text-2xl sm:text-3xl md:text-4xl leading-[1.8] ${tone} ${className}`} />;
}

export function ParallaxLayer({ children, speed = 0.15, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useParallax<HTMLDivElement>({ speed });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
