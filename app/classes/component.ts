/*
 * INFO
 * Component takes care of querying all elements that different pages will need and stores them into memory
 */

interface Elements {
  // Common to all pages
  content: HTMLDivElement;
  footer: HTMLElement;
  preloadImages: HTMLImageElement[];

  // Navigation
  body: HTMLBodyElement;
  navName: HTMLHeadingElement;
  navLinks: HTMLDivElement;
  navHome: HTMLAnchorElement;
  navAbout: HTMLAnchorElement;
  backgroundColumns: HTMLDivElement[];

  // Home
  projects: HTMLElement[];
  topSectionPosition: HTMLParagraphElement;
  topSectionPortfolio: HTMLParagraphElement;

  // Project
  headerInfo: HTMLDivElement;
  media: HTMLImageElement[];
  middleTitle: HTMLHeadingElement;

  // About
  awardsBlock: HTMLDivElement;
  awardsTitle: HTMLHeadingElement;
  awardsLines: HTMLDivElement[];

  // Project & About
  coverImageWrapper: HTMLDivElement;
  title: HTMLHeadingElement;
  paragraphs: HTMLParagraphElement[];

  // Preloader
  counter: HTMLSpanElement;
  columns: HTMLDivElement[];
}

export interface ComponentProps {
  selector: string;
  selectorChildren: { [key: string]: string | string[] };
}

class Component extends EventTarget {
  selector: string;
  selectorChildren: { [key: string]: string | string[] };
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
        if (Array.isArray(selector)) {
          return {
            ...acc,
            [key]: [...document.querySelectorAll(selector.join())],
          };
        }

        return {
          ...acc,
          [key]: document.querySelector(selector) as HTMLElement,
        };
      },
      {} as Elements
    );
  }
}

export default Component;
