import { gsap } from "gsap";

import { ProjectName } from "../types";
import Observer from "../classes/observer";
import splitIntoLines from "../utils/text";
import getProjectColor from "../utils/colors";

interface ComponentProps {
  project: HTMLElement;
}

// TODO: refactor this to use Text and Image classes
export default class HomeProject extends Observer {
  timeline: ReturnType<typeof gsap.timeline>;
  project!: ProjectName;
  projectIndex!: HTMLSpanElement[];
  projectBlock!: HTMLAnchorElement;
  projectImageWrapper!: HTMLDivElement;
  projectImage!: HTMLImageElement;
  projectName!: HTMLSpanElement[];

  constructor({ project }: ComponentProps) {
    super({ element: project });

    this.timeline = gsap.timeline();

    this.detectDomNodes();

    this.setAnimations();
  }

  hide() {
    return this.timeline.reverse();
  }

  animateIn() {
    this.timeline.play();
  }

  resetAnimations() {
    this.timeline.progress(0).pause();
  }

  detectDomNodes() {
    this.project = this.element.getAttribute("data-project") as ProjectName;

    this.projectIndex = splitIntoLines(
      this.element.querySelector(".home__project__index") as HTMLSpanElement
    );
    this.projectBlock = this.element.querySelector(
      ".home__project__block"
    ) as HTMLAnchorElement;
    this.projectImageWrapper = this.element.querySelector(
      ".home__project__block__image-wrapper"
    ) as HTMLDivElement;
    this.projectImage = this.element.querySelector(
      ".home__project__block__image"
    ) as HTMLImageElement;
    this.projectName = splitIntoLines(
      this.element.querySelector(
        ".home__project__block__name"
      ) as HTMLHeadingElement
    );

    this.projectImageWrapper.style.backgroundColor = getProjectColor(
      this.project
    );
  }

  setAnimations() {
    this.timeline
      .from(this.projectIndex, {
        y: "100%",
        duration: 0.4,
        delay: 0.5,
      })
      .from(
        [this.projectImageWrapper, this.projectImage],
        {
          clipPath: "inset(100% 0 0)",
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.1,
        },
        0.7
      );
  }
}
