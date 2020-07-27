
import { VinciCanvas, Source, Rect, Polygon } from '../src';
import { Point2D } from 'web-util-kit';


const dat = require('dat.gui');



const vinci = new VinciCanvas();


const root = document.getElementById('root') as HTMLDivElement;


root.appendChild(vinci.getDOMElement());



// test image
const TEST_IMAGE_URL = './person.jpg';
const TEST_IMAGE = new Image();
TEST_IMAGE.src = TEST_IMAGE_URL;


const rect = new Rect();
rect.width = 400;
rect.height = 200;

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
  new Point2D(100, 100),
  new Point2D(300, 300),
  new Point2D(10, 300),


]

const source = new Source();
source.loadFromSource(TEST_IMAGE).then(() => {

  vinci.addShape(polygon);
  
  vinci.addShape(rect);
  vinci.addShape(source);
  vinci.render();

  source.set({ left: 100, top: 100});
  // source.addRotate();
  // source.addRotate();
});

(window as any).rect = rect;
(window as any).source = source;
(window as any).vinci = vinci;


function render() {
  vinci.render();
  setTimeout(() => {
    requestAnimationFrame(render);
  }, 10)
  
}

render();


const state = {
  brightness: 0,
  contrast: 0,
  hue: 0,
  saturation: 0,
  sepia_amount: 0,
  vibrance_amount: 0,
  vignette_amount: 0,
  vignette_size: 0,
  noise_amount: 0,
  pixelate_block_size: 0,
};



