import type { ReactNode } from "react";
import { getAnimationContext } from "../../lib/animations/config";

export function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: ReactNode[];
  reverse?: boolean;
  className?: string;
}) {
  const { reduced } = getAnimationContext();
  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`} aria-hidden={!reduced}>
      <div className={`inline-flex will-change-transform ${reduced ? "" : reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="inline-flex items-center flex-shrink-0">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}