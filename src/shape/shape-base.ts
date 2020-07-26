import { ContextFill, ContextStroke } from '../context'; 
import { 
  saveContext, setPropertyMapping, radianToDegree, degreeToRadian, 
  bindComputedProperty,
} from '../util';
import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOption, TRANSFORM_OPTION, Point2D,
  transformPoint2D, invertMatrix2X3, calcRotateMatrix2X3, rotateVector2D,
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
  fillStyle: string = 'blue';
  strokeStyle: string = 'yellow';
  



  fill: ContextFill = new ContextFill();
  stroke: ContextStroke = new ContextStroke();
  path2D: Path2D = new Path2D();


  // transform
  // 角度单位
  public angle: number = 0;
  public skewX: number = 0;
  public skewY: number = 0;
  // 弧度单位
  private _angle: number = 0;
  private _skewX: number = 0;
  private _skewY: number = 0;

  private _scaleX: number = 1;
  private _scaleY: number = 1;

  // translateX: number = 0;
  // translateY: number = 0;
  flipX: boolean = false;
  flipY: boolean = false;

  set scaleX(val: number) {
    if (val < 0) {
      return;
    }
    this._scaleX = val;
  }

  get scaleX() {
    return this._scaleX;
  }

  set scaleY(val: number) {
    if (val < 0) {
      return;
    }
    this._scaleY = val;
  }

  get scaleY() {
    return this._scaleY;
  }




  get translateX() {
    return this.left + this.width * this.centerXRatio;
  }

  get translateY() {
    return this.top + this.height * this.centerYRatio;
  }






  active: boolean = false;



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


    setPropertyMapping(this, 'angle', '_angle', radianToDegree, degreeToRadian);
    setPropertyMapping(this, 'skewX', '_skewX', radianToDegree, degreeToRadian);
    setPropertyMapping(this, 'skewY', '_skewY', radianToDegree, degreeToRadian);


    // debugger;
    // bindComputedProperty(
    //   this, 
    //   'translateX', 
    //   ['left', 'width', 'centerXRatio'], 
    //   (left: number, width: number, centerXRatio: number) => left + width * centerXRatio
    // )
    
  }


  getOptions(): TRANSFORM_OPTION {
    return {
      angle: this.angle,
      skewX: this.skewX,
      skewY: this.skewY,
      scaleX: this.scaleX,
      scaleY: this.scaleY,
      flipX: this.flipX,
      flipY: this.flipY,
      translateX: this.translateX,
      translateY: this.translateY,
    };
  }


  getTransformMatrix2X3Array(): Matrix2X3Array {
    return composeMatrix2X3({
      angle: this._angle,
      skewX: this._skewX,
      skewY: this._skewY,
      scaleX: this.scaleX,
      scaleY: this.scaleY,
      flipX: this.flipX,
      flipY: this.flipY,
      translateX: this.translateX,
      translateY: this.translateY,
    });
  }
  


  // TODO calculate real dimension: left, top, width, height
  calcDimensions() { } 


  calcControls() {
    this.control.tl.setXY(
      this.left , 
      this.top ,
    );
    this.control.mt.setXY(
      this.left + this.width / 2 , 
      this.top ,
    );
    this.control.tr.setXY(
      this.left + this.width , 
      this.top 
    );
    this.control.mr.setXY(
      this.left + this.width , 
      this.top + this.height / 2 
    );
    this.control.br.setXY(
      this.left + this.width , 
      this.top + this.height 
    );
    this.control.mb.setXY(
      this.left + this.width / 2 , 
      this.top + this.height 
    );
    this.control.bl.setXY(
      this.left , 
      this.top + this.height 
    );
    this.control.ml.setXY(
      this.left , 
      this.top + this.height / 2 
    );
    this.control.mtr.setXY(
      this.left + this.width / 2 , 
      this.top - this.height * ROTATE_CONTROL_LENGTH_RATIO 
    );
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
  render(ctx: CanvasRenderingContext2D, vpt: any) {}



  @saveContext()
  renderControls(ctx: CanvasRenderingContext2D, vpt: Matrix2X3Array) {
    
    if (!this.active) {
      return;
    }

    ctx.strokeStyle = 'blue';
    ctx.setLineDash([4,4]);
    ctx.strokeRect(
      this.left - this.translateX, 
      this.top - this.translateY,
      this.width,
      this.height
    );
    ctx.beginPath();
    ctx.moveTo(
      this.control.mt.x - this.translateX,
      this.control.mt.y - this.translateY,
    );
    ctx.lineTo(
      this.control.mtr.x - this.translateX,
      this.control.mtr.y - this.translateY,
    );
    ctx.stroke();
    
    ctx.fillStyle = 'red';
    Object.keys(this.control).forEach((name: string) => {
      ctx.beginPath();
      ctx.arc(
        this.control[name].x - this.translateX,
        this.control[name].y - this.translateY,
        6, 0, Math.PI * 2
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


  rotate(angle: number) {
    this.angle = angle;
  }

  move(x: number, y: number) {
    this.left = x;
    this.top = y;
  }

  scaleToPoint(pointer: Point2D, type: string, lastPointer: Point2D, lastDims: any) {
    

    pointer = rotateVector2D(
      pointer.sub(new Point2D(this.translateX, this.translateY)), 
      -this._angle
    );

    lastPointer = rotateVector2D(
      lastPointer.sub(new Point2D(this.translateX, this.translateY)), 
      -this._angle
    );

    const xDiff = pointer.x - lastPointer.x;
    const yDiff = pointer.y - lastPointer.y;

    
    if (type === 'tl') {
      this.left =  pointer.x + this.translateX;
      this.top = pointer.y + this.translateY;
      this.width = lastDims.width - xDiff;
      this.height = lastDims.height - yDiff;
    } else if ( type === 'tr') {
      this.left = pointer.x + this.translateX - this.width;
      this.top =  pointer.y + this.translateY;
      this.width = lastDims.width + xDiff;
      this.height = lastDims.height - yDiff;
    } else if ( type === 'bl') {
      this.left = pointer.x + this.translateX;
      this.top =  pointer.y + this.translateY - this.height;
      this.width = lastDims.width - xDiff;
      this.height = lastDims.height + yDiff;
    } else if ( type === 'br') {
      this.left = pointer.x + this.translateX - this.width;
      this.top =  pointer.y + this.translateY - this.height;
      this.width = lastDims.width + xDiff;
      this.height = lastDims.height + yDiff;
    }

    

    


    


  }


  findControlCorner(pointer: Point2D) {
    const names = Object.keys(this.control);
    let controlPoint, name;

    for (let i = 0; i < names.length; i++) {
      controlPoint = this.control[names[i]]; 
      controlPoint = transformPoint2D(
        controlPoint.subSelf(new Point2D(this.translateX, this.translateY)), 
        this.getTransformMatrix2X3Array()
      );
      
      if (pointer.distanceFrom(controlPoint) < 10 ) {
        name = names[i];
        break;
      }
    }

    return name;
    
  }





}

