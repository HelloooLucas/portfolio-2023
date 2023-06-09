import gsap from "gsap";
import splitIntoLines from "../utils/text";

import Component from "../classes/component";

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
        // TODO: try to see if I can use BackgroundPreload here instead of duplicating the logic
        preloadImages: ["[data-src]"],
      },
    });

    this.detectDomNodes();

    this.titleInnerSpans = splitIntoLines(this.elements.title);

    this.loadImageAssets();
  }

  loadImageAssets() {
    this.elements.preloadImages.forEach(img => {
      img.src = img.getAttribute("data-src") as string;
      img.onload = () => this.imageAssetLoaded();
    });
  }

  async imageAssetLoaded() {
    this.loadedLength += 1;

    const percentage =
      (this.loadedLength / this.elements.preloadImages.length) * 100;

    this.elements.counter.innerHTML = `${Math.round(percentage)}%`;

    if (this.loadedLength === this.elements.preloadImages.length) {
      await this.hidePreloader();
      this.destroyPreloader();
    }
  }

  async hidePreloader() {
    return new Promise(resolve => {
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
          onComplete: resolve,
        },
        0.5
      );
    });
  }

  destroyPreloader() {
    this.element.parentNode?.removeChild(this.element);
    this.dispatchEvent(new Event(PRELOADING_FINISHED_EVENT));
  }
}
