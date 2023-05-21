interface BackgroundLoadProps {
  images: HTMLImageElement[];
}

// TODO: see if I can find a better name?
export default class BackgroundLoad {
  loadedLength: number;
  images: HTMLImageElement[];

  constructor({ images }: BackgroundLoadProps) {
    this.images = images;
    this.loadedLength = 0;
  }

  async loadImageAssets() {
    // TODO: investigate this other "Promise.resolve()" syntax I saw somewhere else
    return new Promise<void>(resolve => {
      this.images.forEach(img => {
        img.src = img.getAttribute("data-src") as string;
        img.onload = () => this.imageAssetLoaded(resolve);
      });
    });
  }

  imageAssetLoaded(resolve: () => void) {
    this.loadedLength += 1;

    if (this.loadedLength === this.images.length) {
      resolve();
    }
  }
}
