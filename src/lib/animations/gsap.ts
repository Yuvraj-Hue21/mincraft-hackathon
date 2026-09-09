import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function killGSAP() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  gsap.killTweensOf("*");
}
