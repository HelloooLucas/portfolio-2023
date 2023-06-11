import { gsap } from "gsap";

import Animation from "../classes/animation";
import splitIntoLines from "../utils/text";

interface ParagraphProps {
  element: HTMLHeadingElement;
}

export default class Paragraph extends Animation {
  paragraphLines!: HTMLSpanElement[];

  constructor({ element }: ParagraphProps) {
    super({ element });

    this.paragraphLines = splitIntoLines(this.element);
    this.setAnimations();
  }

  animateIn() {
    gsap.to(this.paragraphLines, {
      y: "0%",
      delay: 0.5,
      duration: 0.5,
      stagger: 0.05,
    });
  }

  resetAnimations() {
    gsap.set(this.paragraphLines, {
      y: "100%",
    });
  }

  setAnimations() {
    this.resetAnimations();
  }
}
