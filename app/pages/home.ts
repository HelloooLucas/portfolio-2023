import Page from "../classes/page";
import Text from "../animations/text";
import Footer from "../animations/footer";
import HomeProject from "../animations/home-project";

/*
 * INFO
 * Each individual page implements methods specific to its needs such as animating different elements
 * It can do so thanks to what the Page has already queried
 */

export default class Home extends Page {
  topSectionPosition!: Text;
  topSectionPortfolio!: Text;
  projects!: HomeProject[];
  footer!: Footer;

  constructor() {
    super({
      selector: ".home",
      selectorChildren: {
        content: ".content",
        topSectionPosition: ".home__top-section__position",
        topSectionPortfolio: ".home__top-section__portfolio",
        preloadImages: ["[data-src]"],
        projects: [".home__project"],
        footer: "footer",
      },
    });
  }

  async show() {
    await Promise.all([
      this.topSectionPosition.show(),
      this.topSectionPortfolio.show(),
    ]);

    super.show();
  }

  async hide() {
    super.hide();

    await Promise.all([
      this.topSectionPosition.hide(),
      this.topSectionPortfolio.hide(),
      ...this.projects.map(project => project.hide()),
      this.footer.hide(),
    ]);
  }

  createAnimations() {
    this.topSectionPosition = new Text({
      element: this.elements.topSectionPosition,
      manualTrigger: true,
    });
    this.topSectionPortfolio = new Text({
      element: this.elements.topSectionPortfolio,
      manualTrigger: true,
    });

    this.projects = this.elements.projects.map(
      project => new HomeProject({ project })
    );

    this.footer = new Footer({ element: this.elements.footer });

    super.createAnimations();
  }

  destroy() {
    super.destroy();

    // this.projects.forEach(project => project.removeEventListeners());
  }
}
