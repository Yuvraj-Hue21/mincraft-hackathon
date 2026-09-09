import { useState } from "react";
import { sound } from "../../lib/sound";

export function SoundToggle() {
  const [muted, setMuted] = useState(sound.isMuted);

  return (
    <button
      onClick={() => setMuted(sound.toggle())}
      aria-label={muted ? "Enable sound effects" : "Mute sound effects"}
      aria-pressed={!muted}
      title={muted ? "Sound: off" : "Sound: on"}
      className="fixed bottom-4 right-4 z-[102] w-9 h-9 border border-[var(--color-stone)] bg-[var(--color-void)]/70 backdrop-blur-sm text-[var(--color-stone-light)] hover:text-[var(--color-torch)] hover:border-[var(--color-torch)]/60 transition-colors grid place-items-center"
    >
      <span className="font-display text-xs leading-none">{muted ? "🔇" : "🔊"}</span>
    </button>
  );
}