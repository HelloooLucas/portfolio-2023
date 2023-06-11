import { gsap } from "gsap";
import Page from "../classes/page";
import Image from "../animations/image";
import Title from "../animations/title";

/*
 * INFO
 * Each individual page then implements methods specific to its needs such as animating different elements, depending on what's been queryed
 */

export default class Project extends Page {
  coverImage!: Image;
  title!: Title;
  media!: Image[];

  constructor() {
    super({
      selector: ".project",
      selectorChildren: {
        content: ".content",
        coverImageWrapper: ".project__header__image-wrapper",
        headerInfo: ".project__header__info",
        title: ".project__title, .project__middle-title",
        // TODO: try using regex here instead of a list?
        paragraphs: [
          ".project__text-1",
          ".project__text-2",
          ".project__text-3",
          ".project__text-4",
        ],
        preloadImages: ["[data-src]"],
        media: [".project__image__wrapper"],
        middleTitle: ".project__middle-title",
        footer: "footer",
      },
    });
  }

  async show() {
    await Promise.all([
      this.coverImage.show(),
      gsap.to(this.elements.headerInfo, {
        autoAlpha: 1,
        duration: 0.4,
      }),
      this.title.show(),
    ]);

    super.show();
  }

  createAnimations() {
    super.createAnimations();

    this.coverImage = new Image({
      element: this.elements.coverImageWrapper,
      manualTrigger: true,
    });

    this.title = new Title({
      element: this.elements.title,
      manualTrigger: true,
    });

    gsap.set(this.elements.headerInfo, {
      autoAlpha: 0,
    });

    this.media = this.elements.media.map(element => new Image({ element }));
  }
}
