import { 
  Matrix2X3Array, loadFromImage, composeMatrix2X3, 
  getIdentityTransformOption, TRANSFORM_OPTION, Point2D,
  transformPoint2D,
  getPointFromEvent,
} from 'web-util-kit';



export class Source {

  left: number = 0;
  top: number = 0;
  width: number = 0;
  height: number = 0;

  source: HTMLImageElement | HTMLCanvasElement;

  transformOptions: TRANSFORM_OPTION = getIdentityTransformOption();


  path2D: Path2D;

  active: boolean = false;


  constructor() {}


  async loadFromSource(source: HTMLImageElement | HTMLCanvasElement) {
    if (source instanceof HTMLImageElement) {
      this.source = await loadFromImage(source);
      this.width = this.source.width;
      this.height = this.source.height;
    }
    if (source instanceof HTMLCanvasElement) {
      this.source = source;
      this.width = this.source.width;
      this.height = this.source.height;
    }

  }


  render(ctx: CanvasRenderingContext2D, vpt: Matrix2X3Array)  {

    if (!this.source) {
      return;
    }

    ctx.save();


    this.transformOptions.translateX = this.left + this.width/2;
    this.transformOptions.translateY = this.top + this.height/2;

    const matrix = composeMatrix2X3(this.transformOptions);
    ctx.setTransform(...matrix);

    ctx.drawImage(
      this.source, 
      this.left - this.transformOptions.translateX, 
      this.top -this.transformOptions.translateY,
    );

    this.path2D = new Path2D();
    this.path2D.rect(
      this.left - this.transformOptions.translateX, 
      this.top -this.transformOptions.translateY,
      this.width,
      this.height,
    );

    ctx.restore();
  }


  renderControls(ctx: CanvasRenderingContext2D, vpt: Matrix2X3Array) {
    if (!this.source) {
      return;
    }

    if (!this.active) {
      return;
    }

    ctx.save();



    const lt = new Point2D(this.left, this.top);
    const tr = new Point2D(this.left + this.width, this.top);
    const lb = new Point2D(this.left, this.top + this.height);
    const br = new Point2D(this.left + this.width, this.top + this.height);

    const matrix = composeMatrix2X3(this.transformOptions);
    ctx.setTransform(...matrix);

    ctx.strokeStyle = 'blue';

    ctx.setLineDash([4,4]);

    ctx.strokeRect(
      lt.x - this.transformOptions.translateX, 
      lt.y - this.transformOptions.translateY,
      this.width,
      this.height
    );

    ctx.fillStyle = 'red';

    
    
    ctx.beginPath();
    ctx.arc(lt.x - this.transformOptions.translateX, lt.y - this.transformOptions.translateY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tr.x- this.transformOptions.translateX, tr.y  - this.transformOptions.translateY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lb.x- this.transformOptions.translateX, lb.y - this.transformOptions.translateY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(br.x- this.transformOptions.translateX, br.y - this.transformOptions.translateY, 10, 0, Math.PI * 2);
    ctx.fill();


    



    ctx.restore();


  }


  update(options: any) {

    if (typeof options.left === 'number') {
      this.left = options.left;
    }

    if (typeof options.top === 'number') {
      this.top = options.top;
    }

  }


  addRotate() {
    this.transformOptions.angle += Math.PI * 0.1;
  }


  dispatchEvent(type: string, point: any, ctx: CanvasRenderingContext2D) {

    ctx.save();
    ctx.setTransform(...composeMatrix2X3(this.transformOptions));

    if (ctx.isPointInPath(this.path2D, point.x, point.y)) {
      console.log('yes')
      this.active = true;
    } else {
      this.active = false;
    }

    ctx.restore();
   


  }


  


}

