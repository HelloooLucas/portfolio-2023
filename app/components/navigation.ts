import { gsap } from "gsap";
import { Template } from "../classes/page";
import splitIntoLines from "../utils/text";
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
  titleLines!: HTMLSpanElement[];

  constructor({ template }: NavigationProps) {
    super({
      selector: "nav",
      selectorChildren: {
        body: "body",
        navName: ".nav__name > h1",
        navLinks: ".nav__links",
        navHome: ".nav__links__home",
        navAbout: ".nav__links__about",
        backgroundColumns: ".background-columns > div",
      },
    });
    this.detectDomNodes();
    this.createAnimations();
    this.setColors(template);
    this.setLinks(template);
  }

  show() {
    const tl = gsap.timeline();
    tl.to(this.titleLines, {
      y: "0%",
      duration: 0.4,
      stagger: 0.2,
    }).to(
      this.elements.navLinks,
      {
        y: "0%",
        duration: 0.4,
      },
      0
    );
  }

  createAnimations() {
    this.titleLines = splitIntoLines(this.elements.navName);
    gsap.set([this.titleLines, this.elements.navLinks], {
      y: "100%",
    });
  }

  onPageChange(template: Template) {
    this.setColors(template);
    this.setLinks(template);
  }

  setLinks(template: Template) {
    const tl = gsap.timeline();

    if (template === "about") {
      tl.to(this.elements.navAbout, {
        y: "100%",
        duration: 1,
        ease: "expo.in",
      });
      tl.to(this.elements.navHome, {
        y: "0%",
        duration: 1,
        ease: "expo.out",
      });
    } else {
      tl.to(this.elements.navHome, {
        y: "100%",
        duration: 1,
        ease: "expo.in",
      });
      tl.to(this.elements.navAbout, {
        y: "0%",
        duration: 1,
        ease: "expo.out",
      });
    }
  }

  // Maybe I can first blend type/columns colors with new background, and then only change their color?
  // Something to smooth the transition
  setColors(template: Template) {
    const duration = 0.2;
    const tl = gsap.timeline({ duration });

    if (template === "about") {
      tl.to(this.elements.body, {
        backgroundColor: ABOUT_BACKGROUND,
      }).to(this.elements.backgroundColumns, {
        borderColor: ABOUT_COLUMNS,
      });

      gsap.to(this.element, {
        color: ABOUT_TEXTS,
        duration,
      });
    } else {
      tl.to(this.elements.body, {
        backgroundColor: DEFAULT_BACKGROUND,
      }).to(this.elements.backgroundColumns, {
        borderColor: DEFAULT_COLUMNS,
      });

      gsap.to(this.element, {
        color: DEFAULT_TEXTS,
        duration,
      });
    }
  }
}
