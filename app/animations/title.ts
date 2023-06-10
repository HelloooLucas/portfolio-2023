import { gsap } from "gsap";

import Animation from "../classes/animation";
import splitIntoLines from "../utils/text";

interface TitleProps {
  element: HTMLElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
  onComplete?: () => void;
}

// TODO: is title redundant with Paragraph?
export default class Title extends Animation {
  delay: number;
  titleLines!: HTMLSpanElement[];
  timeline: ReturnType<typeof gsap.timeline>;

  constructor({ element, timeline, manualTrigger, onComplete }: TitleProps) {
    super({ element });

    this.titleLines = splitIntoLines(this.element);
    this.timeline =
      timeline ?? gsap.timeline({ paused: manualTrigger, onComplete });
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
    this.timeline.to(this.titleLines, {
      y: "0%",
      delay: this.delay,
      duration: 0.5,
      stagger: 0.2,
    });
  }

  animateOut() {
    this.setAnimations();
  }

  setAnimations() {
    gsap.set(this.titleLines, {
      y: "100%",
    });
  }
}
