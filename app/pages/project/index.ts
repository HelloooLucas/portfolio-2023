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
      selector: ".project-wrapper",
      selectorChildren: {
        navigation: "nav",
        headerImage: ".header__image",
        headerInfo: ".header__info",
        title: ".title",
        texts: ".text-1, .text-2, .text-3, .text-4",
        media: ".media-1, .media-2, .media-3, .media-4, .media-5, .media-6",
        middleTitle: ".middle-title",
      },
    });
  }
}
