import { useTextReveal } from "./useTextReveal";

interface SplitProps {
  text: string;
  className?: string;
  once?: boolean;
  start?: string;
  stagger?: number;
  delay?: number;
  enabled?: boolean;
}

export function SplitTextBlock({ text, className = "", ...opts }: SplitProps) {
  const ref = useTextReveal<HTMLDivElement>(opts);
  const words = text.split(" ");
  return (
    <div ref={ref}>
      <h2 className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden className="flex flex-wrap gap-x-[0.25em]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <span data-line className="inline-block will-change-transform translate-y-[110%] opacity-0">
                {w}
              </span>
            </span>
          ))}
        </span>
      </h2>
    </div>
  );
}