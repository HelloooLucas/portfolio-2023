import { gsap } from "gsap";
import Observer from "../classes/observer";

type FooterProps = {
  element: HTMLElement;
};

export default class Footer extends Observer {
  timeline: ReturnType<typeof gsap.timeline>;

  constructor({ element }: FooterProps) {
    super({ element });

    this.timeline = gsap.timeline({ paused: true });

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
      this.element,
      {
        y: "20%",
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.5,
      }
    );
  }
}
