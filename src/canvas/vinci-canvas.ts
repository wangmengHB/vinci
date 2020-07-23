import { 
  setElementStyle, getIdentityMatrix2X3, Matrix2X3Array, getPointFromEvent,
} from 'web-util-kit';
import { addListener, removeListener } from '../util';




export class VinciCanvas {

  private readonly _wrapperEl: HTMLDivElement = document.createElement('div');
  private readonly _lowerCanvas: HTMLCanvasElement = document.createElement('canvas');
  private readonly _upperCanvas: HTMLCanvasElement = document.createElement('canvas');
  private readonly _lowerCtx: CanvasRenderingContext2D;

  private width: number = 500;
  private height: number = 400;

  private viewportTransform: Matrix2X3Array = getIdentityMatrix2X3();

  private shapes: any[] = [];


  constructor() {

    this._lowerCtx = this._lowerCanvas.getContext('2d') as CanvasRenderingContext2D;

    this._initDOM();
    this._initEvent();
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

  draw() {
    this._lowerCtx.clearRect(0, 0, this.width, this.height);

    this.shapes.forEach((item: any) => {

      item.render(this._lowerCtx, this.viewportTransform);
      item.renderControls(this._lowerCtx, this.viewportTransform);

    })




  }

  addShape(obj: any) {

    this.shapes.push(obj);
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

    this._wrapperEl.appendChild(this._lowerCanvas);
    this._wrapperEl.appendChild(this._upperCanvas);

  }

  private _initEvent() {

    this._wrapperEl.addEventListener('mousedown', (e: MouseEvent) => {

      

      const point = getPointFromEvent(e, this._lowerCanvas);

      

      this.shapes.forEach((item: any) => {

        item.dispatchEvent('mousedown', point, this._lowerCtx);
  
      })


    })

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

    // 注意：这里没有 mouseup 事件
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
    // this.__onMouseMove(e);
  }

  private _onMouseWheel = (e: Event) => {

  }

  private _onContextMenu = (e: Event) => {

  }

  private _onDoubleClick = (e: Event) => {

  }


  // real event handler


  private __onMouseDown = (e: Event) => {

  }

  private __onMouseUp = (e: Event) => {

  }




}



