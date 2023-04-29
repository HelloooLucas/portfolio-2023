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
        columns: ".preloader__columns > div",
        images: "img",
      },
    });

    this.titleInnerSpans = splitIntoLines(this.elements.title);

    this.createLoader();
  }

  createLoader() {
    this.elements.images.forEach(img => {
      img.src = img.getAttribute("data-src") as string;
      img.onload = () => this.imageAssetLoaded();
    });
  }

  async imageAssetLoaded() {
    this.loadedLength += 1;

    const percentage = (this.loadedLength / this.elements.images.length) * 100;

    if (this.elements.counter) {
      this.elements.counter.innerHTML = `${Math.round(percentage)}%`;
    }

    if (this.loadedLength === this.elements.images.length) {
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

      if (this.elements.counter) {
        tl.to(
          this.elements.counter,
          {
            y: "100%",
          },
          0.3
        );
      }

      if (this.elements.columns) {
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
      }
    });
  }

  destroyPreloader() {
    this.element.parentNode?.removeChild(this.element);
    this.dispatchEvent(new Event(PRELOADING_FINISHED_EVENT));
  }
}