import Page from "../../classes/page";

/*
 * INFO
 * Each individual page then implements methods specific to its needs such as animating different elements, depending on what's been queryed
 */

export default class About extends Page {
  constructor() {
    super({
      selector: ".about",
      selectorChildren: {
        // navigation: "nav",
        content: ".content",
        headerImage: ".about__header__image",
        // TODO: remove this?
        // title: ".about__title",
        animationsTitles: ".about__title",
        // texts: ".about__text-1, .about__text-2",
        animationsTexts: ".about__text-1, .about__text-2",
        awardsTitle: ".about__awards__title",
        awardsLines: ".about__awards__line",
        footer: "footer",
      },
    });
  }
}
