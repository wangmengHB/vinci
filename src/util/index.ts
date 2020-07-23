


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