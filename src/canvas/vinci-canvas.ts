import { 
  setElementStyle, getIdentityMatrix2X3, Matrix2X3Array, getPointFromEvent, Point2D,
  transformPoint2D,
} from 'web-util-kit';
import { addListener, removeListener, radianToDegree, degreeToRadian } from '../util';
import { ShapeBase } from '../shape/shape-base';




export class VinciCanvas {

  private readonly _wrapperEl: HTMLDivElement = document.createElement('div');
  private readonly _lowerCanvas: HTMLCanvasElement = document.createElement('canvas');
  private readonly _upperCanvas: HTMLCanvasElement = document.createElement('canvas');
  private readonly _lowerCtx: CanvasRenderingContext2D;

  private width: number = 500;
  private height: number = 400;

  private viewportTransform: Matrix2X3Array = getIdentityMatrix2X3();

  private shapes: any[] = [];

  activeShape: ShapeBase | null = null;

  private _lastPointer: Point2D | null = null; 
  private _lastDims: any = {};
  private _lastAngle: number | null = null;


  constructor() {

    this._lowerCtx = this._lowerCanvas.getContext('2d') as CanvasRenderingContext2D;

    this._initDOM();
    this.setCanvasDimensions(750, 750);
    this._initEventListeners();


  }

  getDOMElement() {
    return this._wrapperEl;
  }

  setCanvasDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
    this._lowerCanvas.width = width;
    this._lowerCanvas.height = height;

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

  render() {
    this._lowerCtx.clearRect(0, 0, this.width, this.height);
    this.shapes.forEach((item: any) => {
      item.render(this._lowerCtx, this.viewportTransform);
      item.renderControls(this._lowerCtx, this.viewportTransform);
    });
  }

  addShape(obj: any) {
    this.shapes.push(obj);
  }

  discardActiveObject() {
    this.shapes.forEach((shape: any) => shape.active = false);
    this.activeShape = null;
  }

  



