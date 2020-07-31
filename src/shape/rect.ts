import { ShapeBase } from './shape-base';
import { saveContext, setPropertyMapping } from '../util';


export class Rect extends ShapeBase {

  readonly type: string = 'rect';

  // shape defined in svg element
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  // border-radius
  rx: number = 0;
  ry: number = 0;


  constructor(options: any) {
    super(options);
    // setPropertyMapping(this, 'x', 'left');
    // setPropertyMapping(this, 'y', 'top');

    super.set(options);
  }

  // from geom shape to dimensions
  calcDimensions() {
    
  }

  @saveContext()
  render(ctx: CanvasRenderingContext2D, vpt: any)  { 
    this.path2D = new Path2D();
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


