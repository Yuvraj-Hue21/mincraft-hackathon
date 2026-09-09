import { useEffect } from "react";
import { CustomCursor, CursorTrail } from "./Cursor";
import { ScrollProgress } from "./ScrollProgress";
import { ToastHost } from "./Toast";
import { JourneyIndicator } from "./JourneyIndicator";
import { SoundToggle } from "./SoundToggle";
import { attachSoundListeners } from "../../lib/sound";

export function GlobalEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const detach = attachSoundListeners();
    return () => detach();
  }, []);

  return (
    <>
      <CustomCursor />
      <CursorTrail />
      <ScrollProgress />
      <JourneyIndicator />
      <SoundToggle />
      <ToastHost />
    </>
  );
}