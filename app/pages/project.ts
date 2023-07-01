import { gsap } from "gsap";

import Page from "../classes/page";
import Text from "../animations/text";
import Image from "../animations/image";
import Footer from "../animations/footer";

/*
 * INFO
 * Each individual page then implements methods specific to its needs such as animating different elements, depending on what's been queryed
 */

export default class Project extends Page {
  coverImage!: Image;
  title!: Text;
  paragraphs!: Text[];
  media!: Image[];
  middleTitle!: Text;
  footer!: Footer;

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
    this.coverImage.show();
    gsap.to(this.elements.headerInfo, {
      autoAlpha: 1,
      duration: 0.4,
    });
    await this.title.show();

    super.show();
  }

  hide() {
    super.hide();

    return Promise.all([
      this.coverImage.hide(),
      gsap.to(this.elements.headerInfo, {
        autoAlpha: 0,
        duration: 0.4,
      }),
      this.title.hide(),
      ...this.paragraphs.map(paragraph => paragraph.hide()),
      ...this.media.map(media => media.hide()),
      this.middleTitle.hide(),
      this.footer.hide(),
    ]);
  }

  createAnimations() {
    super.createAnimations();

    this.coverImage = new Image({
      element: this.elements.coverImageWrapper,
      manualTrigger: true,
    });

    this.title = new Text({
      element: this.elements.title,
      manualTrigger: true,
      colored: true,
    });

    this.paragraphs = this.elements.paragraphs.map(
      element => new Text({ element })
    );

    gsap.set(this.elements.headerInfo, {
      autoAlpha: 0,
    });

    // TODO: Improve appearing animation for tall images
    this.media = this.elements.media.map(element => new Image({ element }));

    this.middleTitle = new Text({
      element: this.elements.middleTitle,
      colored: true,
    });
    this.footer = new Footer({ element: this.elements.footer });

    super.createAnimations();
  }
}
