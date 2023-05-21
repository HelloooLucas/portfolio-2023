import Page from "../../classes/page";
import HomeProjectBlock from "../../classes/home-project-block";

/*
 * INFO
 * Each individual page implements methods specific to its needs such as animating different elements
 * It can do so thanks to what the Page has already queried
 */

export default class Home extends Page {
  projects!: HomeProjectBlock[];

  constructor() {
    super({
      selector: ".home",
      selectorChildren: {
        // navigation: "nav",
        content: ".content",
        animationsTitles: "none",
        // topSectionTexts: ".home__top-section > p",
        animationsTexts: ".home__top-section > p",
        preloadImages: "[data-src]",
        projectBlocks: ".home__project__block",
        projectBlockImages: ".home__project__block__image",
        projectBlockNames: ".home__project__block__name",
        footer: "footer",
      },
    });
  }

  createAnimations() {
    super.createAnimations();

    this.projects = this.elements.projectBlocks.map(
      block => new HomeProjectBlock({ block })
    );
  }

  destroy() {
    super.destroy();

    this.projects.forEach(project => project.removeEventListeners());
  }
}
