import { 
  setElementStyle, getIdentityMatrix2X3, Matrix2X3Array, getPointFromEvent, Point2D,
  transformPoint2D, radianToDegree, degreeToRadian, 
} from 'web-util-kit';
import { addListener, removeListener,  } from '../util';
import { ShapeBase } from '../shapes/shape-base';
import { StaticVinciCanvas } from './static-vinci-canvas';




export class VinciCanvas extends StaticVinciCanvas {

  private readonly _wrapperEl: HTMLDivElement = document.createElement('div');
  // used to support drawing feature.
  private readonly _upperCanvas: HTMLCanvasElement = document.createElement('canvas');
  

  private _lastPointer: Point2D | null = null; 
  private _lastDims: any = {};
  private _lastAngle: number | null = null;

  private action: string | null = null;



  


  constructor(options?: any) {
    super(options);
    this._initDOM();
    this._initEventListeners();
  }

  getElement(): HTMLElement {
    return this._wrapperEl;
  }

  setDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
    this._lowerCanvas.width = width;
    this._lowerCanvas.height = height;
    this._upperCanvas.width = width;
    this._upperCanvas.height = height;
    this.setCssDimensions(width, height);
  }


  setCssDimensions(width: number, height: number) {
    setElementStyle(this._wrapperEl, {
      width: `${width}px`,
      height: `${height}px`,
    });
    setElementStyle(this._lowerCanvas, {
      width: `${width}px`,
      height: `${height}px`,
    });
    setElementStyle(this._upperCanvas, {
      width: `${width}px`,
      height: `${height}px`,
    });
  }

  

  
  private _initDOM() {
    setElementStyle(this._wrapperEl, {
      position: 'relative',
      touchAction: 'none',
      userSelect: 'none',
    });

    setElementStyle(this._lowerCanvas, {
      position: 'absolute',
      touchAction: 'none',
      userSelect: 'none',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    });

    setElementStyle(this._upperCanvas, {
      position: 'absolute',
      touchAction: 'none',
      userSelect: 'none',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    });

    this._wrapperEl.appendChild(this._lowerCanvas);
    this._wrapperEl.appendChild(this._upperCanvas);
    this.setDimensions(this.width, this.height);

  }

  


  private _initEventListeners() {
    // in case we initialized the class twice. This should not happen normally
    // but in some kind of applications where the canvas element may be changed
    // this is a workaround to having double listeners.
    this.removeListeners();
    this.addOrRemove(addListener);
  }

  

  private addOrRemove (eventHelper: Function) {
    const canvasElement = this._upperCanvas;
    eventHelper(window, 'resize', this._onResize);

    
    eventHelper(canvasElement, 'mousedown', this._onMouseDown);
    eventHelper(canvasElement, 'mousemove', this._onMouseMove, { passive: false } as any);

    eventHelper(canvasElement, 'contextmenu', this._onContextMenu);

    eventHelper(canvasElement, 'mouseenter', this._onMouseEnter);
    eventHelper(canvasElement, 'mouseout', this._onMouseOut);
    eventHelper(canvasElement, 'wheel', this._onMouseWheel);
    eventHelper(canvasElement, 'dblclick', this._onDoubleClick);
  }


  private removeListeners() {
    this.addOrRemove(removeListener);
    // if you dispose on a mouseDown, before mouse up, you need to clean document to...  
    document.removeEventListener('mouseup', this._onMouseUp);
    document.removeEventListener('mousemove', this._onMouseMove, { passive: false } as any);
  }

  


  private _onResize = (e: Event) => {

  }


  private _onMouseEnter = (e: Event) => {

  }

  private _onMouseOut = (e: Event) => {

  }


  

  private _onMouseDown = (e: Event) => {
    console.log('mouse down');
    this.__onMouseDown(e);
    // this._resetTransformEventData();
    const canvasElement = this._upperCanvas;
    removeListener(canvasElement, 'mousemove', this._onMouseMove, { passive: false } as any);
    addListener(document, 'mousemove', this._onMouseMove, { passive: false } as any);
    addListener(document, 'mouseup', this._onMouseUp);
  }


  private _onMouseUp = (e: Event) => {
    this.__onMouseUp(e);
    // this._resetTransformEventData();
    const canvasElement = this._upperCanvas;
    
    // 多手指触控时，最后一个手指离开时才将事件恢复
    // if (this._isMainEvent(e)) { 
      removeListener(document, 'mouseup', this._onMouseUp);
      removeListener(document, 'mousemove', this._onMouseMove, { passive: false } as any);
      addListener(canvasElement, 'mousemove', this._onMouseMove, { passive: false } as any);
    // }

  }


  

  private _onMouseWheel = (e: Event) => {

  }

  private _onContextMenu = (e: Event) => {

  }

  private _onDoubleClick = (e: Event) => {

  }


  // real event handler
  private __onMouseDown = (e: Event) => {
    const pointer = getPointFromEvent(e as MouseEvent, this._lowerCanvas);
    this._lastPointer = pointer;
    
    if (this.activeShape) {
      // TODO find target corner, to decide which action
      let type = this.activeShape.findControlCorner(pointer);
      console.log('type', type);
      if (type) {       
        this._lastAngle = this.activeShape.angle;
        this._lastDims = {
          left: this.activeShape.left,
          top: this.activeShape.top,
          width: this.activeShape.width,
          height: this.activeShape.height
        };
        this.action = type;
        return;
      }
    }

    const list = this.shapes.slice().reverse();
    let targetShape;
    for (let i = 0; i < list.length; i++) {
      const shape = list[i];
      if (shape.isPointInPath(this._lowerCtx, pointer)) {
        targetShape = shape;  
        break;
      }
    }

    this.discardActiveObject();
    if (targetShape) {
      this.activeShape = targetShape as ShapeBase;
      this.action = 'move';
      this.activeShape.active = true;
      this.activeShape.fire('onSelected');
      this._lastDims = {
        left: this.activeShape.left,
        top: this.activeShape.top,
        width: this.activeShape.width,
        height: this.activeShape.height
      };
    } else {
      
    }

  }


  private _onMouseMove = (e: Event) => {
    const pointer = getPointFromEvent(e as MouseEvent, this._lowerCanvas);

    const list = this.shapes.slice().reverse();
    let found = false;
    for (let i = 0; i < list.length; i++) {
      const shape = list[i];
      if (shape.isPointInPath(this._lowerCtx, pointer)) {
        found = true;
        break;
      }
      if (shape.findControlCorner(pointer)) {
        found = true;
        break;
      }
    }

    if (found) {
      this._upperCanvas.style.cursor = 'pointer';
    } else {
      this._upperCanvas.style.cursor = 'default';
    }



    if (!this.activeShape) {
      return;
    }
    

    if (this.action === 'move' && this._lastPointer && this._lastDims) {
      this.activeShape.move(
        this._lastDims.left + (pointer.x - this._lastPointer.x),
        this._lastDims.top + (pointer.y - this._lastPointer.y)
      );
    } else if (
      this.action === 'mtr' && this._lastPointer && typeof this._lastAngle === 'number'
    ) {

      const center = new Point2D(this.activeShape.translateX, this.activeShape.translateY);
      const vector1 = this._lastPointer.sub(center);
      const vector2 = pointer.sub(center);
      const angle = radianToDegree(Math.atan2(vector2.y, vector2.x) - Math.atan2(vector1.y, vector1.x));
      this.activeShape.rotate(this._lastAngle + angle);

    } else if (
      (this.action === 'tl' || this.action === 'bl' || this.action == 'br' || this.action === 'tr' ||
      this.action === 'ml' || this.action === 'mb' || this.action == 'mr' || this.action === 'mt')
      && this._lastDims && this._lastPointer
    ) {
      this.activeShape.scaleToControlPoint(
        this.action,
        pointer,
        this._lastPointer, 
        this._lastDims
      );
    }
    

  }


  

  private __onMouseUp = (e: Event) => {
    if (!this.activeShape) {
      return;
    }

    this._lastPointer = null;
    this._lastDims = null;
    this._lastAngle = null;
    this.action = null;

  }




}



