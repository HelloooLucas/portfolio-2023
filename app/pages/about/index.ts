import Page from "../../classes/page";

/*
 * INFO
 * Each individual page then implements methods specific to its needs such as animating different elements, depending on what's been queryed
 */

// interface AboutProps {
// }

export default class About extends Page {
  constructor() {
    super({
      id: "about",
      selector: ".about-wrapper",
      selectorChildren: {
        navigation: "nav",
        headerImage: ".header__image",
        title: ".title",
        text1: ".text-1",
        text2: ".text-2",
        awardsTitle: ".awards__title",
        awardsLines: ".awards__line",
        footer: "footer",
      },
    });
  }
}
