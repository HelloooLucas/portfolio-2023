import { gsap } from "gsap";

import { ProjectName } from "../types";
import Observer from "../classes/observer";
import getProjectColor from "../utils/colors";

interface ImageProps {
  element: HTMLDivElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
}

export default class Image extends Observer {
  image: HTMLImageElement;
  projectName: ProjectName;
  timeline: ReturnType<typeof gsap.timeline>;
  manualTrigger: boolean;

  constructor({ element, timeline, manualTrigger }: ImageProps) {
    super({ element });

    this.manualTrigger = !!manualTrigger;

    this.projectName = window.location.pathname
      .replace("/", "")
      .replace(".html", "") as ProjectName;

    this.image = this.element.querySelector("img") as HTMLImageElement;
    this.timeline = timeline ?? gsap.timeline({ paused: true });

    this.setAnimations();
  }

  show() {
    return this.timeline.play();
  }

  hide() {
    return this.timeline.reverse();
  }

  animateIn() {
    if (this.manualTrigger) return;

    this.timeline.play();
  }

  setAnimations() {
    this.element.style.backgroundColor = getProjectColor(this.projectName);

    this.timeline.from([this.element, this.image], {
      clipPath: "inset(100% 0 0)",
      delay: this.manualTrigger ? 0 : 0.5,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
    });
  }

  resetAnimations() {
    this.timeline.progress(0).pause();
  }
}
