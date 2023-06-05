import { gsap } from "gsap";
import Page from "../classes/page";
import Title from "../animations/title";
import Image from "../animations/image";
import AwardLine from "../animations/award-line";
import Footer from "../animations/footer";

/*
 * INFO
 * Each individual page then implements methods specific to its needs such as animating different elements, depending on what's been queryed
 */

export default class About extends Page {
  mainTitle!: Title;
  awardsTitle!: Title;
  awardsLines!: AwardLine[];
  coverImage!: Image;
  footer!: Footer;

  constructor() {
    super({
      selector: ".about",
      selectorChildren: {
        content: ".content",
        preloadImages: "[data-src]",
        coverImageWrapper: ".about__header__image-wrapper",
        // TODO: remove this?
        // title: ".about__title",
        mainTitle: ".about__title",
        // texts: ".about__text-1, .about__text-2",
        animationsTexts: ".about__text-1, .about__text-2",
        awardsTitle: ".about__awards__title",
        awardsLines: ".about__awards__line",
        footer: "footer",
      },
    });
  }

  show() {
    this.coverImage.show();
    this.mainTitle.show();
  }

  createAnimations() {
    super.createAnimations();

    this.coverImage = new Image({
      element: this.elements.coverImageWrapper,
      manualTrigger: true,
    });

    this.mainTitle = new Title({
      element: this.elements.mainTitle,
      manualTrigger: true,
      onComplete: () => super.show(),
    });

    const awardsTimeline = gsap.timeline();

    this.awardsTitle = new Title({
      element: this.elements.awardsTitle,
      timeline: awardsTimeline,
    });
    this.awardsLines = this.elements.awardsLines.map(
      element => new AwardLine({ element, timeline: awardsTimeline })
    );

    this.footer = new Footer({ element: this.elements.footer });
  }
}