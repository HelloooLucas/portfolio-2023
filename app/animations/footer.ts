import { gsap } from "gsap";
import Animation, { AnimationProps } from "../classes/animation";

type FooterProps = AnimationProps;

export default class Footer extends Animation {
  element: HTMLElement;

  constructor({ element }: FooterProps) {
    super({ element });

    this.element = element;

    this.setAnimations();
  }

  animateIn() {
    gsap.to(this.element, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      delay: 0.5,
    });
  }

  animateOut() {
    gsap.set(this.element, {
      y: "20%",
      autoAlpha: 0,
    });
  }

  setAnimations() {
    this.animateOut();
  }
}
