const STORE_KEY = "mcambient";

/**
 * Lightweight opt-in sound system.
 * - Web Audio only, starts on first user gesture (hover/click).
 * - Non-autoplaying: no sound until the user explicitly enables it.
 * - Generated/no-asset: synthesised ticks and clicks, no audio files needed.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted = true;

  constructor() {
    try {
      this.muted = localStorage.getItem(STORE_KEY) !== "on";
    } catch {
      this.muted = true;
    }
  }

  private ensure() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.24;
    this.master.connect(this.ctx.destination);
    return this.ctx;
  }

  private tone(freq: number, dur: number, type: OscillatorType, vol = 1, delay = 0) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  hover() {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx) return;
    this.tone(620, 0.05, "sine", 0.5);
  }

  click() {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx) return;
    this.tone(880, 0.05, "square", 0.4);
    this.tone(440, 0.08, "sine", 0.5, 0.02);
  }

  toggle(): boolean {
    this.ensure();
    this.muted = !this.muted;
    if (this.master) this.master.gain.value = this.muted ? 0 : 0.24;
    try {
      localStorage.setItem(STORE_KEY, this.muted ? "off" : "on");
    } catch {
      /* ignore */
    }
    return !this.muted;
  }

  get isMuted() {
    return this.muted;
  }
}

export const sound = new SoundEngine();

export function attachSoundListeners(root: HTMLElement | Document = document) {
  const onMouseOver = (e: Event) => {
    const target = (e.target as HTMLElement).closest?.("button, a, [data-sound]");
    if (target && !(e.target as HTMLElement).closest?.("[data-sound='off']")) sound.hover();
  };
  const onClick = (e: Event) => {
    const target = (e.target as HTMLElement).closest?.("button, a, [data-sound]");
    if (target && !(e.target as HTMLElement).closest?.("[data-sound='off']")) sound.click();
  };
  root.addEventListener("mouseover", onMouseOver, true);
  root.addEventListener("click", onClick, true);
  return () => {
    root.removeEventListener("mouseover", onMouseOver, true);
    root.removeEventListener("click", onClick, true);
  };
}