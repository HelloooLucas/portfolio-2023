import { gsap } from "gsap";

import Observer from "../classes/observer";
import getProjectColor from "../utils/colors";

interface ImageProps {
  element: HTMLDivElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
}

export default class Image extends Observer {
  image: HTMLImageElement;
  timeline: ReturnType<typeof gsap.timeline>;
  manualTrigger: boolean;

  constructor({ element, timeline, manualTrigger }: ImageProps) {
    super({ element });

    this.manualTrigger = !!manualTrigger;

    this.image = this.element.querySelector("img") as HTMLImageElement;
    this.timeline = timeline ?? gsap.timeline({ paused: true });

    this.setAnimations();
  }

  show() {
    return this.timeline.play();
  }

  hide() {
    this.unobserve();
    return this.timeline.reverse();
  }

  animateIn() {
    if (this.manualTrigger) return;

    this.timeline.play();
  }

  setAnimations() {
    this.element.style.backgroundColor = getProjectColor();

    this.timeline.from([this.element, this.image], {
      clipPath: "inset(100% 0 0)",
      delay: this.manualTrigger ? 0 : 0.5,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
    });
  }

  resetAnimations() {
    this.timeline.progress(0).pause();
  }
}
