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

  move(x: number, y: number) {

    const diff = new Point2D(x, y).subSelf(new Point2D(this.left, this.top));

    this.points.forEach((point: Point2D) => {

      point.addSelf(diff);

    })

    this.left = x;
    this.top = y;
  }

  scaleToControlPoint(pointType: string, pointer: Point2D,  lastPointer: Point2D, lastDims: any) {

    const lastLeft = this.left;
    const lastTop = this.top;
    const lastWidth = this.width;
    const lastHeight = this.height;
    super.scaleToControlPoint(pointType, pointer, lastPointer, lastDims);

    const diff = new Point2D(this.left, this.top).subSelf(new Point2D(lastLeft, lastTop));

    const scaleX = this.width / lastWidth;
    const scaleY = this.height / lastHeight;

    this.points.forEach((point: Point2D) => {
      point.addSelf(diff);
      point.setX(this.left + (point.x - this.left) * scaleX );
      point.setY(this.top + (point.y - this.top) * scaleY );

    })

    




  }




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
  }
  

}