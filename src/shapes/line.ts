import { ShapeBase } from './shape-base';
import { saveContext, safeMixins, hasDimsProp } from '../util';


export class Line extends ShapeBase {

  type: string = 'line';

  x1: number = 0;
  y1: number = 0;

  x2: number = 0;
  y2: number = 0;

  constructor(options: any) {
    super(options);
    safeMixins(this, options);
    this.normalize(options); 
  }

  // dimension change --> shape change
  calcShape() {
    console.log(this.left, this.top);
  }

  // shape change --> dimension change
  // TODO calculate real dimension: left, top, width, height
  calcDimensions() {


  }

  @saveContext()
  render(ctx: CanvasRenderingContext2D, vpt: any)  { 
    this.path2D.rect(
      this.left - this.translateX, 
      this.top - this.translateY,
      this.width,
      this.height,
    );
    ctx.fill(this.path2D);
    ctx.stroke(this.path2D);
  }


}

