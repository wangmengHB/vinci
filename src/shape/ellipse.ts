import { ShapeBase } from './shape-base';
import { saveContext, safeMixins, hasDimsProp } from '../util';
import { Point2D } from 'web-util-kit';


export class Ellipse extends ShapeBase {

  type: string = 'ellipse';

  // shape params: it defines the shape
  cx: number = 0;
  cy: number = 0;
  rx: number = 0;
  ry: number = 0;


  fillStyle: string = 'rgba(0,0,0,0.3)';


  constructor(options: any) {
    super(options);
    safeMixins(this, options);
    this.normalize(options);
  }

  // dimension change --> shape change
  // from dimensions to shape 
  calcShape() {
    this.rx = this.width / 2;
    this.ry = this.height / 2;
    this.cx = this.left + this.rx;
    this.cy = this.top + this.ry;
  }

  // shape change --> dimension change
  // from shape to dimensions: left, top, width, height
  calcDimensions() {
    this.width = this.rx * 2;
    this.height = this.ry * 2;
    this.left = this.cx - this.rx;
    this.top = this.cy - this.ry;
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

