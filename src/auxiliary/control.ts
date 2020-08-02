import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOptions, TRANSFORM_OPTIONS, Point2D,
  transformPoint2D, invertMatrix2X3, calcRotateMatrix2X3, rotateVector2D,
  getPointFromEvent, radianToDegree, degreeToRadian, 
} from 'web-util-kit';
import { 
  saveContext, MTR_LENGTH,
} from '../util';


export interface ControlPoint {
  type: string;
  point: Point2D;
  visible: boolean;
}




export class Control {


  private readonly controlPoints: ControlPoint[] = [
    {
      type: "mtr",
      point: new Point2D(),
      visible: true,
    },
    {
      type: "mt",
      point: new Point2D(),
      visible: true,
    },
    {
      type: "ml",
      point: new Point2D(),
      visible: true,
    },
    {
      type: "mr",
      point: new Point2D(),
      visible: true,
    },
    {
      type: "mb",
      point: new Point2D(),
      visible: true,
    },
    {
      type: "tl",
      point: new Point2D(),
      visible: true,
    },
    {
      type: "tr",
      point: new Point2D(),
      visible: true,
    },
    {
      type: "bl",
      point: new Point2D(),
      visible: true,
    },
    {
      type: "br",
      point: new Point2D(),
      visible: true,
    },
  ];







  calculate(width, height) {
    const mtr = this.controlPoints.find((cp: ControlPoint) => cp.type === 'mtr')!.point;
    const ml = this.controlPoints.find((cp: ControlPoint) => cp.type === 'ml')!.point;
    const mr = this.controlPoints.find((cp: ControlPoint) => cp.type === 'mr')!.point;
    const mt = this.controlPoints.find((cp: ControlPoint) => cp.type === 'mt')!.point;
    const mb = this.controlPoints.find((cp: ControlPoint) => cp.type === 'mb')!.point;
    const tl = this.controlPoints.find((cp: ControlPoint) => cp.type === 'tl')!.point;
    const tr = this.controlPoints.find((cp: ControlPoint) => cp.type === 'tr')!.point;
    const bl = this.controlPoints.find((cp: ControlPoint) => cp.type === 'bl')!.point;
    const br = this.controlPoints.find((cp: ControlPoint) => cp.type === 'br')!.point;
    tl.setXY(-width/2 , -height/2 );
    mt.setXY(0 , -height/2 );
    tr.setXY(width/2, -height/2 );
    mr.setXY(width/2 , 0);
    br.setXY(width/2 , height/2 );
    mb.setXY(0 , height/2 );
    bl.setXY(-width/2 , height/2 );
    ml.setXY(-width/2 , 0);
    mtr.setXY(0 , -height/2 - MTR_LENGTH);
  }

  getPoint(type: string) {
    const ctrPoint = this.controlPoints.find((cp: ControlPoint) => cp.type === type);
    if (ctrPoint) {
      return ctrPoint.point;
    }
    return undefined;
  }

  getAllVisiblePoints() {
    return this.controlPoints.filter((cp: ControlPoint) => cp.visible);
  }


  findType(pointer: Point2D, matrix: Matrix2X3Array) {
    let controlPoint, type;
    const cps = this.getAllVisiblePoints();
    for (let i = 0; i < cps.length; i++) {
      controlPoint = cps[i].point; 
      controlPoint = transformPoint2D(
        controlPoint, 
        matrix
      );
      
      if (pointer.distanceFrom(controlPoint) < 10 ) {
        type = cps[i].type;
        break;
      }
    }

    return type;
    
  }



  setVisible() {

  }


  getControlPoints() {

  }

  



  







}