
import { decorators, objects } from 'util-kit';
import { ShapeBase } from '../shapes/shape-base';
import { DIMS_PROPERTIES, RENDERING_PROPERTIES, } from './const';
export * from './const';


const { createDecorator } = decorators;
const { deepClone, equals } = objects;


export function addListener(element: HTMLElement | Document | Window, eventName: string, handler: Function, options?: any) {
  element && element.addEventListener(eventName as any, handler as any, options);
};


export function removeListener(element: HTMLElement | Document | Window, eventName: string, handler: Function, options?: any) {
  element && element.removeEventListener(eventName as any, handler as any, options);
};


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
      this.normalize();
      ctx.save();
      ctx.lineWidth = this.lineWidth;
      ctx.fillStyle = this.fillStyle;
      ctx.strokeStyle = this.strokeStyle;
      ctx.setLineDash(this.lineDash);
      ctx.setTransform(...this.getTransformMatrix2X3Array());
      const res: any = fn.apply(this, arguments);
      ctx.restore();
      return res;
    };
  });
}


export function needRendering() {
  return createDecorator((fn, key) => {
    return function(this: ShapeBase) {
      const prev = getRenderingProperties(this);
      const res: any = fn.apply(this, arguments);
      const current = getRenderingProperties(this);
      if (!equals(current, prev)) {
        this.fire('onModified');
      }
      return res;
    };
  });
}


export function hasDimsProp(obj: any) {
  if (!obj) {
    return false;
  }
  for (let i = 0; i < DIMS_PROPERTIES.length; i++) {
    const prop = DIMS_PROPERTIES[i];
    if (obj[prop] && typeof obj[prop] === 'number') {
      return true;
    }
  }
  return false;
}

export function getRenderingProperties(obj: any) {
  const res: any = {};
  RENDERING_PROPERTIES.forEach((prop: string) => {
    res[prop] = deepClone(obj[prop]);
  })
  return res;
}



export function safeMixins(target: any, source: any, backup: string = 'other') {
  if (!source || !target) {
    return;
  }
  target[backup] = target[backup] || {};
  const keys = Object.keys(source);

  keys.forEach((key: string) => {
    if (typeof target[key] === 'undefined') {    
      target[backup][key] = source[key];
    } else {
      target[key] = source[key];
    }
  });

  const otherKeys = Object.keys(target[backup]);

  otherKeys.forEach((otherKey: string) => {
    if (typeof target[otherKey] !== 'undefined') {
      delete target[backup][otherKey];
    }
  });

}



