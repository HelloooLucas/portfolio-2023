interface ObserverProps {
  element: HTMLElement;
}

export default class Observer {
  element: HTMLElement;
  observer!: IntersectionObserver;

  constructor({ element }: ObserverProps) {
    this.element = element;

    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIn();
        } else {
          const { top, bottom } = entry.boundingClientRect;

          // If element exits from top, don't reset animations
          if (bottom < 0) return;

          // If element not fully on screen, don't reset before it animates in
          if (top < window.innerHeight && bottom > window.innerHeight) return;

          this.resetAnimations();
        }
      });
    });

    this.observer.observe(this.element);
  }

  // TODO: see how I can make this look better
  // Not fan of just declaring it there, I'd like it to be intentional
  animateIn() {}

  resetAnimations() {}

  unobserve() {
    this.observer.unobserve(this.element);
  }
}

/**
 * ANIMATION CREATION PATTERN
 * Page class passes selectors for nodes to animate to Component class
 * Component class detects the animation nodes and stores them into "this.elements.animationsXxxx" keys
 * Then Page and Home/About/Project loop over those and creates separate instances of Titles, Paragraphs, Images for each node of each type to animate
 */
