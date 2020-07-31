import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOptions, TRANSFORM_OPTIONS, Point2D,
  transformPoint2D,
  getPointFromEvent,
} from 'web-util-kit';
import { saveContext, MTR_LENGTH} from '../util';
import { Rect } from './rect';



// use left/top/width/height to do image scale


export class Source extends Rect{

  type: string = 'source';

  originalWidth: number = 0;
  originalHeight: number = 0;

  source: HTMLImageElement | HTMLCanvasElement;

  constructor(options?: any) {
    super(options);
    super.set(options);
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
      0,
      0,
      this.originalWidth,
      this.originalHeight,
      this.left - this.translateX, 
      this.top - this.translateY,
      this.width,
      this.height,
    );

    this.path2D = new Path2D();

    this.path2D.rect(
      this.left - this.translateX, 
      this.top - this.translateY,
      this.width,
      this.height,
    );
  }


  scaleToControlPoint(pointType: string, pointer: Point2D,  lastPointer: Point2D, lastDims: any) {
    super.scaleToControlPoint(pointType, pointer,  lastPointer, lastDims);

    // this.scaleX = this.width / this.originalWidth;
    // this.scaleY = this.height / this.originalHeight;

    // console.log(this.scaleX, this.width, this.originalWidth);

    // this.width = this.originalWidth;
    
    // this.height = this.originalHeight;

    // console.log(this.scaleX, this.width, this.originalWidth);



  }



}



