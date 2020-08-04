import { Point2D } from 'web-util-kit';
import { ShapeBase } from './shape-base';
import { saveContext, safeMixins, hasDimsProp } from '../util';



export class Polyline extends ShapeBase {

  type: string = 'polyline';

  points: Point2D[] = [];

  lineWidth: number = 10;
  lineDash: number[] = [5, 5];

  constructor(options?: any) {
    super(options);
    safeMixins(this, options);
    // 以 dimension 的属性优先，以此为基准计算 shape
    this.normalize(options);  
  }

  // dimension change --> shape change
  // from dimension to shape
  calcShape() {
    const points = this.points;
    const minX = Math.min(...points.map((p) => p.x )) || 0;
    const minY = Math.min(...points.map((p) => p.y)) || 0;
    const maxX = Math.max(...points.map((p) => p.x)) || 0;
    const maxY = Math.max(...points.map((p) => p.y)) || 0;
    const shapeWidth = (maxX - minX);
    const shapeHeight = (maxY - minY);
    const scaleX = this.width / shapeWidth;
    const scaleY = this.height / shapeHeight;
    const diff = new Point2D(this.left, this.top).subSelf(new Point2D(minX, minY));
    this.points.forEach((point: Point2D) => {
      point.addSelf(diff);
      point.setX(this.left + (point.x - this.left) * scaleX );
      point.setY(this.top + (point.y - this.top) * scaleY );
    });

  }

  // shape change --> dimension change
  // TODO calculate real dimension: left, top, width, height
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
    ctx.stroke(this.path2D);
  }
  

}
