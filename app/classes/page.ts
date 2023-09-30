import gsap from "gsap";
import NormalizeWheel from "normalize-wheel";

import BackgroundLoad from "./background-load";
import Component, { ComponentProps } from "./component";

/*
 * INFO
 * Page is responsible for showing, hiding and setting up all kinds of listeners
 */

export type Template = "home" | "about" | "project";

type PageProps = ComponentProps;

export default class Page extends Component {
  handleWheelBound: (event: WheelEvent) => void;
  handleTouchDownBound: (event: TouchEvent) => void;
  handleTouchMoveBound: (event: TouchEvent) => void;
  handleTouchEndBound: () => void;
  scroll: {
    current: number;
    target: number;
    limit: number;
  };

  touch: {
    isDown: boolean;
    start: number;
    position: number;
  };

  constructor(props: PageProps) {
    super(props);

    this.handleWheelBound = this.handleWheel.bind(this);
    this.handleTouchDownBound = this.handleTouchDown.bind(this);
    this.handleTouchMoveBound = this.handleTouchMove.bind(this);
    this.handleTouchEndBound = this.handleTouchEnd.bind(this);

    this.scroll = {
      current: 0,
      target: 0,
      limit: 0,
    };

    this.touch = {
      isDown: false,
      start: 0,
      position: 0,
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
    this.addTouchListeners();
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

  // TODO: not working on Safari right now, fix it
  handleWheel(event: WheelEvent) {
    const { pixelY } = NormalizeWheel(event);
    this.scroll.target += pixelY;
  }

  handleTouchDown(event: TouchEvent) {
    this.touch.isDown = true;
    this.touch.position = this.scroll.current;
    this.touch.start = event.touches[0].clientY;
  }

  handleTouchMove(event: TouchEvent) {
    if (!this.touch.isDown) return;

    const y = event.touches[0].clientY;
    const distance = (this.touch.start - y) * 3;

    this.scroll.target = this.touch.position + distance;
  }

  handleTouchEnd() {
    this.touch.isDown = false;
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

  addWheelListener() {
    // Attaching the listener to html instead of window, because of Safari bug
    this.elements.html.addEventListener("wheel", this.handleWheelBound);
  }

  removeWheelListener() {
    window.removeEventListener("wheel", this.handleWheelBound);
  }

  addTouchListeners() {
    window.addEventListener("touchstart", this.handleTouchDownBound);
    window.addEventListener("touchmove", this.handleTouchMoveBound);
    window.addEventListener("touchend", this.handleTouchEndBound);
  }

  removeTouchListeners() {
    window.removeEventListener("touchend", this.handleTouchDownBound);
    window.removeEventListener("touchmove", this.handleTouchMoveBound);
    window.removeEventListener("touchend", this.handleTouchEndBound);
  }

  destroy() {
    this.removeWheelListener();
    this.removeTouchListeners();
    // TODO: add a remove resize listener and make sure it's properly removed with logs ==> use arrow function
  }
}
