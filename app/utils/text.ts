export default function splitIntoLines(element: HTMLElement) {
  const lines = element.innerHTML.split("<br>");

  let innerHTML = "";

  lines.forEach(line => {
    innerHTML += `
      <span class="line-wrapper">
        <span class="line">
          ${line.trim()}
        </span>
      </span>`;
  });

  element.innerHTML = innerHTML;

  const innerSpans = [
    ...element.querySelectorAll("span > span"),
  ] as HTMLSpanElement[];

  return innerSpans;
}
