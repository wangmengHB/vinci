import { ShapeBase } from './shape-base';
import { saveContext } from '../util';

export class Ellipse extends ShapeBase {


  type: string = 'ellipse';


  cx: number = 0;
  cy: number = 0;
  rx: number = 0;
  ry: number = 0;

  

}