import { Ellipse } from './ellipse';
import { saveContext, safeMixins, hasDimsProp } from '../util';


export class Circle extends Ellipse {

  type: string = 'circle';
  
  set r(val: number) {
    console.log('set');
    this.rx = val;
    this.ry = val;
  }

  get r() {
    return this.rx || this.ry;
  }
  
  constructor(options: any) {
    super(options);
    safeMixins(this, options);
    this.normalize(options);  
  }

  toJSON() {
    // todo: 
    // if this.rx !== this.ry, return a ellipse type

  }

}
