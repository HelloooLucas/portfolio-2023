import Home from "./pages/home";
import About from "./pages/about";
import Project from "./pages/project";
import { Template } from "./classes/page";
import { ProjectName } from "./utils/colors";
import Preloader, { PRELOADING_FINISHED_EVENT } from "./components/preloader";
import Navigation from "./components/navigation";

class App {
  // Adding the ! tells TS that this variable will get a value at runtime, so it doesn't force me to initialize it right away
  pages!: {
    home: Home;
    about: About;
    project: Project;
  };
  page!: Home | About | Project;
  content!: HTMLDivElement;
  pageTitle!: HTMLTitleElement;
  template!: Template;
  project?: ProjectName;
  preloader!: Preloader;
  navigation!: Navigation;

  init() {
    this.createPreloader();
    this.createContent();
    this.createNavigation();
    this.createPages();

    this.page.addResizeListener();
    this.addLinkListeners();
    this.addPopStateListener();

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
    this.navigation.show();
    this.page.show();
  }

  createNavigation() {
    this.navigation = new Navigation({ template: this.template });
  }

  createContent() {
    this.pageTitle = document.querySelector("head > title") as HTMLTitleElement;
    this.content = document.querySelector(".content") as HTMLDivElement;
    this.template = this.content.dataset.template as Template;
    if (this.template === "project") {
      this.project = this.content.dataset.project as ProjectName;
    }
  }

  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      project: new Project(),
    };

    this.page = this.pages[this.template];
    // TODO: this way of detecting the page and applying colors is overkill and not elegant
    // Find something else
    // Maybe directly in css with data-project?
    if (this.page instanceof Project && this.project) {
      this.page.setProjectName(this.project);
    }

    this.page.init();
  }

  async handlePageChange({
    url,
    forwards = true,
  }: {
    url: string;
    forwards?: boolean;
  }) {
    await this.page.hide();

    try {
      const parser = new DOMParser();

      const nextPage = await fetch(url);
      const nextPageText = await nextPage.text();
      const nextPageHtml = parser.parseFromString(nextPageText, "text/html");

      const nextPageTitle = nextPageHtml.querySelector(
        "head > title"
      ) as HTMLTitleElement;

      const nextPageContentDiv = nextPageHtml.querySelector(
        ".content"
      ) as HTMLDivElement;

      this.template = nextPageContentDiv.getAttribute(
        "data-template"
      ) as Template;

      if (forwards) {
        window.history.pushState({}, "", url);
      }
      this.navigation.onPageChange(this.template);
      this.pageTitle.innerHTML = nextPageTitle.innerHTML;

      this.content.innerHTML = nextPageContentDiv.innerHTML;
      this.content.setAttribute("data-template", this.template);

      this.page = this.pages[this.template];
      this.page.handleChange();

      this.addLinkListeners();
      this.addPopStateListener();
    } catch (error) {
      console.log("Fetching page in link listener failed: ", error);
    }
  }

  onPopState() {
    this.handlePageChange({ url: window.location.pathname, forwards: false });
  }

  // TODO: add a removePopStateListener?
  addPopStateListener() {
    window.addEventListener("popstate", this.onPopState.bind(this));
  }

  // TODO: add a removeLinkListeners?
  addLinkListeners() {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      link.onclick = event => {
        event.preventDefault();
        this.handlePageChange({ url: link.href });
      };
    });
  }

  update() {
    this.page.update();

    window.requestAnimationFrame(this.update.bind(this));
  }
}

const app = new App();
app.init();
