import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOption, TRANSFORM_OPTION, Point2D,
  transformPoint2D,
  getPointFromEvent,
} from 'web-util-kit';
import { saveContext } from '../util';
import { Rect } from './rect';



export class Source extends Rect{

  type: string = 'source';


  originalWidth: number = 0;
  originalHeight: number = 0;

  source: HTMLImageElement | HTMLCanvasElement;



  constructor() {
    super();
  }


  async loadFromSource(source: HTMLImageElement | HTMLCanvasElement) {
    if (source instanceof HTMLImageElement) {
      this.source = await loadFromImage(source);
      this.width = this.source.width;
      this.height = this.source.height;
      this.originalWidth = this.source.width;
      this.originalHeight = this.source.height;
    }
    if (source instanceof HTMLCanvasElement) {
      this.source = source;
      this.width = this.source.width;
      this.height = this.source.height;
      this.originalWidth = this.source.width;
      this.originalHeight = this.source.height;
    }

  }


  @saveContext()
  render(ctx: CanvasRenderingContext2D, vpt: any)  {
    if (!this.source) {
      return;
    }

    ctx.drawImage(
      this.source, 
      this.left - this.translateX, 
      this.top - this.translateY,
    );

    this.path2D.rect(
      this.left - this.translateX, 
      this.top - this.translateY,
      this.width,
      this.height,
    );
  }

}



