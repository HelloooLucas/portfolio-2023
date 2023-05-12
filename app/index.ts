import Home from "./pages/home";
import About from "./pages/about";
import Project from "./pages/project";
import { Template } from "./classes/page";
import Preloader, { PRELOADING_FINISHED_EVENT } from "./components/preloader";

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
  preloader!: Preloader;

  init() {
    this.createPreloader();
    this.createContent();
    this.createPages();

    this.addResizeListener();
    this.addLinkListeners();

    this.update();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.addEventListener(
      PRELOADING_FINISHED_EVENT,
      this.onPreloaded.bind(this)
    );
  }

  onPreloaded() {
    // Calling this here to be sure the height is calculated when all images are loaded
    this.page.onResize();
    this.page.show();
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

    this.page.detectDomNodes();
  }

  async handlePageChange(url: string) {
    await this.page.hide();

    try {
      const parser = new DOMParser();

      const nextPage = await fetch(url);
      const nextPageText = await nextPage.text();
      const nextPageHtml = parser.parseFromString(nextPageText, "text/html");
      const nextPageContentDiv = nextPageHtml.querySelector(
        ".content"
      ) as HTMLDivElement;

      this.template = nextPageContentDiv.getAttribute(
        "data-template"
      ) as Template;

      this.content.innerHTML = nextPageContentDiv.innerHTML;
      this.content.setAttribute("data-template", this.template);

      this.page = this.pages[this.template];

      // TODO: try to refactor the background thing so you can remove this conditional block
      const body = document.querySelector("body") as HTMLBodyElement;
      if (this.template === "about") {
        body.classList.add("about-body");
      } else {
        body.classList.remove("about-body");
      }

      this.page.detectDomNodes();
      // Calling it here too to account for new page's height
      this.page.onResize();
      this.page.show();

      this.addLinkListeners();
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

  addResizeListener() {
    // Here I'm binding the method to this.page
    // If I do only .bind(this), this.page.onResize's 'this' will refer to App and not to the page
    window.addEventListener("resize", this.page.onResize.bind(this.page));
  }

  update() {
    this.page.update();

    window.requestAnimationFrame(this.update.bind(this));
  }
}

const app = new App();
app.init();
