import { ContextFill, ContextStroke, Transform } from '../context'; 
import { saveContext } from '../util';
import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOption, TRANSFORM_OPTION, Point2D,
  transformPoint2D,
  getPointFromEvent,
} from 'web-util-kit';


const ROTATE_CONTROL_LENGTH_RATIO = 0.1;

export class ShapeBase {

  type: string = 'shape-base';

  // dimensions of the shape
  left: number = 0;
  top: number = 0;
  width: number = 0;
  height: number = 0;
  centerXRatio: number = 0.5;
  centerYRatio: number = 0.5;



  // drawing style
  lineWidth: number = 2;
  strokeWidth: number = 2;
  fillStyle: string = 'red';
  strokeStyle: string = 'green';
  



  fill: ContextFill = new ContextFill();
  stroke: ContextStroke = new ContextStroke();
  path2D: Path2D = new Path2D();

  transform: Transform = new Transform();
  


  active: boolean = false;
  moving: boolean = false;



  // controller points
  control: any = {
    mtr: new Point2D(),
    mt: new Point2D(),
    tl: new Point2D(),
    ml: new Point2D(),
    bl: new Point2D(),
    mb: new Point2D(),
    br: new Point2D(),
    mr: new Point2D(),
    tr: new Point2D(),
  }


  constructor() {
    console.log(this);
  }
  


  // TODO calculate real dimension: left, top, width, height
  calcDimensions() { } 


  calcControls() {
    this.transform.translateX = this.left + this.width * this.centerXRatio;
    this.transform.translateY = this.top + this.height * this.centerYRatio;
    this.control.tl.setXY(this.left, this.top);
    this.control.mt.setXY(this.left + this.width / 2, this.top);
    this.control.tr.setXY(this.left + this.width, this.top);
    this.control.mr.setXY(this.left + this.width, this.top + this.height / 2);
    this.control.br.setXY(this.left + this.width, this.top + this.height);
    this.control.mb.setXY(this.left + this.width / 2, this.top + this.height);
    this.control.bl.setXY(this.left, this.top + this.height);
    this.control.ml.setXY(this.left, this.top + this.height / 2);
    this.control.mtr.setXY(this.left + this.width / 2, this.top - this.height * ROTATE_CONTROL_LENGTH_RATIO);
  }


  set(key: string, val: any): void;   
  set(options: object): void;
  set(arg1: any, arg2?: any): void {
    if (typeof arg1 === 'string') {
      // TODO 1: limit valid properties

      (this as any)[arg1] = arg2;

      return;
    }

    if (arg1 && typeof arg1 === 'object') {
      // TODO set 
      Object.keys(arg1).forEach((propname: string) => {
        // TODO 1: limit valid properties

        (this as any)[propname] = arg1[propname];
      })

      return;
    }

  }

  



  @saveContext()
  render(ctx: CanvasRenderingContext2D, vpt: Transform) {}



  @saveContext()
  renderControls(ctx: CanvasRenderingContext2D, vpt: Matrix2X3Array) {
    
    if (!this.active) {
      return;
    }

    ctx.strokeStyle = 'blue';
    ctx.setLineDash([4,4]);
    ctx.strokeRect(
      this.left - this.transform.translateX, 
      this.top - this.transform.translateY,
      this.width,
      this.height
    );
    ctx.beginPath();
    ctx.moveTo(
      this.control.mt.x - this.transform.translateX, 
      this.control.mt.y - this.transform.translateY
    );
    ctx.lineTo(
      this.control.mtr.x - this.transform.translateX,
      this.control.mtr.y - this.transform.translateY,
    );
    ctx.stroke();
    
    ctx.fillStyle = 'red';
    Object.keys(this.control).forEach((name: string) => {
      ctx.beginPath();
      ctx.arc(
        this.control[name].x - this.transform.translateX, 
        this.control[name].y - this.transform.translateY, 
        10, 0, Math.PI * 2
      );
      ctx.fill();
    })

    
    

  }


  @saveContext()
  isPointInPath(ctx: CanvasRenderingContext2D, point: any) {
    if (ctx.isPointInPath(this.path2D, point.x, point.y)) {
      return true;
    }
    return false;
  }





}

