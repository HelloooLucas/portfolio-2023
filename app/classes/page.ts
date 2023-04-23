import GSAP from "gsap";

/*
 * INFO
 * Page takes care of querying all elements that different pages will be needing and storing them into memory
 */

export type Template = "home" | "about" | "project";

interface PageProps {
  id: Template;
  selector: string;
  selectorChildren: { [key: string]: string | string[] }; // TODO: Same here, remove the string[] option if not necessary
}

export default class Page {
  id: Template; // TODO: not sure what the id will be used for yet, maybe remove it if unnecessary?
  selector: string;
  selectorChildren: { [key: string]: string | string[] };
  element!: HTMLDivElement;
  elements!: { [key: string]: Element | string[] | NodeList | null }; // TODO: If I don't need the string[] or NodeList types, clean them from here

  constructor({ id, selector, selectorChildren }: PageProps) {
    this.id = id;
    this.selector = selector;
    this.selectorChildren = selectorChildren;
  }

  create() {
    this.element = document.querySelector(this.selector) as HTMLDivElement;

    this.elements = {};

    Object.entries(this.selectorChildren).forEach(([key, selector]) => {
      // TODO: add the case for directly passing HTMLElements of NodeLists if I realize it's useful, otherwise just keep providing selector strings
      // TODO: remove this if I see that I don't use the string[] format for selectors
      if (Array.isArray(selector)) {
        this.elements[key] = selector;
      } else {
        const nodeList = document.querySelectorAll(selector);

        if (nodeList.length === 0) {
          this.elements[key] = null;
        } else if (nodeList.length === 1) {
          this.elements[key] = document.querySelector(selector);
        } else {
          this.elements[key] = nodeList;
        }
      }
    });

    console.group("Creating");
    console.log("id: ", this.id);
    console.log("element: ", this.element);
    console.log("elements: ", this.elements);
    console.groupEnd();
  }

  show() {
    return new Promise(resolve => {
      GSAP.from(this.element, {
        autoAlpha: 0,
        duration: 1,
        onComplete: resolve,
      });
    });
  }

  hide() {
    return new Promise(resolve => {
      GSAP.to(this.element, {
        autoAlpha: 0,
        duration: 1,
        onComplete: resolve,
      });
    });
  }
}
