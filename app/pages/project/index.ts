import Page from "../../classes/page";

/*
 * INFO
 * Each individual page then implements methods specific to its needs such as animating different elements, depending on what's been queryed
 */

// interface ProjectProps {
// }

export default class Project extends Page {
  constructor() {
    super({
      id: "project",
      selector: ".project",
      selectorChildren: {
        navigation: "nav",
        headerImage: ".project__header__image",
        headerInfo: ".project__header__info",
        title: ".project__title",
        texts:
          ".project__text-1, .project__text-2, .project__text-3, .project__text-4",
        media:
          ".project__media-1, .project__media-2, .project__media-3, .project__media-4, .project__media-5, .project__media-6",
        middleTitle: ".project__middle-title",
        footer: "footer",
      },
    });
  }
}
