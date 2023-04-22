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
      id: "home",
      selector: ".home-wrapper",
      selectorChildren: {
        navigation: "nav",
        topSectionTexts: ".top-section > p",
        projectBlockImages: ".project__block__image",
        projectBlockNames: ".project__block__name",
        footer: "footer",
      },
    });
  }

  create() {
    super.create();

    if (this.elements?.topSectionTexts instanceof NodeList) {
      this.elements.topSectionTexts.forEach(el =>
        el.addEventListener("click", () => {
          console.log("You clicked me!");
        })
      );
    }
  }
}
