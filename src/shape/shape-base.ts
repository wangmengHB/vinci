import { 
  saveContext, setPropertyMapping, 
  bindComputedProperty, MTR_LENGTH,
} from '../util';
import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOptions, TRANSFORM_OPTIONS, Point2D,
  transformPoint2D, invertMatrix2X3, calcRotateMatrix2X3, rotateVector2D,
  getPointFromEvent, radianToDegree, degreeToRadian, 
} from 'web-util-kit';
import { Control, ControlPoint } from '../auxiliary/control';


const ROTATE_CONTROL_LENGTH_RATIO = 0.1;


export class ShapeBase {

  readonly type: string = 'shape-base';

  // dimensions of the shape
  left: number = 0;
  top: number = 0;
  private _width: number = 0;
  private _height: number = 0;
  

  set width(nextVal: number) {
    if (nextVal < 0) {
      return;
    }
    this._width = nextVal;
  }

  get width() { return this._width }

  set height(nextVal: number) {
    if (nextVal < 0) {
      return;
    }
    this._height = nextVal;
  }

  get height() { return this._height }

  // center point relative ratio
  private _centerXRatio: number = 0.5;
  private _centerYRatio: number = 0.5;

  set centerXRatio(nextVal: number) {
    if (nextVal < 0 || nextVal > 1) {
      return;
    }
    this._centerXRatio = nextVal;
  }

  get centerXRatio() { return this._centerXRatio }

  set centerYRatio(nextVal: number) {
    if (nextVal < 0 || nextVal > 1) {
      return;
    }
    this._centerYRatio = nextVal;
  }

  get centerYRatio() { return this._centerYRatio }

  // drawing style
  lineWidth: number = 2;
  strokeWidth: number = 2;
  fillStyle: string = 'blue';
  strokeStyle: string = 'yellow';
  // more style put here
  


  
  


  // transform
  // 角度单位
  public angle: number = 0;
  public skewX: number = 0;
  public skewY: number = 0;
  

  private _scaleX: number = 1;
  private _scaleY: number = 1;

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

  flipX: boolean = false;
  flipY: boolean = false;


  path2D: Path2D = new Path2D();

  active: boolean = false;



  // controll points 
  control: Control = new Control();
  


  constructor(options?: any ) {
    this.set(options);
  }

  set(key: string, val: any): void;   
  set(options?: object): void;
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


  getTransformOptions(): TRANSFORM_OPTIONS {
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
      angle: this.angle,
      skewX: this.skewX,
      skewY: this.skewY,
      scaleX: this.scaleX,
      scaleY: this.scaleY,
      flipX: this.flipX,
      flipY: this.flipY,
      translateX: this.translateX,
      translateY: this.translateY,
    });
  }
  
  // dimension change --> shape change
  calcShape() {}

  // shape change --> dimension change
  // TODO calculate real dimension: left, top, width, height
  calcDimensions() { } 


  calcControls() {
    this.control.calculate(this.width, this.height);
  }



  @saveContext()
  render(ctx: CanvasRenderingContext2D, vpt: any) {}



  @saveContext()
  renderControls(ctx: CanvasRenderingContext2D, vpt: Matrix2X3Array) {
    
    if (!this.active) {
      return;
    }

    // TODO check is control visible

    ctx.strokeStyle = 'blue';
    ctx.setLineDash([4,4]);
    ctx.strokeRect(
      this.left - this.translateX, 
      this.top - this.translateY,
      this.width,
      this.height
    );
    ctx.beginPath();


    const mt = this.control.getPoint('mt') as Point2D;
    const mtr = this.control.getPoint('mtr') as Point2D;

    ctx.moveTo(mt.x, mt.y);
    ctx.lineTo(mtr.x, mtr.y);
    ctx.stroke();
    
    ctx.fillStyle = 'red';
    this.control.getAllVisiblePoints().forEach((cp: ControlPoint) => {
      const point = cp.point;
      ctx.beginPath();
      ctx.arc(
        point.x,
        point.y,
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

  scaleToControlPoint(pointType: string, pointer: Point2D,  lastPointer: Point2D, lastDims: any) {

    const inverseMatrix = invertMatrix2X3(this.getTransformMatrix2X3Array());

    pointer = transformPoint2D(
      pointer,
      inverseMatrix
    );

    lastPointer = transformPoint2D(
      lastPointer,
      inverseMatrix
    );


    const diff = pointer.sub(lastPointer);

    
    
    if (pointType === 'tl') {
      this.left =  pointer.x + this.translateX;
      this.top = pointer.y + this.translateY;
      this.width = lastDims.width - diff.x;
      this.height = lastDims.height - diff.y;
    } else if ( pointType === 'tr') {
      this.left = pointer.x + this.translateX - this.width;
      this.top =  pointer.y + this.translateY;
      this.width = lastDims.width + diff.x;
      this.height = lastDims.height - diff.y;
    } else if ( pointType === 'bl') {
      this.left = pointer.x + this.translateX;
      this.top =  pointer.y + this.translateY - this.height;
      this.width = lastDims.width - diff.x;
      this.height = lastDims.height + diff.y;
    } else if ( pointType === 'br') {
      this.left = pointer.x + this.translateX - this.width;
      this.top =  pointer.y + this.translateY - this.height;
      this.width = lastDims.width + diff.x;
      this.height = lastDims.height + diff.y;
    } else if ( pointType === 'ml' ) {
      this.left =  pointer.x + this.translateX;
      this.width = lastDims.width - diff.x;   
    } else if ( pointType === 'mr') {
      this.width = lastDims.width + diff.x;
    } else if ( pointType === 'mt') {
      this.top =  pointer.y + this.translateY;
      this.height = lastDims.height - diff.y;
    } else if ( pointType === 'mb') {
      this.height = lastDims.height + diff.y;
    }

    // this.calcControls();

    

    
  }


  findControlCorner(pointer: Point2D) {
    return this.control.findType(pointer, this.getTransformMatrix2X3Array());
  }


  // TODO: layer index operation
  upward() {

  }

  downward() {

  }

  toFront() {

  }

  toBack() {

  }





}

