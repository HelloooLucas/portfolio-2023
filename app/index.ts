import Home from "./pages/home";
import About from "./pages/about";
import Project from "./pages/project";
import { Template } from "./classes/page";

class App {
  // Adding the ! tells TS that this variable will get a value at runtime, so it doesn't force me to initialize it right away
  pages!: {
    home: Home;
    about: About;
    project: Project;
  };
  page!: Home | About | Project;
  content!: HTMLDivElement;
  template!: Template;

  init() {
    this.createContent();
    this.createPages();
  }

  createContent() {
    this.content = document.querySelector(".content") as HTMLDivElement;
    this.template = this.content.dataset.template as Template;
  }

  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      project: new Project(),
    };

    this.page = this.pages[this.template];

    this.page.create();
  }
}

const app = new App();
app.init();
