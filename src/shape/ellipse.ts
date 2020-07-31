import { ShapeBase } from './shape-base';
import { saveContext } from '../util';
import { Point2D } from 'web-util-kit';


export class Ellipse extends ShapeBase {


  type: string = 'ellipse';


  cx: number = 0;
  cy: number = 0;
  rx: number = 0;
  ry: number = 0;


  fillStyle: string = 'rgba(0,0,0,0.3)';


  constructor(options?: any) {
    super(options);
    super.set(options);
  }


  calcDimensions() {
    this.width = this.rx * 2;
    this.height = this.ry * 2;
    this.left = this.cx - this.rx;
    this.top = this.cy - this.ry;
  }


  move(x: number, y: number) {
    const diff = new Point2D(x, y).subSelf(new Point2D(this.left, this.top));
    this.cx += diff.x;
    this.cy += diff.y;
    this.left = x;
    this.top = y;
  }

  scaleToControlPoint(pointType: string, pointer: Point2D,  lastPointer: Point2D, lastDims: any) {
    super.scaleToControlPoint(pointType, pointer, lastPointer, lastDims);
    this.cx = this.left + this.width / 2;
    this.cy = this.top + this.height / 2;
    this.rx = this.width / 2;
    this.ry = this.height / 2;
  }




  @saveContext()
  render(ctx: CanvasRenderingContext2D, vpt: any)  { 
    this.path2D = new Path2D();
    this.path2D.ellipse(
      this.cx - this.translateX,
      this.cy - this.translateY,
      this.rx,
      this.ry,
      0,
      0,
      Math.PI * 2,
    );
    
    ctx.stroke(this.path2D);
    ctx.fill(this.path2D);
  }


}

