interface ComponentProps {
  block: HTMLAnchorElement;
}

export default class HomeProjectBlock {
  block: HTMLAnchorElement;
  onMouseEnterBound: () => void;
  onMouseLeaveBound: () => void;

  constructor({ block }: ComponentProps) {
    this.block = block;
    this.onMouseEnterBound = this.onMouseEnter.bind(this);
    this.onMouseLeaveBound = this.onMouseLeave.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    this.block.addEventListener("mouseenter", this.onMouseEnterBound);
    this.block.addEventListener("mouseleave", this.onMouseLeaveBound);
  }

  removeEventListeners() {
    this.block.removeEventListener("mouseenter", this.onMouseEnterBound);
    this.block.removeEventListener("mouseleave", this.onMouseLeaveBound);
  }

  // For those two methods I could use arrow functions
  // Because 'this" is resolved lexically and remains a reference to the class, not to the event listener context
  // Arrow function methods are not ideal in classes instantiated numerous times, because then the methods are not part of the prototype, they become properties
  // And are thus created anew for each class instance, which is very unefficient in terms of memory
  // On the contrary, methods declared with traditional function syntax are made part of the prototype
  // And reused across all class instances, which is way more efficient
  // ===================
  // Also, the fact that I had to pass this.onMouseEnter.bind(this) to the add and remove event listeners
  // Actually caused that I was passing different instances of the function to the listeners
  // And since the functions passed to add and removeListeners were different, listeners were not correctly matched and not removed
  // This is why I created onMouseEnterBound and onMouseEnterLeave, so the callbacks passed to add and remove event listeners are pointing to the same function isntance
  // I chose not to use arrow functions for a matter of consistency in the code
  onMouseEnter() {
    console.log("enter");
  }

  onMouseLeave() {
    console.log("leave");
  }
}
