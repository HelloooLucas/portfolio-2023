import { gsap } from "gsap";
import { Template } from "../classes/page";
import Component from "../classes/component";

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
  constructor({ template }: NavigationProps) {
    super({
      selector: "nav",
      selectorChildren: {
        body: "body",
        navName: ".nav__name > h1",
        navHome: ".nav__links__home",
        navAbout: ".nav__links__about",
        backgroundColumns: ".background-columns > div",
      },
    });
    this.detectDomNodes();
    this.onChange(template);
  }

  onChange(template: Template) {
    this.manageColors(template);
    this.manageLinks(template);
  }

  manageLinks(template: Template) {
    const tl = gsap.timeline();

    if (template === "about") {
      tl.to(this.elements.navAbout, {
        y: "100%",
      });
      tl.to(this.elements.navHome, {
        y: "0%",
      });
    } else {
      tl.to(this.elements.navHome, {
        y: "100%",
      });
      tl.to(this.elements.navAbout, {
        y: "0%",
      });
    }
  }

  manageColors(template: Template) {
    const duration = 0.2;
    const tl = gsap.timeline({ duration });

    if (template === "about") {
      tl.to(this.elements.body, {
        backgroundColor: ABOUT_BACKGROUND,
      });
      tl.to(this.elements.backgroundColumns, {
        borderColor: ABOUT_COLUMNS,
      });

      gsap.to(this.element, {
        color: ABOUT_TEXTS,
        duration,
      });
    } else {
      tl.to(this.elements.body, {
        backgroundColor: DEFAULT_BACKGROUND,
      });
      tl.to(this.elements.backgroundColumns, {
        borderColor: DEFAULT_COLUMNS,
      });

      gsap.to(this.element, {
        color: DEFAULT_TEXTS,
        duration,
      });
    }
  }
}
