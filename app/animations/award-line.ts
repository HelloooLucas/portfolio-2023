import { gsap } from "gsap";

import Observer from "../classes/observer";
import splitIntoLines from "../utils/text";

interface AwardLineProps {
  element: HTMLDivElement;
  timeline: ReturnType<typeof gsap.timeline>;
}

export default class AwardLine extends Observer {
  lineTexts!: HTMLSpanElement[][];
  lineAfterClass!: string;
  timeline: ReturnType<typeof gsap.timeline>;

  constructor({ element, timeline }: AwardLineProps) {
    super({ element });

    this.timeline = timeline;
    this.detectDomNodes();
    this.setAnimations();
  }

  animateIn() {
    this.timeline
      .to(
        this.element,
        {
          "--lineAfterWidth": "100%",
          duration: 0.5,
          ease: "expo.out",
        },
        "-=0.1"
      )
      .to(
        this.lineTexts,
        {
          y: "0%",
          duration: 0.5,
        },
        "-=0.5"
      );
  }
  resetAnimations() {
    gsap.set(this.lineTexts, {
      y: "100%",
    });
    gsap.set(this.element, {
      "--lineAfterWidth": 0,
    });
  }

  detectDomNodes() {
    this.lineTexts = [...this.element.querySelectorAll("p")].map(paragraph =>
      splitIntoLines(paragraph)
    );
  }

  setAnimations() {
    this.resetAnimations();
  }
}
