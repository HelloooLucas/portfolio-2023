/*
 * INFO
 * Component takes care of querying all elements that different pages will need and stores them into memory
 */

interface Elements {
  // Common to all pages
  content: HTMLDivElement;
  title: HTMLTitleElement;
  middleTitle: HTMLTitleElement;
  texts: HTMLParagraphElement[];
  images: HTMLImageElement[];
  footer: HTMLElement;
  animationsTitles?: HTMLHeadingElement[];
  animationsTexts?: HTMLParagraphElement[];
  preloadImages: HTMLImageElement[];

  // Navigation
  body: HTMLBodyElement;
  navName: HTMLHeadingElement;
  navLinks: HTMLDivElement;
  navHome: HTMLAnchorElement;
  navAbout: HTMLAnchorElement;
  backgroundColumns: HTMLDivElement;

  // Home
  projects: HTMLElement[];
  topSectionPosition: HTMLParagraphElement;
  topSectionPortfolio: HTMLParagraphElement;

  // Project
  headerImage?: HTMLImageElement;
  headerInfo?: HTMLDivElement;

  // About
  awardsTitle?: HTMLTitleElement;
  awardsLines?: HTMLDivElement[];

  // Preloader
  counter: HTMLSpanElement;
  columns: HTMLDivElement[];
}

export interface ComponentProps {
  selector: string;
  selectorChildren: { [key: string]: string };
}

class Component extends EventTarget {
  selector: string;
  selectorChildren: { [key: string]: string };
  element!: HTMLElement;
  elements!: Elements;

  constructor({ selector, selectorChildren }: ComponentProps) {
    super();
    this.selector = selector;
    this.selectorChildren = selectorChildren;
  }

  detectDomNodes() {
    this.element = document.querySelector(this.selector) as HTMLElement;

    this.elements = Object.entries(this.selectorChildren).reduce(
      (acc, [key, selector]) => {
        // Refactor this so I don't have to maintain a list
        // Maybe pass a "single" or "multiple" type with the selector so I can decide how to query the nodes
        switch (key) {
          case "body":
          case "navName":
          case "navHome":
          case "navAbout":
          case "content":
          case "topSectionPosition":
          case "topSectionPortfolio":
          case "title": // TODO: Since animationsTitles is already passed, do we still need to mention title and middleTitle?
          case "middleTitle":
          case "footer":
          case "headerImage":
          case "headerInfo":
          case "awardsTitle":
          case "counter":
            return {
              ...acc,
              [key]: document.querySelector(selector) as HTMLElement,
            };
          default:
            return {
              ...acc,
              [key]: [...document.querySelectorAll(selector)],
            };
        }
      },
      {} as Elements
    );
  }
}

export default Component;
