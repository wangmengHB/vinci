
import { VinciCanvas, Source } from '../src';


const dat = require('dat.gui');



const vinci = new VinciCanvas();


const root = document.getElementById('root') as HTMLDivElement;


root.appendChild(vinci.getDOMElement());



// test image
const TEST_IMAGE_URL = './person.jpg';
const TEST_IMAGE = new Image();
TEST_IMAGE.src = TEST_IMAGE_URL;


const source = new Source();
source.loadFromSource(TEST_IMAGE).then(() => {

  vinci.addShape(source);
  vinci.draw();
});

(window as any).source = source;
(window as any).vinci = vinci;



setInterval(() => {
  vinci.draw();
}, 100)



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



