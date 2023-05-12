import gsap from "gsap";
import NormalizeWheel from "normalize-wheel";

import Component, { ComponentProps } from "./component";

/*
 * INFO
 * Page is responsible for showing, hiding and setting up all kinds of listeners
 */

export type Template = "home" | "about" | "project";

type PageProps = ComponentProps;

export default class Page extends Component {
  scroll!: {
    current: number;
    target: number;
    limit: number;
  };

  constructor(props: PageProps) {
    super(props);

    this.scroll = {
      current: 0,
      target: 0,
      limit: 0,
    };
  }

  show() {
    return new Promise<void>(resolve => {
      gsap.to(this.element, {
        autoAlpha: 1,
        duration: 0.5,
        onComplete: () => {
          this.addWheelListener();
          resolve();
        },
      });
    });
  }

  hide() {
    this.removeWheelListener();

    return new Promise<void>(resolve => {
      gsap.to(this.element, {
        autoAlpha: 0,
        duration: 1,
        onComplete: resolve,
      });
    });
  }

  onResize() {
    this.scroll.limit = this.elements.content.clientHeight - window.innerHeight;
  }

  addWheelListener() {
    window.addEventListener("wheel", this.handleWheel.bind(this));
  }

  removeWheelListener() {
    window.removeEventListener("wheel", this.handleWheel.bind(this));
  }

  // TODO: not working on Safari right now, fix it
  handleWheel(event: WheelEvent) {
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

    this.elements.content.setAttribute(
      "style",
      `transform: translateY(-${this.scroll.current}px)`
    );
  }
}
