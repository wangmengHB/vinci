import { ShapeBase } from './shape-base';
import { saveContext, safeMixins, hasDimsProp } from '../util';


export class Rect extends ShapeBase {

  readonly type: string = 'rect';

  // shape defined in svg specification
  set x(val: number) {
    this.left = val;
  }

  get x() {
    return this.left;
  }

  set y(val: number) {
    this.top = val;
  }

  get y() {
    return this.top;
  }

  // border-radius
  rx: number = 0;
  ry: number = 0;


  constructor(options?: any) {
    super(options);
    safeMixins(this, options);
    // 以 dimension 的属性优先，以此为基准计算 shape
    this.normalize(options);
  }

  // dimension change --> shape change
  calcShape() {}

  // shape change --> dimension change
  // TODO calculate real dimension: left, top, width, height
  calcDimensions() {}

  
  @saveContext()
  render(ctx: CanvasRenderingContext2D, vpt: any)  { 
    this.path2D = new Path2D();
    this.path2D.rect(
      this.x - this.translateX, 
      this.y - this.translateY,
      this.width,
      this.height,
    );
    ctx.fill(this.path2D);
    ctx.stroke(this.path2D);
  }




  
}



