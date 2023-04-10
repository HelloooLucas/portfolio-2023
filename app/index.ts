interface CalculateParams {
  minWidth?: number;
  maxWidth?: number;
  minFontSize: number;
  maxFontSize: number;
}

function calculate({
  minWidth = 340,
  maxWidth = 1024,
  minFontSize,
  maxFontSize,
}: CalculateParams) {
  const minWidthInRem = minWidth / 16;
  const maxWidthInRem = maxWidth / 16;

  const minFontSizeInRem = minFontSize / 16;
  const maxFontSizeInRem = maxFontSize / 16;

  const slope =
    (maxFontSizeInRem - minFontSizeInRem) / (maxWidthInRem - minWidthInRem);
  const yAxisIntersection = -minWidthInRem * slope + minFontSizeInRem;

  const preferredValue = `${yAxisIntersection.toFixed(3)}rem + ${(
    slope * 100
  ).toFixed(3)}vw`;

  console.log({ preferredValue });
}

calculate({
  minFontSize: 40,
  maxFontSize: 130,
});

// Remove when I actually import something in here
export {};
