import { gsap } from "gsap";

import Animation from "../classes/animation";

interface ImageProps {
  element: HTMLDivElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
  bgColor?: string;
}

export default class Image extends Animation {
  image: HTMLImageElement;
  timeline: ReturnType<typeof gsap.timeline>;

  constructor({ element, timeline, manualTrigger, bgColor }: ImageProps) {
    super({ element });

    // TODO: right now the background color doesn't apply because images are not wrapped inside wrapper
    // So I should either wrap them in the DOM, or change Image so that it automatically wraps them
    console.log(bgColor);
    this.element.style.backgroundColor = bgColor ?? "#555555";

    this.image = this.element.querySelector("img") as HTMLImageElement;
    this.timeline = timeline ?? gsap.timeline({ paused: manualTrigger });

    this.setAnimations();
  }

  show() {
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
