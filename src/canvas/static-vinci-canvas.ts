import { 
  setElementStyle, getIdentityMatrix2X3, Matrix2X3Array, getPointFromEvent, Point2D,
  transformPoint2D, radianToDegree, degreeToRadian, 
} from 'web-util-kit';
import { ShapeBase } from '../shapes/shape-base';
import { VinciEvent } from '../event';
import { decorators } from 'util-kit';

const { debounce } = decorators;



export class StaticVinciCanvas extends VinciEvent {

  protected readonly _lowerCanvas: HTMLCanvasElement = document.createElement('canvas');
  protected readonly _lowerCtx: CanvasRenderingContext2D = this._lowerCanvas.getContext('2d') as CanvasRenderingContext2D;

  protected width: number = 500;
  protected height: number = 400;



  protected viewportTransform: Matrix2X3Array = getIdentityMatrix2X3();

  protected shapes: any[] = [];
  activeShape: ShapeBase | null = null;

  // test
  backgroundColor: string = 'rgba(255, 255, 255, 0)';

  constructor(options?: any) {
    super();
  }

  getElement(): HTMLElement {
    return this._lowerCanvas;
  }

  getCanvas() {
    return this._lowerCanvas;
  }

  render() {
    this._lowerCtx.clearRect(0, 0, this.width, this.height);

    // test code, remove later
    this._lowerCtx.save();
    this._lowerCtx.fillStyle = this.backgroundColor;
    this._lowerCtx.fillRect(0, 0, this.width, this.height);
    this._lowerCtx.restore();

    // --------

    this.shapes.forEach((item: any) => {
      item.render(this._lowerCtx, this.viewportTransform);
      item.renderControls(this._lowerCtx, this.viewportTransform);
    });
  }


  @debounce(0)
  requestRender() {
    console.log('render');

    this._lowerCtx.clearRect(0, 0, this.width, this.height);

    // test code, remove later
    this._lowerCtx.save();
    this._lowerCtx.fillStyle = this.backgroundColor;
    this._lowerCtx.fillRect(0, 0, this.width, this.height);
    this._lowerCtx.restore();

    // --------

    this.shapes.forEach((item: any) => {
      item.render(this._lowerCtx, this.viewportTransform);
      item.renderControls(this._lowerCtx, this.viewportTransform);
    });
  }


  add(obj: ShapeBase) {
    // TODO register vinci into shape
    obj.setVinci(this);

    this.shapes.push(obj);

    obj.fire('onAdded');
  }

  discardActiveObject() {
    if (this.activeShape) {
      this.activeShape.fire('onUnSelected');
    }

    this.shapes.forEach((shape: any) => shape.active = false);
    this.activeShape = null;
  }



  upwardObject(obj: ShapeBase, ref?: ShapeBase) {
    const idx = this.shapes.findIndex((sub: ShapeBase) => sub === obj);
    if (idx > -1 && idx < this.shapes.length - 1) {
      this.shapes.splice(idx, 1);
    } else {
      return;
    }    
    let refIdx = this.shapes.findIndex((sub: ShapeBase) => sub === ref);
    if (refIdx > -1) {
      this.shapes.splice(refIdx + 1, 0, obj);
    } else {
      this.shapes.splice(idx + 1, 0, obj);
    }
    this.requestRender();

  }

  downwardObject(obj: ShapeBase, ref?: ShapeBase) {
    const idx = this.shapes.findIndex((sub: ShapeBase) => sub === obj);
    if (idx > 0) {
      this.shapes.splice(idx, 1);
    } else {
      return;
    }    
    let refIdx = this.shapes.findIndex((sub: ShapeBase) => sub === ref);
    if (refIdx > 0) {
      this.shapes.splice(refIdx - 1, 0, obj);
    } else {
      this.shapes.splice(idx - 1, 0, obj);
    }
    this.requestRender();
  }

  toFrontObject(obj: ShapeBase) {
    const idx = this.shapes.findIndex((sub: ShapeBase) => sub === obj);
    if (idx > -1) {
      this.shapes.splice(idx, 1);
    } else {
      return;
    }
    this.shapes.push(obj);
    this.requestRender();
  }

  toBackObject(obj: ShapeBase) {
    const idx = this.shapes.findIndex((sub: ShapeBase) => sub === obj);
    if (idx > -1) {
      this.shapes.splice(idx, 1);
    } else {
      return;
    }
    this.shapes.unshift(obj);
    this.requestRender();
  }



  



}