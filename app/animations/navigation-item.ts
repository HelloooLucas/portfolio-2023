import gsap from "gsap";
import prepareNavItem from "../utils/nav-items";

interface NavigationItemParams {
  element: HTMLDivElement;
}

export default class NavigationItem {
  link: HTMLAnchorElement;
  navItems: HTMLSpanElement[][];
  timeline: gsap.core.Timeline;

  constructor({ element }: NavigationItemParams) {
    this.link = element.querySelector("a") as HTMLAnchorElement;
    this.navItems = prepareNavItem(element);
    this.timeline = gsap.timeline({ paused: true });

    this.setAnimations();

    if (window.innerWidth >= 768) {
      this.setEventListeners();
    }
  }

  show() {
    return this.timeline.play();
  }

  hide() {
    return this.timeline.reverse();
  }

  setEventListeners() {
    this.link.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
    this.link.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
  }

  handleMouseEnter() {
    this.navItems.forEach(item => {
      gsap.to(item, {
        y: "-100%",
        stagger: 0.05,
      });
    });
  }

  handleMouseLeave() {
    this.navItems.forEach(item => {
      gsap.to(item, {
        y: 0,
        stagger: 0.05,
      });
    });
  }

  setAnimations() {
    this.timeline.from(this.link, {
      y: "100%",
    });
  }
}
