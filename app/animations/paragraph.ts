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
  }

  // TODO: animateIn seems to be fired way before page's show method is finished animating,
  // so we don't see the title animation
  // I need to find a way to trigger it only when the page showing is done
  // => Create shared constants to determine general delays and durations?
  animateIn() {
    gsap.fromTo(
      this.paragraphLines,
      {
        y: "100%",
      },
      {
        y: "0%",
        delay: 0.5,
        duration: 0.3,
        stagger: 0.04,
      }
    );
  }
  animateOut() {
    gsap.set(this.element, {
      // autoAlpha: 0,
    });
  }
}

// TODO: right now, elements already on the page when it loads don't animate in, fix it
