import gsap from "gsap";
import NormalizeWheel from "normalize-wheel";

/*
 * INFO
 * Page takes care of querying all elements that different pages will be needing and storing them into memory
 */

export type Template = "home" | "about" | "project";

interface PageProps {
  selector: string;
  selectorChildren: { [key: string]: string };
}

export default class Page {
  selector: string;
  selectorChildren: { [key: string]: string };
  element!: HTMLDivElement;
  elements!: { [key: string]: Element | NodeList | null };
  scroll!: {
    current: number;
    target: number;
    limit: number;
    last: number; // TODO: remove this if not used?
  };
  transformPrefix!: string;

  constructor({ selector, selectorChildren }: PageProps) {
    this.selector = selector;
    this.selectorChildren = selectorChildren;

    this.scroll = {
      current: 0,
      target: 0,
      limit: 0,
      last: 0, // TODO: remove here too
    };
  }

  create() {
    this.element = document.querySelector(this.selector) as HTMLDivElement;
    this.elements = {};

    Object.entries(this.selectorChildren).forEach(([key, selector]) => {
      const nodeList = document.querySelectorAll(selector);

      if (nodeList.length === 0) {
        this.elements[key] = null;
      } else if (nodeList.length === 1) {
        this.elements[key] = document.querySelector(selector);
      } else {
        this.elements[key] = nodeList;
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
    const { pixelY } = NormalizeWheel(event);
    this.scroll.target += pixelY;
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

    // TODO: remove this check when I refactor Page to extend Component
    if (this.elements.content instanceof Element) {
      this.elements.content.setAttribute(
        "style",
        `transform: translateY(-${this.scroll.current}px)`
      );
    }
  }
}
