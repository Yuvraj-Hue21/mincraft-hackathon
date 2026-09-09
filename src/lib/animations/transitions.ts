import gsap from "gsap";
import { animationConfig, getAnimationContext } from "./config";

export function fadeUp(el: Element | Element[], delay = 0, y = 24) {
  return gsap.fromTo(
    el,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: animationConfig.duration.base,
      delay,
      ease: animationConfig.easing.out,
      clearProps: "transform",
    }
  );
}

export function fadeIn(el: Element | Element[], delay = 0) {
  return gsap.fromTo(
    el,
    { opacity: 0 },
    { opacity: 1, duration: animationConfig.duration.base, delay, ease: animationConfig.easing.out }
  );
}

export function scaleIn(el: Element, delay = 0) {
  return gsap.fromTo(
    el,
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1, duration: animationConfig.duration.base, delay, ease: animationConfig.easing.out }
  );
}

export function clipReveal(el: Element, delay = 0, from = "inset(0% 0% 100% 0%)") {
  return gsap.fromTo(
    el,
    { clipPath: from, y: 24, opacity: 0.3 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      y: 0,
      opacity: 1,
      duration: animationConfig.duration.base,
      delay,
      ease: animationConfig.easing.out,
      clearProps: "clipPath",
    }
  );
}

export function textLineReveal(el: Element | Element[], delay = 0) {
  return gsap.fromTo(
    el,
    { yPercent: 110, opacity: 0, filter: "blur(4px)" },
    {
      yPercent: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      delay,
      ease: "power4.out",
      stagger: animationConfig.stagger.section,
    }
  );
}

export function scrambleTo(el: HTMLElement, text: string): Promise<void> {
  return new Promise((resolve) => {
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let frame = 0;
    const total = text.length;
    const tick = () => {
      const output: string[] = [];
      const resolvedCount = Math.floor(frame);
      for (let i = 0; i < total; i++) {
        output.push(i < resolvedCount ? text[i] : chars[Math.floor(Math.random() * chars.length)]);
      }
      el.textContent = output.join("");
      if (resolvedCount < total) {
        frame += 1 / 2.5;
        requestAnimationFrame(tick);
      } else {
        el.textContent = text;
        resolve();
      }
    };
    tick();
  });
}

export function shouldAnimateHere(): boolean {
  const { reduced, mode } = getAnimationContext();
  return !reduced && mode !== "light";
}
