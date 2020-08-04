import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOptions, TRANSFORM_OPTIONS, Point2D,
  transformPoint2D, invertMatrix2X3, isTransparent, 
  getPointFromEvent,
} from 'web-util-kit';
import { Source } from './source';



export class ImageShape extends Source {

  async loadFromImage(source: HTMLImageElement | string) {
    let image: HTMLImageElement;
    if (source && typeof source === 'string') {
      image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = source;
    } else if (source instanceof HTMLImageElement) {
      image = source;
    } else {
      throw new Error('failed to loadFromImage: ' + source);
    }
    this.source = await loadFromImage(image);
    this.width = this.source.width;
    this.height = this.source.height;
    this.originalWidth = this.source.width;
    this.originalHeight = this.source.height;
    this._cacheCanvas.width = this.source.width;
    this._cacheCanvas.height = this.source.height;
    this._cacheCtx.drawImage(this.source, 0, 0);
  }

  loadFromCanvas(canvas: HTMLCanvasElement) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('failed to loadFromCanvas: ' + canvas);
    }
    this.source = canvas;
    this.width = this.source.width;
    this.height = this.source.height;
    this.originalWidth = this.source.width;
    this.originalHeight = this.source.height;
    this._cacheCanvas = canvas;
    this._cacheCtx = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (!this._cacheCtx) {
      throw new Error('can not get 2d context from canvas of loadFromCanvas' + canvas);
    }
  }


}

