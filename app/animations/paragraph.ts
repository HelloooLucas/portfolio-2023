import { gsap } from "gsap";

import Animation from "../classes/animation";
import splitIntoLines from "../utils/text";

interface ParagraphProps {
  element: HTMLHeadingElement;
}

export default class Paragraph extends Animation {
  timeline: ReturnType<typeof gsap.timeline>;
  paragraphLines!: HTMLSpanElement[];

  constructor({ element }: ParagraphProps) {
    super({ element });

    this.timeline = gsap.timeline({ paused: true });

    this.paragraphLines = splitIntoLines(this.element);
    this.setAnimations();
  }

  async hide() {
    await this.timeline.reverse();
    this.timeline.pause();
  }

  animateIn() {
    this.timeline.play();
  }

  resetAnimations() {
    this.timeline.progress(0).pause();
  }

  setAnimations() {
    this.timeline.fromTo(
      this.paragraphLines,
      {
        y: "100%",
      },
      {
        y: "0%",
        delay: 0.5,
        duration: 0.5,
        stagger: 0.05,
      }
    );
  }
}
