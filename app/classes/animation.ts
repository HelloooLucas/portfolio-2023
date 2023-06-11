export interface AnimationProps {
  element: HTMLElement;
}

export default class Animation {
  element: HTMLElement;
  observer!: IntersectionObserver;

  constructor({ element }: AnimationProps) {
    this.element = element;

    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If element enters from top, don't animate in
          const { top } = entry.boundingClientRect;
          if (top < 0) return;

          this.animateIn();
        } else {
          // If element exits from top, don't animate out
          const { bottom } = entry.boundingClientRect;
          if (bottom < 0) return;

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
}

/**
 * ANIMATION CREATION PATTERN
 * Page class passes selectors for nodes to animate to Component class
 * Component class detects the animation nodes and stores them into "this.elements.animationsXxxx" keys
 * Then Page and Home/About/Project loop over those and creates separate instances of Titles, Paragraphs, Images for each node of each type to animate
 */
