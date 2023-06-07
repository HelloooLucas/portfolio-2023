import { gsap } from "gsap";

import Animation from "../classes/animation";
import getImageBackgroundColor, { ProjectName } from "../utils/colors";

interface ImageProps {
  element: HTMLDivElement;
  timeline?: ReturnType<typeof gsap.timeline>;
  manualTrigger?: boolean;
}

export default class Image extends Animation {
  image: HTMLImageElement;
  projectName: ProjectName;
  timeline: ReturnType<typeof gsap.timeline>;

  constructor({ element, timeline, manualTrigger }: ImageProps) {
    super({ element });

    this.projectName = window.location.pathname
      .replace("/", "")
      .replace(".html", "") as ProjectName;

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
    this.element.style.backgroundColor = getImageBackgroundColor(
      this.projectName
    );
    this.animateOut();
  }
}
