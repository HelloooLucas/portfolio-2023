import gsap from "gsap";

import Component from "../classes/component";
import ImagesLoader from "../classes/images-loader";

export const PRELOADING_FINISHED_EVENT = "preloading-finished";

type WindowSize = keyof typeof windowSizes;
type ColumnsNumber = 4 | 6 | 8 | 10;

const windowSizes = {
  mobile: [0, 768],
  tablet: [769, 1024],
  desktop: [1025, 1366],
  largeDesktop: [1366, 9999999999],
};

const columnsNumber: Record<WindowSize, ColumnsNumber> = {
  mobile: 4,
  tablet: 6,
  desktop: 8,
  largeDesktop: 10,
};

export default class Preloader extends Component {
  loadedLength = 0;
  counterInnerSpan!: HTMLSpanElement;
  columnsTimeline!: gsap.core.Timeline;
  columnsNumber!: 4 | 6 | 8 | 10;

  constructor() {
    super({
      selector: ".preloader",
      selectorChildren: {
        counter: ".preloader__counter > span",
        columns: [".preloader__columns > div"],
        preloadImages: ["[data-src]"],
      },
    });

    this.getWindowSize();
    this.detectDomNodes();

    this.setupColumns();
    this.init();
  }

  init() {
    const loader = new ImagesLoader({
      images: this.elements.preloadImages,
      onTick: this.updateProgression.bind(this),
    });
    loader.loadImages();
  }

  setupColumns() {
    this.columnsTimeline = gsap.timeline({
      paused: true,
      // @ts-expect-error: onComplete cannot accept an async function, but it works anyway
      onComplete: async () => {
        await this.hidePreloader();
        this.destroyPreloader();
      },
    });

    this.elements.columns.slice(0, this.columnsNumber).forEach(column => {
      this.columnsTimeline.add(
        gsap.to(column, {
          height: "100%",
          duration: 1.5,
          ease: "expo.inOut",
        }),
        "<0.1"
      );
    });

    if (window.location.pathname.includes("about")) {
      this.element.style.background = "#333";
      this.elements.counter.style.color = "white";
      this.elements.columns.forEach(column => {
        column.style.background = "white";
      });
    }
  }

  updateProgression(percentage: number) {
    this.elements.counter.innerHTML = `${Math.round(percentage)}%`;

    const duration = this.columnsTimeline.duration();
    this.columnsTimeline.tweenTo((percentage / 100) * duration);
  }

  hidePreloader() {
    const tl = gsap.timeline({ ease: "expo.in" });

    tl.to(
      this.elements.counter,
      {
        y: "100%",
      },
      0.3
    );

    tl.to(
      this.elements.columns,
      {
        duration: 1,
        scaleY: 0,
        transformOrigin: "100% 100%",
        stagger: 0.05,
        ease: "expo.inOut",
      },
      0.5
    );

    return tl;
  }

  destroyPreloader() {
    this.element.parentNode?.removeChild(this.element);
    this.dispatchEvent(new Event(PRELOADING_FINISHED_EVENT));
  }

  getWindowSize() {
    const windowWidth = window.innerWidth;
    const format = Object.entries(windowSizes).reduce(
      (acc, [size, [min, max]]) => {
        if (windowWidth >= min && windowWidth <= max) {
          return size as WindowSize;
        }
        return acc;
      },
      "largeDesktop" as WindowSize
    );

    this.columnsNumber = columnsNumber[format];
  }
}
