
import { 
  VinciCanvas, Source, Rect, Polygon, 
  Ellipse, Polyline,
} from '../src';
import { Point2D } from 'web-util-kit';

const vinci = new VinciCanvas();
const root = document.getElementById('root') as HTMLDivElement;
root.appendChild(vinci.getDOMElement());


// test image
const TEST_IMAGE_URL = './boy2.png';
const TEST_IMAGE = new Image();
TEST_IMAGE.src = TEST_IMAGE_URL;











async function init() {
const rect1 = new Rect();
rect1.width = 30;
rect1.height = 100;
rect1.top = 500;
rect1.left = 200;

const rect2 = new Rect();
rect2.width = 30;
rect2.height = 100;
rect2.top = 500;
rect2.left = 250;
rect2.scaleY = 0.8;

const rect3 = new Rect();
rect3.width = 30;
rect3.height = 100;
rect3.top = 500;
rect3.left = 300;
rect3.scaleY = 1.2;


const randomPoint = () => {
  return new Point2D(Math.random() * 300, Math.random() * 300)
}

const polygon = new Polygon();
polygon.points = [
  // randomPoint(),
  // randomPoint(),
  // randomPoint(),
  // randomPoint(),
  // randomPoint(),
  // randomPoint(),
  new Point2D(100, 500),
  new Point2D(300, 700),
  new Point2D(10, 700),
];


const ellipse1 = new Ellipse();
ellipse1.cx = 318;
ellipse1.cy = 174;
ellipse1.rx = 30;
ellipse1.ry = 30;
ellipse1.fillStyle = 'rgba(255,192,203,0.8)';
ellipse1.strokeStyle = 'rgba(255,192,203,0.8)';

const ellipse2 = new Ellipse();
ellipse2.cx = 385;
ellipse2.cy = 180;
ellipse2.rx = 30;
ellipse2.ry = 30;
ellipse2.fillStyle = 'rgba(255,192,203,0.8)';
ellipse2.strokeStyle = 'rgba(255,192,203,0.8)';

const polyline = new Polyline();
polyline.points = [
  new Point2D(310 + 45, 180),
  new Point2D(380 - 45, 180),
];
polyline.fillStyle = 'rgba(0,0,0,0.8)';
polyline.strokeStyle = 'rgba(0,0,0,0.8)';
polyline.lineWidth = 20;




const ellipse3 = new Ellipse();
ellipse3.cx = 330;
ellipse3.cy = 260;
ellipse3.rx = 30;
ellipse3.ry = 30;


const source = new Source();
source.set({ left: 20, top: 20});


(window as any).rect1 = rect1;
(window as any).rect2 = rect2;
(window as any).rect3 = rect3;
(window as any).source = source;
(window as any).ellipse1 = ellipse1;
(window as any).ellipse2 = ellipse2;

(window as any).vinci = vinci;

await source.loadFromSource(TEST_IMAGE);

vinci.add(source);
vinci.add(rect1);
vinci.add(rect2);
vinci.add(rect3);
vinci.add(polygon);
// vinci.add(polyline);
vinci.add(ellipse1);
vinci.add(ellipse2);

// vinci.add(ellipse3);
vinci.render();


}





function render() {
  
  vinci.render();
  setTimeout(() => {
    requestAnimationFrame(render);
  }, 10);
}

init();
render();



