import gsap from "gsap";
import NormalizeWheel from "normalize-wheel";

import Component, { ComponentProps } from "./component";
import BackgroundLoad from "./background-load";

/*
 * INFO
 * Page is responsible for showing, hiding and setting up all kinds of listeners
 */

export type Template = "home" | "about" | "project";

type PageProps = ComponentProps;

export default class Page extends Component {
  handleWheelBound: (event: WheelEvent) => void;
  scroll!: {
    current: number;
    target: number;
    limit: number;
  };

  constructor(props: PageProps) {
    super(props);

    this.handleWheelBound = this.handleWheel.bind(this);
    this.scroll = {
      current: 0,
      target: 0,
      limit: 0,
    };
  }

  init() {
    this.detectDomNodes();
    this.createAnimations();
  }

  async handleChange() {
    this.detectDomNodes();
    await this.backgroundLoad();
    this.createAnimations();
    this.onResize();
    this.scrollTop();
    this.show();
  }

  createAnimations() {
    gsap.set(this.element, {
      autoAlpha: 1,
    });
  }

  async backgroundLoad() {
    const loader = new BackgroundLoad({ images: this.elements.preloadImages });
    await loader.loadImageAssets();
  }

  show() {
    // This is called by instances of Page (Home, About, etc.) when their showing animations are completed
    this.addWheelListener();
  }

  hide() {
    this.destroy();
  }

  addResizeListener() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  // TODO: rename to handleResize here, and for all other "on" functions?
  onResize() {
    this.scroll.limit = this.elements.content.clientHeight - window.innerHeight;
  }

  addWheelListener() {
    window.addEventListener("wheel", this.handleWheelBound);
  }

  removeWheelListener() {
    window.removeEventListener("wheel", this.handleWheelBound);
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

  scrollTop() {
    this.scroll.current = 0;
    this.scroll.target = 0;
  }

  destroy() {
    this.removeWheelListener();
    // TODO: add a remove resize listener and make sure it's properly removed with logs ==> use arrow function
  }
}
