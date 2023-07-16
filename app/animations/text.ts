import { gsap } from "gsap";

import Observer from "../classes/observer";
import splitIntoLines from "../utils/text";
import getProjectColor from "../utils/colors";

interface TitleProps {
  colored?: boolean;
  element: HTMLElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
}

export default class Text extends Observer {
  colored: boolean;
  titleLines!: HTMLSpanElement[];
  timeline: ReturnType<typeof gsap.timeline>;
  manualTrigger: boolean;

  constructor({ element, timeline, manualTrigger, colored }: TitleProps) {
    super({ element });

    this.manualTrigger = !!manualTrigger;
    this.colored = !!colored;

    this.titleLines = splitIntoLines(this.element);
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
    if (this.colored) {
      this.element.style.color = getProjectColor();
    }

    this.timeline.from(this.titleLines, {
      y: "100%",
      delay: this.manualTrigger ? 0 : 0.5,
      duration: 0.5,
      stagger: this.titleLines.length > 3 ? 0.05 : 0.2,
    });
  }

  resetAnimations() {
    if (this.manualTrigger) return;

    this.timeline.progress(0).pause();
  }
}
