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
    // this.addLinkListeners();
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
    // this.page.show();
  }

  async handlePageChange(url: string) {
    try {
      const request = await fetch(url);
      const html = await request.text();
      const div = document.createElement("div");
      div.innerHTML = html;
      const divContent = div.querySelector(".content") as HTMLDivElement;
      this.content.innerHTML = divContent.innerHTML;
    } catch (error) {
      console.log("Fetching page in link listener failed: ", error);
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      link.onclick = event => {
        event.preventDefault();

        this.handlePageChange(link.href);
      };
    });
  }
}

const app = new App();
app.init();
