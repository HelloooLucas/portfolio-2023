export default function prepareNavItem(element: HTMLDivElement) {
  const link = element.querySelector("a") as HTMLAnchorElement;

  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.innerHTML = link.innerHTML
    .split("")
    .map(letter => {
      return `<span>${letter}</span>`;
    })
    .join("");

  link.innerHTML = "";
  link.appendChild(navItem);
  link.appendChild(navItem.cloneNode(true));

  const navItems = [
    ...element.querySelectorAll(".nav-item"),
  ] as HTMLDivElement[];

  return [...navItems.map(item => [...item.querySelectorAll("span")])];
}
