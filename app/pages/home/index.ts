import Page from "../../classes/page";

/*
 * INFO
 * Each individual page implements methods specific to its needs such as animating different elements
 * It can do so thanks to what the Page has already queried
 */

// interface HomeProps {
// }

export default class Home extends Page {
  constructor() {
    super({
      selector: ".home",
      selectorChildren: {
        navigation: "nav",
        content: ".content",
        topSectionTexts: ".home__top-section > p",
        projectBlockImages: ".home__project__block__image",
        projectBlockNames: ".home__project__block__name",
        footer: "footer",
      },
    });
  }

  create() {
    super.create();
  }
}
