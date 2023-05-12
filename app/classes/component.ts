interface Elements {
  // Common to all pages
  navigation: HTMLElement;
  title: HTMLTitleElement;
  middleTitle: HTMLTitleElement;
  texts: NodeListOf<HTMLParagraphElement>;
  images: NodeListOf<HTMLImageElement>;
  footer: HTMLElement;

  // Home
  topSectionTexts?: NodeListOf<HTMLParagraphElement>;
  projectBlockImages?: NodeListOf<HTMLImageElement>;
  projectBlockNames?: NodeListOf<HTMLTitleElement>;

  // Project
  headerImage?: HTMLImageElement;
  headerInfo?: HTMLDivElement;

  // About
  awardsTitle?: HTMLTitleElement;
  awardsLines?: NodeListOf<HTMLDivElement>;

  // Preloader
  counter?: HTMLSpanElement;
  columns?: NodeListOf<HTMLDivElement>;
}

interface ComponentProps {
  selector: string;
  selectorChildren: { [key: string]: string };
}

class Component extends EventTarget {
  selector: string;
  selectorChildren: { [key: string]: string };
  element!: HTMLDivElement;
  elements!: Elements;

  constructor({ selector, selectorChildren }: ComponentProps) {
    super();
    this.selector = selector;
    this.selectorChildren = selectorChildren;

    this.create();
  }

  create() {
    this.element = document.querySelector(this.selector) as HTMLDivElement;

    this.elements = Object.entries(this.selectorChildren).reduce(
      (acc, [key, selector]) => {
        switch (key) {
          case "navigation":
          case "title":
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
              [key]: document.querySelectorAll(selector) as NodeList,
            };
        }
      },
      {} as Elements
    );
  }
}

export default Component;
