import { gsap } from "gsap";

import Text from "../animations/text";
import { Template } from "../classes/page";
import Component from "../classes/component";
import NavigationItem from "../animations/navigation-item";

const ABOUT_TEXTS = "#dfdfdf";
const ABOUT_COLUMNS = "rgba(85, 85, 85, 0.6)";
const ABOUT_BACKGROUND = "#333";
const DEFAULT_TEXTS = "#333";
const DEFAULT_COLUMNS = "rgba(233, 233, 233, 0.8)";
const DEFAULT_BACKGROUND = "#fff";

const projectUrlsList = [
  "/sopra-banking-software.html",
  "/last-quest.html",
  "/solers-io.html",
  "/atelier-tote-bag.html",
];

interface NavigationProps {
  currentUrl: string;
  template: Template;
}

export default class Navigation extends Component {
  currentUrl: string;
  template: Template;
  title!: Text;
  navAbout!: NavigationItem;
  navHome!: NavigationItem;

  constructor({ currentUrl, template }: NavigationProps) {
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

    this.currentUrl = currentUrl;
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
    this.title = new Text({
      element: this.elements.navName,
      manualTrigger: true,
    });
    this.navHome = new NavigationItem({
      element: this.elements.navHome,
    });
    this.navAbout = new NavigationItem({
      element: this.elements.navAbout,
    });
  }

  updateUrl(url: string, backwards?: boolean) {
    if (backwards) {
      this.currentUrl = url;
    } else {
      window.history.pushState({}, "", url);
      this.currentUrl = window.location.pathname;
    }
  }

  async handlePageChange(destination: Template) {
    this.setLinks(destination);
    await this.setColors(destination);
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

  // TODO: refactor this because detecting when to change color is super messy
  // TODO: also right now there's a transition from white to white when navigating between projects
  setColors(destination: Template) {
    const tl = gsap.timeline();

    const arrivingOnHomePage =
      this.currentUrl === "/" && destination === "home";
    const arrivingOnProjectPage =
      projectUrlsList.includes(this.currentUrl) && destination === "project";
    const leavingAboutPage = this.currentUrl.includes("about");

    if (destination === "about") {
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
    } else if (
      arrivingOnHomePage ||
      arrivingOnProjectPage ||
      leavingAboutPage
    ) {
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

    return tl;
  }
}
