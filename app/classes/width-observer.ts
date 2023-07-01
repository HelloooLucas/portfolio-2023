interface WidthObserverProps {
  matches: string;
  handleChange: () => void;
}

export default class WidthObserver {
  match: MediaQueryList;
  boundEventListener: () => void;

  constructor({ matches, handleChange }: WidthObserverProps) {
    this.match = window.matchMedia(matches);
    this.boundEventListener = handleChange.bind(this);

    this.addEventListeners();
  }

  matches() {
    return this.match.matches;
  }

  addEventListeners() {
    this.match.addEventListener("change", this.boundEventListener);
  }

  removeEventListeners() {
    this.match.removeEventListener("change", this.boundEventListener);
  }
}
