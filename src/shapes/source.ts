import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOptions, TRANSFORM_OPTIONS, Point2D,
  transformPoint2D, invertMatrix2X3, isTransparent, 
  getPointFromEvent,
} from 'web-util-kit';
import { saveContext, safeMixins, hasDimsProp } from '../util';
import { Rect } from './rect';


export class Source extends Rect{

  type: string = 'source';

  originalWidth: number = 0;
  originalHeight: number = 0;

  source: HTMLImageElement | HTMLCanvasElement;

  private _cacheCanvas: HTMLCanvasElement = document.createElement('canvas');
  private _cacheCtx: CanvasRenderingContext2D = this._cacheCanvas.getContext('2d') as CanvasRenderingContext2D;

  constructor(options?: any) {
    super(options);
    safeMixins(this, options);
    this.normalize(options);
  }


  async loadFromSource(source: HTMLImageElement | HTMLCanvasElement) {
    if (source instanceof HTMLImageElement) {
      this.source = await loadFromImage(source);
      this.width = this.source.width;
      this.height = this.source.height;
      this.originalWidth = this.source.width;
      this.originalHeight = this.source.height;
      this._cacheCanvas.width = this.source.width;
      this._cacheCanvas.height = this.source.height;
      this._cacheCtx.drawImage(this.source, 0, 0);
    }
    if (source instanceof HTMLCanvasElement) {
      this.source = source;
      this.width = this.source.width;
      this.height = this.source.height;
      this.originalWidth = this.source.width;
      this.originalHeight = this.source.height;
      this._cacheCanvas.width = this.source.width;
      this._cacheCanvas.height = this.source.height;
    }

  }


  @saveContext()
  render(ctx: CanvasRenderingContext2D, vpt: any)  {
    if (!this.source) {
      return;
    }

    ctx.drawImage(
      this._cacheCanvas, 
      0,
      0,
      this._cacheCanvas.width,
      this._cacheCanvas.height,
      this.x - this.translateX, 
      this.y - this.translateY,
      this.width,
      this.height,
    );

    this.path2D = new Path2D();

    this.path2D.rect(
      this.x - this.translateX, 
      this.y - this.translateY,
      this.width,
      this.height,
    );
  }


  @saveContext()
  isPointInPath(ctx: CanvasRenderingContext2D, point: any) {
    if (!ctx.isPointInPath(this.path2D, point.x, point.y)) {
      return false;
    }
    const inverseMatrix = invertMatrix2X3(this.getTransformMatrix2X3Array());
    const realPointer = transformPoint2D(
      point,
      inverseMatrix
    ).addSelf(new Point2D(this.translateX - this.x, this.translateY - this.y));
    if(isTransparent(this._cacheCtx, realPointer.x, realPointer.y, 1)) {
      return false
    }
    return true;
  }



}



