import { gsap } from "gsap";

import splitIntoLines from "../utils/text";
import Animation from "../classes/animation";

interface TitleProps {
  element: HTMLElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
}

export default class Text extends Animation {
  delay: number;
  titleLines!: HTMLSpanElement[];
  timeline: ReturnType<typeof gsap.timeline>;
  manualTrigger: boolean;

  constructor({ element, timeline, manualTrigger }: TitleProps) {
    super({ element });

    this.manualTrigger = !!manualTrigger;

    this.titleLines = splitIntoLines(this.element);
    this.timeline = timeline ?? gsap.timeline({ paused: true });
    this.delay = manualTrigger ? 0 : 0.5;

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
      delay: this.delay,
      duration: 0.5,
      stagger: this.titleLines.length > 2 ? 0.05 : 0.2,
    });
  }
}