  private _initDOM() {
    setElementStyle(this._wrapperEl, {
      position: 'relative',
      touchAction: 'none',
      userSelect: 'none',
      width: '100%',
      height: '100%',
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

  }

  


  private _initEventListeners() {
    // in case we initialized the class twice. This should not happen normally
    // but in some kind of applications where the canvas element may be changed
    // this is a workaround to having double listeners.
    this.removeListeners();
    this.addOrRemove(addListener);
    console.log('register');
  }

  

  private addOrRemove (eventHelper: Function) {
    const canvasElement = this._upperCanvas;
    eventHelper(window, 'resize', this._onResize);

    // 注意：这里没有 mouseup 事件
    console.log(canvasElement);
    
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


  private _onMouseMove = (e: Event) => {
    // !this.allowTouchScrolling && e.preventDefault && e.preventDefault();
    this.__onMouseMove(e);
    
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


      // TODO check if any control point is hit
      console.log('mouse' ,pointer.x, pointer.y);

      console.log('origin mtr', this.activeShape.control.mtr.x, this.activeShape.control.mtr.y);

      const mtr = transformPoint2D(
        this.activeShape.control.mtr, 
        this.activeShape.getTransformMatrix2X3Array()
      );
      
      console.log('mtr', mtr.x, mtr.y);

      if (this._lastPointer.distanceFrom(mtr) < 10 ) {
        this._lastAngle = this.activeShape.angle;
        this.activeShape.rotating = true;
        this.activeShape.moving = false;
        (window as any).active = this.activeShape;

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
      this.activeShape.moving = true;
      this.activeShape.active = true;
      this._lastDims = {
        left: this.activeShape.left,
        top: this.activeShape.top,
        width: this.activeShape.width,
        height: this.activeShape.height
      };
    } else {
      
    }














    // var pointer = this._pointer;
    // // save pointer for check in __onMouseUp event
    // this._previousPointer = pointer;
    // var shouldRender = this._shouldRender(target),
    //     shouldGroup = this._shouldGroup(e, target);
    // if (this._shouldClearSelection(e, target)) {
    //   this.discardActiveObject(e);
    // }
    // else if (shouldGroup) {
    //   this._handleGrouping(e, target);
    //   target = this._activeObject;
    // }

    // if (this.selection && (!target ||
    //   (!target.selectable && !target.isEditing && target !== this._activeObject))) {
    //   this._groupSelector = {
    //     ex: pointer.x,
    //     ey: pointer.y,
    //     top: 0,
    //     left: 0
    //   };
    // }

    // if (target) {
    //   var alreadySelected = target === this._activeObject;
    //   if (target.selectable) {
    //     this.setActiveObject(target, e);
    //   }
    //   var corner = target._findTargetCorner(
    //     this.getPointer(e, true),
    //     fabric.util.isTouchEvent(e)
    //   );
    //   target.__corner = corner;
    //   if (target === this._activeObject && (corner || !shouldGroup)) {
    //     var control = target.controls[corner],
    //         mouseDownHandler = control && control.getMouseDownHandler(e, target, control);
    //     if (mouseDownHandler) {
    //       mouseDownHandler(e, target, control);
    //     }
    //     this._setupCurrentTransform(e, target, alreadySelected);
    //   }
    // }
    // this._handleEvent(e, 'down');
    

  }


  private __onMouseMove = (e: Event) => {
    if (!this.activeShape) {
      return;
    }
    const pointer = getPointFromEvent(e as MouseEvent, this._lowerCanvas);

    if (this.activeShape.moving && this._lastPointer && this._lastDims) {
      this.activeShape.left = this._lastDims.left + (pointer.x - this._lastPointer.x);
      this.activeShape.top = this._lastDims.top + (pointer.y - this._lastPointer.y);
    } else if (
      this.activeShape.rotating && this._lastPointer && typeof this._lastAngle === 'number'
    ) {

      const center = new Point2D(this.activeShape.translateX, this.activeShape.translateY);
      const vector1 = this._lastPointer.sub(center);
      const vector2 = pointer.sub(center);

      const angle = radianToDegree(Math.atan2(vector2.y, vector2.x) - Math.atan2(vector1.y, vector1.x));
      
      this.activeShape.angle = this._lastAngle + angle;

    }
    


  }


  // /**
  //    * @private
  //    * @param {Event} e Event fired on mousemove
  //    */
  //   _transformObject: function(e) {
  //     var pointer = this.getPointer(e),
  //         transform = this._currentTransform;

  //     transform.reset = false;
  //     transform.target.isMoving = true;
  //     transform.shiftKey = e.shiftKey;
  //     transform.altKey = e[this.centeredKey];

  //     this._performTransformAction(e, transform, pointer);
  //     transform.actionPerformed && this.requestRenderAll();
  //   },

  //   /**
  //    * @private
  //    */
  //   _performTransformAction: function(e, transform, pointer) {
  //     var x = pointer.x,
  //         y = pointer.y,
  //         action = transform.action,
  //         actionPerformed = false,
  //         actionHandler = transform.actionHandler,
  //         // this object could be created from the function in the control handlers
  //         options = {
  //           target: transform.target,
  //           e: e,
  //           transform: transform,
  //           pointer: pointer
  //         };

  //     if (action === 'drag') {
  //       actionPerformed = this._translateObject(x, y);
  //       if (actionPerformed) {
  //         this._fire('moving', options);
  //         this.setCursor(options.target.moveCursor || this.moveCursor);
  //       }
  //     }
  //     else if (actionHandler) {
  //       (actionPerformed = actionHandler(e, transform, x, y)) && this._fire(action, options);
  //     }
  //     transform.actionPerformed = transform.actionPerformed || actionPerformed;
  //   },




  private __onMouseUp = (e: Event) => {
    if (!this.activeShape) {
      return;
    }


    this.activeShape.rotating = false;
    this.activeShape.moving = false;
    this._lastPointer = null;
    this._lastDims = null;
    this._lastAngle = null;



  }




}



