import { gsap } from "gsap";

import Animation from "../classes/animation";
import splitIntoLines from "../utils/text";

interface TitleProps {
  element: HTMLHeadingElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
  onComplete?: () => void;
}

// TODO: is title redundant with Paragraph?
export default class Title extends Animation {
  titleLines!: HTMLSpanElement[];
  timeline: ReturnType<typeof gsap.timeline>;

  constructor({ element, timeline, manualTrigger, onComplete }: TitleProps) {
    super({ element });

    this.titleLines = splitIntoLines(this.element);
    this.timeline =
      timeline ?? gsap.timeline({ paused: manualTrigger, onComplete });

    this.setAnimations();
  }

  show() {
    this.timeline.play();
  }

  animateIn() {
    this.timeline.to(this.titleLines, {
      y: "0%",
      delay: 0.5,
      duration: 0.5,
      stagger: 0.2,
    });
  }

  animateOut() {
    gsap.set(this.titleLines, {
      y: "100%",
    });
  }

  setAnimations() {
    this.animateOut();
  }
}
