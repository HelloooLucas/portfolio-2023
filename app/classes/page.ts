import gsap from "gsap";

/*
 * INFO
 * Page takes care of querying all elements that different pages will be needing and storing them into memory
 */

export type Template = "home" | "about" | "project";

interface PageProps {
  selector: string;
  selectorChildren: { [key: string]: string | string[] }; // TODO: Same here, remove the string[] option if not necessary
}

export default class Page {
  selector: string;
  selectorChildren: { [key: string]: string | string[] };
  element!: HTMLDivElement;
  elements!: { [key: string]: Element | string[] | NodeList | null }; // TODO: If I don't need the string[] or NodeList types, clean them from here
  scroll!: {
    current: number;
    target: number;
    limit: number;
    last: number;
  };
  transformPrefix!: string;

  constructor({ selector, selectorChildren }: PageProps) {
    this.selector = selector;
    this.selectorChildren = selectorChildren;

    this.scroll = {
      current: 0,
      target: 0,
      limit: 0,
      last: 0,
    };
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
  }

  show() {
    return new Promise<void>(resolve => {
      gsap.to(this.element, {
        autoAlpha: 1,
        duration: 0.5,
        onComplete: () => {
          this.addEventListeners();
          resolve();
        },
      });
    });
  }

  hide() {
    this.removeEventListeners();

    return new Promise<void>(resolve => {
      gsap.to(this.element, {
        autoAlpha: 0,
        duration: 1,
        onComplete: resolve,
      });
    });
  }

  onResize() {
    // TODO: remove this check when I refactor Page to extend Component
    if (this.elements.content instanceof Element) {
      this.scroll.limit =
        this.elements.content.clientHeight - window.innerHeight;
    }
  }

  addEventListeners() {
    window.addEventListener("wheel", this.onMouseWheel.bind(this));
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.onMouseWheel.bind(this));
  }

  // TODO: not working on Safari right now, fix it
  onMouseWheel(event: WheelEvent) {
    const { deltaY } = event;
    this.scroll.target += deltaY;
  }

  update() {
    this.scroll.target = gsap.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    );

    // Here because otherwise JS will loop in weird negative values
    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    this.elements.content.style.transform = `translateY(-${this.scroll.current}px)`;
  }
}
