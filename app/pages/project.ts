import { gsap } from "gsap";
import Page from "../classes/page";
import Image from "../animations/image";
import Title from "../animations/title";
import getProjectColor, { ProjectName } from "../utils/colors";

/*
 * INFO
 * Each individual page then implements methods specific to its needs such as animating different elements, depending on what's been queryed
 */

export default class Project extends Page {
  projectName!: ProjectName;
  coverImage!: Image;
  mainTitle!: Title;
  media!: Image[];

  constructor() {
    super({
      selector: ".project",
      selectorChildren: {
        content: ".content",
        coverImageWrapper: ".project__header__image-wrapper", // TODO: change the DOM + target the wrapper instead
        headerInfo: ".project__header__info",
        // title: ".project__title",
        mainTitle: ".project__title, .project__middle-title",
        // animationsTitles: ".project__title, .project__middle-title",
        // TODO: try using regex here instead of a list?
        // texts:
        //   ".project__text-1, .project__text-2, .project__text-3, .project__text-4",
        animationsTexts:
          ".project__text-1, .project__text-2, .project__text-3, .project__text-4",
        preloadImages: "[data-src]",
        media:
          ".project__media-1, .project__media-2, .project__media-3, .project__media-4, .project__media-5, .project__media-6",
        middleTitle: ".project__middle-title",
        footer: "footer",
      },
    });
  }

  show() {
    this.coverImage.show();
    gsap.to(this.elements.headerInfo, {
      autoAlpha: 1,
      duration: 0.4,
    });
    this.mainTitle.show();
  }

  createAnimations() {
    super.createAnimations();

    this.coverImage = new Image({
      element: this.elements.coverImageWrapper,
      manualTrigger: true,
      bgColor: getProjectColor(this.projectName),
    });

    this.mainTitle = new Title({
      element: this.elements.mainTitle,
      manualTrigger: true,
      onComplete: () => super.show(),
    });

    gsap.set(this.elements.headerInfo, {
      autoAlpha: 0,
    });

    this.media = this.elements.media.map(
      element =>
        new Image({ element, bgColor: getProjectColor(this.projectName) })
    );
  }

  setProjectName(projectName: ProjectName) {
    this.projectName = projectName;
  }
}
