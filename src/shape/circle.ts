import { ShapeBase } from './shape-base';
import { saveContext, safeMixins, hasDimsProp } from '../util';

export class Circle extends ShapeBase {

  type: string = 'circle';
  
  cx: number = 0;
  cy: number = 0;
  r: number = 0;


  constructor(options: any) {
    super(options);
    safeMixins(this, options);
    // 以 dimension 的属性优先，以此为基准计算 shape
    this.normalize(options);  
  }

  // dimension change --> shape change
  calcShape() {
    console.log(this.left, this.top);
  }

  // shape change --> dimension change
  // TODO calculate real dimension: left, top, width, height
  calcDimensions() {
    this.left = this.cx - this.r;
    this.top = this.cy - this.r;
    this.width = this.r * 2;
    this.height = this.r * 2;
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