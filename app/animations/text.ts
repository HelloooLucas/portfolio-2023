import { gsap } from "gsap";

import Observer from "../classes/observer";
import splitIntoLines from "../utils/text";

interface TitleProps {
  element: HTMLElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
}

export default class Text extends Observer {
  titleLines!: HTMLSpanElement[];
  timeline: ReturnType<typeof gsap.timeline>;
  manualTrigger: boolean;

  constructor({ element, timeline, manualTrigger }: TitleProps) {
    super({ element });

    this.manualTrigger = !!manualTrigger;

    this.titleLines = splitIntoLines(this.element);
    this.timeline = timeline ?? gsap.timeline({ paused: true });

    this.setAnimations();
  }

  show() {
    return this.timeline.play();
  }

  hide() {
    return this.timeline.reverse();
  }

  animateIn() {
    if (this.manualTrigger) return;

    this.timeline.play();
  }

  setAnimations() {
    this.timeline.from(this.titleLines, {
      y: "100%",
      delay: this.manualTrigger ? 0 : 0.5,
      duration: 0.5,
      stagger: this.titleLines.length > 3 ? 0.05 : 0.2,
    });
  }

  resetAnimations() {
    this.timeline.progress(0).pause();
  }
}
