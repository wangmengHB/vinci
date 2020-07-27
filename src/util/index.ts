
import { decorators } from 'util-kit';
import { ShapeBase } from '../shape/shape-base';
export * from './const';


const { createDecorator } = decorators;

const identify = (_: any) => _;

const PI_BY_180 = Math.PI / 180;



export function addListener(element: HTMLElement | Document | Window, eventName: string, handler: Function, options?: any) {
  element && element.addEventListener(eventName as any, handler as any, options);
};


export function removeListener(element: HTMLElement | Document | Window, eventName: string, handler: Function, options?: any) {
  element && element.removeEventListener(eventName as any, handler as any, options);
};

export const radianToDegree = (radian: number) => radian / PI_BY_180;
export const degreeToRadian = (degree: number) => degree * PI_BY_180;


// export function isMainEvent(evt: Event) {
//  if (evt.isPrimary === true) {
//    return true;
//  }
//  if (evt.isPrimary === false) {
//    return false;
//  }
//  if (evt.type === 'touchend' && evt.touches.length === 0) {
//    return true;
//  }
//  if (evt.changedTouches) {
//    return evt.changedTouches[0].identifier === this.mainTouchId;
//  }
//  return true;
// }





export function saveContext() {
  return createDecorator((fn, key) => {
    return function(this: ShapeBase, ctx: CanvasRenderingContext2D, vpt: any) {
      if (!(ctx instanceof CanvasRenderingContext2D)) {
        throw new Error('failed to get CanvasRenderingContext2D');
      }
      ctx.save();
      ctx.lineWidth = this.lineWidth;
      ctx.fillStyle = this.fillStyle;
      ctx.strokeStyle = this.strokeStyle;


      this.calcDimensions();
      this.calcControls();
      ctx.setTransform(...this.getTransformMatrix2X3Array());
      const res: any = fn.apply(this, arguments);
      ctx.restore();
      return res;
    };
  });
}



export function setPropertyMapping(
  obj: any, 
  prop1: string, 
  prop2: string, 
  valueFn: Function = identify,          // obj[prop1] = valueFn(obj[prop2])
  inverseFn: Function = identify,        // obj[prop2] = inverseFn(obj[prop1])
) {

  let _value1 = obj[prop1];
  let _value2 = inverseFn(obj[prop1]);

  const setter1 = (next: any) => {
    _value1 =  next;
    _value2 = inverseFn(next);
  }

  const setter2 = (next: any) => {
    _value2 =  next;
    _value1 = valueFn(next);
  }

  Object.defineProperty(obj, prop1, {
    get: () => _value1,
    set: setter1,    
  });

  Object.defineProperty(obj, prop2, {
    get: () => _value2,
    set: setter2,
  });

}


export function bindComputedProperty(
  obj: any, 
  dest: string, 
  sources: string[], 
  computFn: Function,
) {

  
  

  var handler = {
    set: function(obj: any, prop: string, value: any) {
      obj[prop] = value;

      if (sources.indexOf(prop) > -1) {
        obj[dest] = computFn(...sources.map((name: string) => obj[name]))
      }
        
      return true;
    }
  };
  var p = new Proxy(obj, handler);

  (window as any).p = p;


    // p.age = 100;
    // console.log(p.age);  //100
    // p.age = 'Jack';      //TypeError: The age is not an integer
  
}


