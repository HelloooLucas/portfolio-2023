import { gsap } from "gsap";

import Animation from "../classes/animation";

interface ImageProps {
  element: HTMLDivElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
}

export default class Image extends Animation {
  image: HTMLImageElement;
  timeline: ReturnType<typeof gsap.timeline>;

  constructor({ element, timeline, manualTrigger }: ImageProps) {
    super({ element });

    this.image = this.element.querySelector("img") as HTMLImageElement;
    this.timeline = timeline ?? gsap.timeline({ paused: manualTrigger });

    this.setAnimations();
  }

  play() {
    this.timeline.play();
  }

  animateIn() {
    this.timeline.to([this.element, this.image], {
      clipPath: "inset(0% 0 0)",
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
    });
  }

  animateOut() {
    gsap.set([this.element, this.image], {
      clipPath: "inset(100% 0 0)",
    });
  }

  setAnimations() {
    this.animateOut();
  }
}
