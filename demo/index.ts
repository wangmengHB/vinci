const dat = require('dat.gui');


// test image
const TEST_IMAGE_URL = './person.jpg';
const image = new Image();
image.src = TEST_IMAGE_URL;


const sourceNode = document.getElementById('source');
const target = document.getElementById('target');

sourceNode!.appendChild(image);


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

