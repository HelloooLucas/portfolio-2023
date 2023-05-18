import { gsap } from "gsap";

import Animation from "../classes/animation";
import splitIntoLines from "../utils/text";

interface TitleProps {
  element: HTMLHeadingElement;
}

export default class Title extends Animation {
  titleLines!: HTMLSpanElement[];

  constructor({ element }: TitleProps) {
    super({ element });

    this.titleLines = splitIntoLines(this.element);
  }

  // TODO: animateIn seems to be fired way before page's show method is finished animating,
  // so we don't see the title animation
  // I need to find a way to trigger it only when the page showing is done
  // => Create shared constants to determine general delays and durations?
  animateIn() {
    gsap.fromTo(
      this.titleLines,
      {
        y: "100%",
      },
      {
        y: "0%",
        delay: 0.5,
        duration: 0.5,
        stagger: 0.2,
      }
    );
  }
  animateOut() {
    gsap.set(this.element, {
      // autoAlpha: 0,
    });
  }
}
