type OnTick = (percentage: number) => void;

interface ImagesLoaderProps {
  images: HTMLImageElement[];
  onTick?: OnTick;
}

export default class ImagesLoader {
  images: HTMLImageElement[];
  onTick?: OnTick;
  loadedLength: number;

  constructor({ images, onTick }: ImagesLoaderProps) {
    this.images = images;
    this.onTick = onTick;
    this.loadedLength = 0;
  }

  async loadImages() {
    return new Promise<void>(resolve => {
      this.images.forEach(img => {
        img.src = img.getAttribute("data-src") as string;
        img.onload = () => this.imageAssetLoaded(resolve);
      });
    });
  }

  imageAssetLoaded(resolve: () => void) {
    this.loadedLength += 1;
    this.onTick?.((this.loadedLength / this.images.length) * 100);

    if (this.loadedLength === this.images.length) {
      resolve();
    }
  }
}
