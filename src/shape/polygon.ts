import { Point2D } from 'web-util-kit';
import { ShapeBase } from './shape-base';
import { Polyline } from './polyline';
import { saveContext } from '../util';


export class Polygon extends Polyline {

  type: string = 'polygon';

  fillStyle: string = 'orange';


  @saveContext()
  render(ctx: CanvasRenderingContext2D, vpt: any)  { 
    this.path2D = new Path2D();

    this.points.forEach((point: Point2D, index: number) => {
      if (index === 0) {
        this.path2D.moveTo(
          point.x - this.translateX, 
          point.y - this.translateY
        );
      }
      this.path2D.lineTo(
        point.x - this.translateX, 
        point.y - this.translateY,
      );
    });
    ctx.fill(this.path2D);
    ctx.stroke(this.path2D);
  }

  move(x: number, y: number) {

    this.points.forEach((point: Point2D) => {
      point.addSelf(new Point2D(x - this.left, y - this.top))
    });

    this.left = x;
    this.top = y;


  }



}
