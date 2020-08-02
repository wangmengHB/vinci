
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

const rect1 = new Rect({
  width: 30,
  height: 100,
  top: 500,
  left: 100,
});

const rect2 = new Rect({
  width: 30,
  height: 80,
  top: 500,
  left: 150,
});


const rect3 = new Rect({
  width: 30,
  height: 120,
  top: 500,
  left: 200,
});



const randomPoint = () => {
  return new Point2D(Math.random() * 300, Math.random() * 300)
}

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


const polyline = new Polyline({
  points: [
    new Point2D(310 + 45, 180),
    new Point2D(380 - 45, 180),
  ],
  fillStyle: 'rgba(0,0,0,0.8)',
  strokeStyle: 'rgba(0,0,0,0.8)',
  lineWidth: 20

});






const source = new Source({
  left: 20, top: 20
});



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



