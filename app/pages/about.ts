import Page from "../classes/page";
import Text from "../animations/text";
import Image from "../animations/image";
import Footer from "../animations/footer";
import AboutAwards from "../animations/about-awards";

/*
 * INFO
 * Each individual page then implements methods specific to its needs such as animating different elements, depending on what's been queryed
 */

export default class About extends Page {
  coverImage!: Image;
  title!: Text;
  paragraphs!: Text[];
  awardsBlock!: AboutAwards;
  footer!: Footer;

  constructor() {
    super({
      selector: ".about",
      selectorChildren: {
        html: "html",
        content: ".content",
        preloadImages: ["[data-src]"],
        coverImageWrapper: ".about__header__image-wrapper",
        title: ".about__title",
        paragraphs: [".about__text-1", ".about__text-2"],
        awardsBlock: ".about__awards",
        footer: "footer",
      },
    });
  }

  async show() {
    this.coverImage.show();
    await this.title.show();

    super.show();
  }

  hide() {
    super.hide();

    return Promise.all([
      this.coverImage.hide(),
      this.title.hide(),
      ...this.paragraphs.map(paragraph => paragraph.hide()),
      this.awardsBlock.hide(),
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
    });

    this.paragraphs = this.elements.paragraphs?.map(
      element => new Text({ element })
    );

    this.awardsBlock = new AboutAwards({ element: this.elements.awardsBlock });

    this.footer = new Footer({ element: this.elements.footer });

    super.createAnimations();
  }
}
