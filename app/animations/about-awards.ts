import { gsap } from "gsap";

import Text from "./text";
import AwardLine from "./award-line";
import Animation from "../classes/animation";

interface AboutAwardsProps {
  element: HTMLDivElement;
}

export default class AboutAwards extends Animation {
  timeline: ReturnType<typeof gsap.timeline>;
  awardsTitle!: Text;
  awardsLines!: AwardLine[];

  constructor({ element }: AboutAwardsProps) {
    super({ element });

    this.timeline = gsap.timeline({ paused: true });
    this.setAnimations();
  }

  hide() {
    return this.timeline.timeScale(2).reverse();
  }

  animateIn() {
    this.timeline.restart();
  }

  setAnimations() {
    this.awardsTitle = new Text({
      element: this.element.querySelector(
        ".about__awards__title"
      ) as HTMLHeadingElement,
      timeline: this.timeline,
    });

    this.awardsLines = (
      [
        ...this.element.querySelectorAll(".about__awards__line"),
      ] as HTMLDivElement[]
    ).map(element => new AwardLine({ element, timeline: this.timeline }));
  }
}
