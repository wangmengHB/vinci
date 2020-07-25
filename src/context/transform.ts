import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOption, TRANSFORM_OPTION, Point2D,
  transformPoint2D,
  getPointFromEvent,
} from 'web-util-kit';
import { saveContext, setPropertyMapping, radianToDegree, degreeToRadian} from '../util';



export class Transform {

  public angle: number = 0;
  public skewX: number = 0;
  public skewY: number = 0;


  private _angle: number = 0;
  private _skewX: number = 0;
  private _skewY: number = 0;

  private _scaleX: number = 1;
  private _scaleY: number = 1;

  translateX: number = 0;
  translateY: number = 0;
  flipX: boolean = false;
  flipY: boolean = false;


  constructor() {


    setPropertyMapping(this, 'angle', '_angle', radianToDegree, degreeToRadian);
    setPropertyMapping(this, 'skewX', '_skewX', radianToDegree, degreeToRadian);
    setPropertyMapping(this, 'skewY', '_skewY', radianToDegree, degreeToRadian);
    
  }


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


  getMatrix2X3Array(): Matrix2X3Array {
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



  


  




}