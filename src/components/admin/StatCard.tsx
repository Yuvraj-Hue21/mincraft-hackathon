import { useCountUp } from "../../animhooks/useCountUp";

export function StatCard({ label, value }: { label: string; value: string | number }) {
  const ref = useCountUp<HTMLDivElement>(typeof value === "number" ? value : 0);
  return (
    <div className="border border-[#26272c] bg-[#15161a] p-6 transition-colors duration-300 hover:border-[#5b8def]/60 hover:bg-[#191a1f]">
      <p className="text-xs text-[#8f909a] uppercase tracking-wide">{label}</p>
      <p ref={ref} className="mt-2 text-3xl font-semibold text-white">
        {typeof value === "number" ? 0 : value}
      </p>
    </div>
  );
}