import gsap from "gsap";
import splitIntoLines from "../utils/text";

import Component from "../classes/component";
import ImagesLoader from "../classes/images-loader";

export const PRELOADING_FINISHED_EVENT = "preloading-finished";

export default class Preloader extends Component {
  loadedLength = 0;
  titleInnerSpans!: HTMLSpanElement[];
  counterInnerSpan!: HTMLSpanElement;

  constructor() {
    super({
      selector: ".preloader",
      selectorChildren: {
        title: ".preloader__title",
        counter: ".preloader__counter > span",
        columns: [".preloader__columns > div"],
        preloadImages: ["[data-src]"],
      },
    });

    this.detectDomNodes();

    this.titleInnerSpans = splitIntoLines(this.elements.title);

    this.init();
  }

  async init() {
    const loader = new ImagesLoader({
      images: this.elements.preloadImages,
      onTick: this.updateCounter.bind(this),
    });
    await loader.loadImages();

    await this.hidePreloader();
    this.destroyPreloader();
  }

  updateCounter(percentage: number) {
    this.elements.counter.innerHTML = `${Math.round(percentage)}%`;
  }

  hidePreloader() {
    const tl = gsap.timeline({ delay: 1, ease: "expo.in" });

    tl.to(
      this.titleInnerSpans.reverse(),
      {
        y: "100%",
        stagger: 0.05,
      },
      0
    );

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
      },
      0.5
    );

    return tl;
  }

  destroyPreloader() {
    this.element.parentNode?.removeChild(this.element);
    this.dispatchEvent(new Event(PRELOADING_FINISHED_EVENT));
  }
}
