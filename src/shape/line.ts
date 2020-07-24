import { ShapeBase } from './shape-base';
import { saveContext } from '../util';




export class Line extends ShapeBase {

  type: string = 'line';

  x1: number = 0;
  y1: number = 0;

  x2: number = 0;
  y2: number = 0;


}