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
        text1: ".text-1",
        text2: ".text-2",
        media1: ".media-1",
        media2: ".media-2",
        media3: ".media-3",
        text3: ".text-3",
        middleTitle: ".middle-title",
        media4: ".media-4",
        media5: ".media-5",
        media6: ".media-6",
        text4: ".text-4",
      },
    });
  }
}
