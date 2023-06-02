import { gsap } from "gsap";
import Page from "../classes/page";
import HomeProject from "../animations/home-project";
import splitIntoLines from "../utils/text";

/*
 * INFO
 * Each individual page implements methods specific to its needs such as animating different elements
 * It can do so thanks to what the Page has already queried
 */

export default class Home extends Page {
  topSectionPosition!: HTMLSpanElement[];
  topSectionPortfolio!: HTMLSpanElement[];
  projects!: HomeProject[];

  constructor() {
    super({
      selector: ".home",
      selectorChildren: {
        content: ".content",
        topSectionPosition: ".home__top-section__position",
        topSectionPortfolio: ".home__top-section__portfolio",
        preloadImages: "[data-src]",
        projects: ".home__project",
        footer: "footer",
      },
    });
  }

  show() {
    const tl = gsap.timeline();

    tl.to(this.topSectionPosition, {
      y: 0,
      duration: 0.4,
      stagger: 0.2,
    })
      .to(
        this.topSectionPortfolio,
        {
          y: 0,
          duration: 0.4,
          stagger: 0.2,
        },
        0
      )
      .eventCallback("onComplete", super.show.bind(this));
  }

  createAnimations() {
    this.topSectionPosition = splitIntoLines(this.elements.topSectionPosition);
    this.topSectionPortfolio = splitIntoLines(
      this.elements.topSectionPortfolio
    );
    gsap.set([this.topSectionPosition, this.topSectionPortfolio], {
      y: "100%",
    });

    this.projects = this.elements.projects.map(
      block => new HomeProject({ block })
    );
  }

  destroy() {
    super.destroy();

    this.projects.forEach(project => project.removeEventListeners());
  }
}
