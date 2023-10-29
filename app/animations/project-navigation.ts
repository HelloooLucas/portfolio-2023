import { gsap } from "gsap";

import Text from "./text";
import Observer from "../classes/observer";

type ProjectNavigationProps = {
  element: HTMLAnchorElement;
};

export default class ProjectNavigation extends Observer {
  timeline: gsap.core.Timeline;
  title!: Text;
  icon!: HTMLImageElement;
  handleMouseEnterBound: () => void;
  handleMouseLeaveBound: () => void;

  constructor({ element }: ProjectNavigationProps) {
    super({ element });

    this.timeline = gsap.timeline({ paused: true });
    this.icon = this.element.querySelector("img") as HTMLImageElement;

    this.handleMouseEnterBound = this.handleMouseEnter.bind(this);
    this.handleMouseLeaveBound = this.handleMouseLeave.bind(this);

    this.setAnimations();
  }

  async hide() {
    this.removeEventListeners();
    await this.timeline.reverse();
    this.timeline.pause();
  }

  animateIn() {
    this.timeline.play();
    this.setEventListeners();
  }

  resetAnimations() {
    this.timeline.progress(0).pause();
  }

  handleMouseEnter() {
    gsap.to(this.icon, {
      scale: 0.6,
      autoAlpha: 0,
      duration: 0.3,
    });
    this.title.show();
  }

  handleMouseLeave() {
    this.title.hide();
    gsap.to(this.icon, {
      scale: 1,
      autoAlpha: 1,
      delay: 0.5,
      duration: 0.3,
    });
  }

  setAnimations() {
    this.title = new Text({
      element: this.element.querySelector("p") as HTMLParagraphElement,
      manualTrigger: true,
    });

    this.timeline
      .fromTo(
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
      )
      .fromTo(
        this.icon,
        {
          scale: 0.6,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
        },
        0.6
      );
  }

  setEventListeners() {
    this.element.addEventListener("mouseenter", this.handleMouseEnterBound);
    this.element.addEventListener("mouseleave", this.handleMouseLeaveBound);
  }

  removeEventListeners() {
    this.element.removeEventListener("mouseenter", this.handleMouseEnterBound);
    this.element.removeEventListener("mouseleave", this.handleMouseLeaveBound);
  }
}
