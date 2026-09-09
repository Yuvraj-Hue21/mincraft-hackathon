import heroArt from "../../assets/hero.png";

export function HeroFallback() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(circle at 50% 20%, #2a3a2a 0%, #12160f 45%, #0a0d0a 100%)",
      }}
      aria-hidden
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-grass-dark)]/40 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div
          className="w-40 h-56 opacity-70"
          style={{
            background:
              "linear-gradient(180deg, var(--color-end-glow), var(--color-end))",
            clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)",
            filter: "blur(2px)",
          }}
        />
        <img
          src={heroArt}
          alt=""
          className="absolute w-36 h-40 object-contain brightness-110"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    </div>
  );
}