import { gsap } from "gsap";

import { ProjectName } from "../types";
import getProjectColor from "../utils/colors";

const projectNames = {
  "sopra-banking-software": ["sopra", "banking"],
  "last-quest": ["last", "quest"],
  "solers-io": ["solers", "io"],
  "atelier-tote-bag": ["atelier", "tote bag"],
};

interface HomeProjectHoverAnimationProps {
  projects: HTMLElement[];
}

export default class HomeProjectHoverAnimation {
  projectBlocks: HTMLElement[];
  mainContainer!: HTMLDivElement;
  projectNameContainersMap: { [key: string]: HTMLDivElement };
  hoveredProjectLetters!: Element[] | null;
  timeline!: ReturnType<typeof gsap.timeline> | null;
  handleMouseEnterBound: (e: MouseEvent) => void;
  handleMouseLeaveBound: (e: MouseEvent) => void;

  constructor({ projects }: HomeProjectHoverAnimationProps) {
    this.projectBlocks = projects;
    this.projectNameContainersMap = {};

    this.handleMouseEnterBound = this.handleMouseEnter.bind(this);
    this.handleMouseLeaveBound = this.handleMouseLeave.bind(this);

    this.createDomNodes();
    this.detectDomNodes();

    this.setEventListeners();
  }

  handleMouseEnter(e: MouseEvent) {
    this.timeline = gsap.timeline();

    const target = e.target as HTMLDivElement;
    const projectName = target.dataset.project as ProjectName;
    const project = this.projectNameContainersMap[projectName];
    this.hoveredProjectLetters = [
      ...project.querySelectorAll(
        ".project-names__project__line__letter-container > div"
      ),
    ];

    this.timeline.to(this.hoveredProjectLetters, {
      x: 0,
      duration: 0.15,
      stagger: 0.02,
    });
  }

  handleMouseLeave() {
    this.timeline?.reverse();
    this.timeline = null;
  }

  hide() {
    this.removeEventListeners();

    return this.timeline?.reverse();
  }

  createDomNodes() {
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("project-names");

    Object.entries(projectNames).forEach(([projectName, [top, bottom]]) => {
      const projectContainer = document.createElement("div");
      const topLine = document.createElement("div");
      const bottomLine = document.createElement("div");

      projectContainer.classList.add("project-names__project");
      projectContainer.setAttribute("data-project", projectName);
      projectContainer.style.color = getProjectColor(
        projectName as ProjectName
      );
      topLine.classList.add("project-names__project__line", "grid");
      bottomLine.classList.add("project-names__project__line", "grid");

      // TODO: refactor/simplify this section?
      [...top].forEach((letter, i) => {
        const letterContainer = document.createElement("div");
        const letterItem = document.createElement("div");

        letterItem.innerHTML = letter;
        letterContainer.classList.add(
          "project-names__project__line__letter-container",
          `letter-${i + 1}`
        );
        letterContainer.appendChild(letterItem);

        topLine.appendChild(letterContainer);
      });

      [...bottom].forEach((letter, i) => {
        const letterContainer = document.createElement("div");
        const letterItem = document.createElement("div");

        letterItem.innerHTML = letter;
        letterContainer.classList.add(
          "project-names__project__line__letter-container",
          `letter-${i + 1}`
        );
        letterContainer.appendChild(letterItem);

        bottomLine.appendChild(letterContainer);
      });

      projectContainer.append(topLine, bottomLine);

      mainContainer.append(projectContainer);
    });

    document.body.appendChild(mainContainer);
    this.mainContainer = mainContainer;
  }

  detectDomNodes() {
    const projectContainers = [
      ...document.querySelectorAll(".project-names__project"),
    ] as HTMLDivElement[];

    projectContainers.forEach(project => {
      const projectName = project.dataset.project as ProjectName;
      this.projectNameContainersMap[projectName] = project;
    });
  }

  setEventListeners() {
    this.projectBlocks.forEach(project => {
      project.addEventListener("mouseenter", this.handleMouseEnterBound);
      project.addEventListener("mouseleave", this.handleMouseLeaveBound);
    });
  }

  removeEventListeners() {
    this.projectBlocks.forEach(project => {
      project.removeEventListener("mouseenter", this.handleMouseEnterBound);
      project.removeEventListener("mouseleave", this.handleMouseLeaveBound);
    });
  }

  destroy() {
    document.body.removeChild(this.mainContainer);
  }
}

// For handleMouseEnter and handleMouseLeave I could use arrow functions
// Because 'this" is resolved lexically and remains a reference to the class, not to the event listener context
// Arrow function methods are not ideal in classes instantiated numerous times, because then the methods are not part of the prototype, they become properties
// And are thus created anew for each class instance, which is very unefficient in terms of memory
// On the contrary, methods declared with traditional function syntax are made part of the prototype
// And reused across all class instances, which is way more efficient
// ===================
// Also, the fact that I had to pass this.onMouseEnter.bind(this) to the add and remove event listeners
// Actually caused that I was passing different instances of the function to the listeners
// And since the functions passed to add and removeListeners were different, listeners were not correctly matched and not removed
// This is why I created handleMouseEnterBound and handleMouseEnterLeave, so the callbacks passed to add and remove event listeners are pointing to the same function instance
// I chose not to use arrow functions for a matter of consistency in the code
