import { Point2D } from 'web-util-kit';
import { ShapeBase } from './shape-base';
import { saveContext } from '../util';

export class Polyline extends ShapeBase {

  type: string = 'polyline';

  points: Point2D[] = [];


  calcDimensions() {
    const points = this.points;
    const minX = Math.min(...points.map((p) => p.x )) || 0;
    const minY = Math.min(...points.map((p) => p.y)) || 0;
    const maxX = Math.max(...points.map((p) => p.x)) || 0;
    const maxY = Math.max(...points.map((p) => p.y)) || 0;
    this.width = (maxX - minX);
    this.height = (maxY - minY);
    this.left = minX;
    this.top = minY;
  }
  

}