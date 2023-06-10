import { gsap } from "gsap";
import { Template } from "../classes/page";
import Component from "../classes/component";
import Title from "../animations/title";

const ABOUT_TEXTS = "#dfdfdf";
const ABOUT_COLUMNS = "rgba(85, 85, 85, 0.6)";
const ABOUT_BACKGROUND = "#333";
const DEFAULT_TEXTS = "#334";
const DEFAULT_COLUMNS = "rgba(233, 233, 233, 0.8)";
const DEFAULT_BACKGROUND = "#fff";

interface NavigationProps {
  template: Template;
}

export default class Navigation extends Component {
  template: Template;
  title!: Title;
  navAbout!: Title;
  navHome!: Title;

  constructor({ template }: NavigationProps) {
    super({
      selector: "nav",
      selectorChildren: {
        body: "body",
        navName: ".nav__name > h1",
        navLinks: ".nav__links",
        navHome: ".nav__links__home",
        navAbout: ".nav__links__about",
        backgroundColumns: [".background-columns > div"],
      },
    });

    this.template = template;

    this.detectDomNodes();
    this.createAnimations();
    this.setColors(template);
  }

  show() {
    this.title.show();
    this.setLinks(this.template);
  }

  createAnimations() {
    this.title = new Title({
      element: this.elements.navName,
      manualTrigger: true,
    });
    this.navHome = new Title({
      element: this.elements.navHome,
      manualTrigger: true,
    });
    this.navAbout = new Title({
      element: this.elements.navAbout,
      manualTrigger: true,
    });
  }

  onPageChange(template: Template) {
    this.setColors(template);
    this.setLinks(template);
  }

  async setLinks(template: Template) {
    if (template === "about") {
      await this.navAbout.hide();
      this.navHome.show();
    } else {
      await this.navHome.hide();
      this.navAbout.show();
    }
  }

  setColors(template: Template) {
    const tl = gsap.timeline();

    if (template === "about") {
      tl.to(this.elements.backgroundColumns, {
        autoAlpha: 0,
        duration: 0.2,
      })
        .set(this.elements.backgroundColumns, {
          borderColor: ABOUT_COLUMNS,
        })
        .to(this.elements.body, {
          backgroundColor: ABOUT_BACKGROUND,
          duration: 0.6,
        })
        .addLabel("background-halfway-changed", 0.8)
        .to(
          this.elements.backgroundColumns,
          {
            autoAlpha: 1,
          },
          "background-halfway-changed"
        )
        .to(
          this.element,
          {
            color: ABOUT_TEXTS,
          },
          "background-halfway-changed"
        );
    } else if (template === "home") {
      tl.to(this.elements.backgroundColumns, {
        autoAlpha: 0,
        duration: 0.2,
      })
        .set(this.elements.backgroundColumns, {
          borderColor: DEFAULT_COLUMNS,
        })
        .to(this.elements.body, {
          backgroundColor: DEFAULT_BACKGROUND,
          duration: 0.6,
        })
        .addLabel("background-halfway-changed", 0.8)
        .to(
          this.elements.backgroundColumns,
          {
            autoAlpha: 1,
          },
          "background-halfway-changed"
        )
        .to(
          this.element,
          {
            color: DEFAULT_TEXTS,
          },
          "background-halfway-changed"
        );
    }
  }
}
