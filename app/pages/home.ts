import Page from "../classes/page";
import Text from "../animations/text";
import Footer from "../animations/footer";
import WidthObserver from "../classes/width-observer";
import HomeProjectBlockAnimation from "../animations/home-project-block-animation";
import HomeProjectHoverAnimations from "../animations/home-project-hover-animations";

/*
 * INFO
 * Each individual page implements methods specific to its needs such as animating different elements
 * It can do so thanks to what the Page has already queried
 */

export default class Home extends Page {
  isDesktop: boolean;
  topSectionPosition!: Text;
  topSectionPortfolio!: Text;
  widthObserver: WidthObserver;
  projectBlockAnimations!: HomeProjectBlockAnimation[];
  projectHoverAnimations!: HomeProjectHoverAnimations;
  footer!: Footer;

  constructor() {
    super({
      selector: ".home",
      selectorChildren: {
        html: "html",
        content: ".content",
        topSectionPosition: ".home__top-section__position",
        topSectionPortfolio: ".home__top-section__portfolio",
        preloadImages: ["[data-src]"],
        projects: [".home__project"],
        footer: "footer",
      },
    });

    // TODO: refactor this in a cleaner way if possible?
    this.widthObserver = new WidthObserver({
      matches: "(min-width: 1024px)",
      handleChange: () => {
        this.isDesktop = this.widthObserver.matches();
        if (this.isDesktop) {
          this.projectHoverAnimations = new HomeProjectHoverAnimations({
            projects: this.elements.projects,
          });
        } else {
          this.projectHoverAnimations.destroy();
        }
      },
    });
    this.isDesktop = this.widthObserver.matches();
  }

  async show() {
    await Promise.all([
      this.topSectionPosition.show(),
      this.topSectionPortfolio.show(),
    ]);

    super.show();
  }

  async hide() {
    await Promise.all([
      this.topSectionPosition.hide(),
      this.topSectionPortfolio.hide(),
      ...this.projectBlockAnimations.map(project => project.hide()),
      this.projectHoverAnimations?.hide(),
      this.footer.hide(),
    ]);

    super.hide();
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

    this.projectBlockAnimations = this.elements.projects.map(
      project => new HomeProjectBlockAnimation({ project })
    );

    if (this.isDesktop) {
      this.projectHoverAnimations = new HomeProjectHoverAnimations({
        projects: this.elements.projects,
      });
    }

    this.footer = new Footer({ element: this.elements.footer });

    super.createAnimations();
  }

  destroy() {
    super.destroy();

    this.projectHoverAnimations?.destroy();
    this.widthObserver.removeEventListeners();
  }
}
