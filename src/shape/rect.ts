import { ShapeBase } from './shape-base';
import { saveContext, setPropertyMapping } from '../util';


export class Rect extends ShapeBase {

  type: string = 'rect';

  x: number = 0;
  y: number = 0;

  width: number = 0;
  height: number = 0;

  rx: number = 0;

  ry: number = 0;


  constructor() {
    super();


    setPropertyMapping(this, 'x', 'left');
    setPropertyMapping(this, 'y', 'top');
  }


  calcDimensions() {}

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


