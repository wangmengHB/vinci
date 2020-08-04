
import { 
  VinciCanvas,  Shapes
} from '../src';
import { Point2D } from 'web-util-kit';

const {Ellipse, Polyline, ImageShape, Rect, Polygon, Circle } = Shapes;



const vinci = new VinciCanvas();

vinci.setDimensions(700, 750);

const root = document.getElementById('root') as HTMLDivElement;
root.appendChild(vinci.getElement());


// test image
const TEST_IMAGE_URL = './boy2.png';
const TEST_IMAGE = new Image();
TEST_IMAGE.src = TEST_IMAGE_URL;




const ORIGINX = 50;
const ORIGINY = 400;
const MAX_TOP = 400;
const MIN_TOP = 100;




async function init() {

const rect1 = new Rect({
  width: 30,
  height: 100,
  top: 500,
  left: ORIGINX + 50,
});

const rect2 = new Rect({
  width: 30,
  height: 80,
  top: 500,
  left: ORIGINX + 100,
});


const rect3 = new Rect({
  width: 30,
  height: 120,
  top: 500,
  left: ORIGINX + 150,
});

const rect4 = new Rect({
  width: 30,
  height: 120,
  top: 500,
  left: ORIGINX + 150,
});





const polygon = new Polygon({
  points: [
    new Point2D(100, 500),
    new Point2D(300, 700),
    new Point2D(10, 700),
  ]
});


const ellipse1 = new Ellipse({
  cx: 318,
  cy: 174,
  rx: 30,
  ry: 30,
  fillStyle: 'rgba(255,192,203,0.8)',
  strokeStyle: 'rgba(255,192,203,0.8)',
});


const ellipse2 = new Ellipse({
  cx: 385,
  cy: 180,
  rx: 30,
  ry: 30,
  fillStyle: 'rgba(255,192,203,0.8)',
  strokeStyle: 'rgba(255,192,203,0.8)',
});


const polyline1 = new Polyline({
  points: [
    new Point2D(10, 400),
    new Point2D(600, 400),
  ],
  strokeStyle: 'rgba(0,0,0,0.8)',
  lineWidth: 2
});

const polyline2 = new Polyline({
  points: [
    new Point2D(50, 440),
    new Point2D(50, 100),
  ],
  strokeStyle: 'rgba(0,0,0,0.8)',
  lineWidth: 2
});


const circle = new Circle({
  cx: 500,
  cy: 600,
  r: 100,
});



const source = new ImageShape({
  left: 20, top: 20
});



(window as any).rect1 = rect1;
(window as any).rect2 = rect2;
(window as any).rect3 = rect3;
(window as any).source = source;
(window as any).ellipse1 = ellipse1;
(window as any).ellipse2 = ellipse2;
(window as any).polygon1 = polygon;

(window as any).vinci = vinci;

await source.loadFromImage(TEST_IMAGE);

vinci.add(source);
vinci.add(rect1);
vinci.add(rect2);
vinci.add(rect3);
vinci.add(rect4);
vinci.add(polygon);
// vinci.add(polyline);
vinci.add(ellipse1);
vinci.add(ellipse2);

vinci.add(polyline1);
vinci.add(polyline2);

for(let i = 0; i < 10; i++) {
  const height = Math.random() * ( MAX_TOP - MIN_TOP);

  const rect = new Rect({width: 30, height, left: 60 + 50 * i, top: 400 - height});
  vinci.add(rect);
}



// vinci.add(ellipse3);
// vinci.render();

vinci.add(circle);


}





init();





