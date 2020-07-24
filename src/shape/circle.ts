import { ShapeBase } from './shape-base';
import { saveContext, setPropertyMapping } from '../util';

export class Circle extends ShapeBase {

  type: string = 'circle';
  
  cx: number = 0;
  cy: number = 0;
  r: number = 0;

  // constructor() {
  //   super();

  //   setPropertyMapping(this, 'cx', 'left');
  //   setPropertyMapping(this, 'cy', 'top');
  //   setPropertyMapping(this, 'r', 'left');
    
  // }



  // @saveContext()
  // render(ctx: CanvasRenderingContext2D, vpt: any)  { 
  //   this.path2D.rect(
  //     this.left - this.transform.translateX, 
  //     this.top - this.transform.translateY,
  //     this.width,
  //     this.height,
  //   );
  //   ctx.fill(this.path2D);
  //   ctx.stroke(this.path2D);
  // }



}