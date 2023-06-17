import { gsap } from "gsap";

import Observer from "../classes/observer";
import splitIntoLines from "../utils/text";
import getImageBackgroundColor, { ProjectName } from "../utils/colors";

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
  // onMouseEnterBound: () => void;
  // onMouseLeaveBound: () => void;

  constructor({ project }: ComponentProps) {
    super({ element: project });

    this.timeline = gsap.timeline();

    // this.onMouseEnterBound = this.onMouseEnter.bind(this);
    // this.onMouseLeaveBound = this.onMouseLeave.bind(this);

    this.detectDomNodes();

    // this.addEventListeners();
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

    this.projectImageWrapper.style.backgroundColor = getImageBackgroundColor(
      this.project
    );
  }

  setAnimations() {
    // TODO: replace fromTo by from, like in about page?
    this.timeline
      .fromTo(
        this.projectIndex,
        {
          y: "100%",
        },
        {
          y: 0,
          duration: 0.4,
          delay: 0.5,
        }
      )
      .fromTo(
        [this.projectImageWrapper, this.projectImage],
        {
          clipPath: "inset(100% 0 0)",
        },
        {
          clipPath: "inset(0% 0 0)",
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.1,
        },
        0.7
      );
  }

  // For those two methods I could use arrow functions
  // Because 'this" is resolved lexically and remains a reference to the class, not to the event listener context
  // Arrow function methods are not ideal in classes instantiated numerous times, because then the methods are not part of the prototype, they become properties
  // And are thus created anew for each class instance, which is very unefficient in terms of memory
  // On the contrary, methods declared with traditional function syntax are made part of the prototype
  // And reused across all class instances, which is way more efficient
  // ===================
  // Also, the fact that I had to pass this.onMouseEnter.bind(this) to the add and remove event listeners
  // Actually caused that I was passing different instances of the function to the listeners
  // And since the functions passed to add and removeListeners were different, listeners were not correctly matched and not removed
  // This is why I created onMouseEnterBound and onMouseEnterLeave, so the callbacks passed to add and remove event listeners are pointing to the same function isntance
  // I chose not to use arrow functions for a matter of consistency in the code
  // onMouseEnter() {
  //   console.log("enter");
  // }

  // onMouseLeave() {
  //   console.log("leave");
  // }

  // addEventListeners() {
  //   this.projectBlock.addEventListener("mouseenter", this.onMouseEnterBound);
  //   this.projectBlock.addEventListener("mouseleave", this.onMouseLeaveBound);
  // }

  // removeEventListeners() {
  //   this.projectBlock.removeEventListener("mouseenter", this.onMouseEnterBound);
  //   this.projectBlock.removeEventListener("mouseleave", this.onMouseLeaveBound);
  // }
}
