
import { 
  VinciCanvas,  Shapes
} from '../../src';
import { Point2D } from 'web-util-kit';

const {Ellipse, Polyline, Source, Rect, Polygon,} = Shapes;

const vinci = new VinciCanvas();
const root = document.getElementById('root') as HTMLDivElement;
root.appendChild(vinci.getDOMElement());


// test image
const TEST_IMAGE_URL = '../boy2.png';
const TEST_IMAGE = new Image();
TEST_IMAGE.src = TEST_IMAGE_URL;


const MAX_ENERGY = 600;
const SCALE_BASE = MAX_ENERGY / 3;



var soundFile;
var amplitude;
let backgroundColor = 'rgba(255, 255, 255, 0)';

// rectangle parameters
var rectRotate = true;
var rectMin = 15;
var rectOffset = 20;
var numRects = 10;

// :: Beat Detect Variables
// how many draw loop frames before the beatCutoff starts to decay
// so that another beat can be triggered.
// frameRate() is usually around 60 frames per second,
// so 20 fps = 3 beats per second, meaning if the song is over 180 BPM,
// we wont respond to every beat.
var beatHoldFrames = 30;

// what amplitude level can trigger a beat?
var beatThreshold = 0.11; 

// When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
// Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
var beatCutoff = 0;
var beatDecayRate = 0.98; // how fast does beat cutoff decay?
var framesSinceLastBeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.

const MUSIC_001 = './music/YACHT_-_06_-_Summer_Song_Instrumental.mp3';
const MUSIC_002 = './music/只对你有感觉.mp3';
const MUSIC_003 = './music/Peter_Johnston_-_La_ere_gymnopedie.mp3';

const randomColor = () => {
  const randomNumber = () => {
    return Math.floor(Math.random() * 200);
  }

  return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
}

(window as any).preload = () => {
  soundFile = (window as any).loadSound(MUSIC_001);
  console.log(soundFile);
  (window as any).soundFile = soundFile;
}

(window as any).setup = () => {
  

  amplitude = new (window as any).p5.Amplitude();

  const aBtn: any = document.getElementById('audio');
  const rec: any = document.getElementById('rec');
  aBtn.disabled = false;

  let uid = 0;
  aBtn.onclick = () => {
    
    if (uid % 2 === 0) {
      
      soundFile.play();
      rec.onclick = clickHandler;
      rec.disabled = false;
    } else {
      soundFile.stop();
    }
    uid++;
  }

  const audioContext = soundFile.output.context;
  // 创建一个 dest 节点, 用于保存流
  const dest = audioContext.createMediaStreamDestination();
  aStream = dest.stream;
  soundFile.output.connect(dest);



  amplitude.setInput(soundFile);
  amplitude.smooth(0.9);
}


function detectBeat(level) {
  if (level  > beatCutoff && level > beatThreshold){
    onBeat();
    beatCutoff = level *1.2;
    framesSinceLastBeat = 0;
  } else{
    if (framesSinceLastBeat <= beatHoldFrames){
      framesSinceLastBeat ++;
    }
    else{
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}

function onBeat() {
  backgroundColor = randomColor();
  rectRotate = !rectRotate;
}







async function init() {
const rect1 = new Rect({
  width: 30,
  height: 100,
  top: 500,
  left: 200,
});


const rect2 = new Rect({
  width: 30,
  height: 100,
  top: 500,
  left: 250,
  scaleY: 0.8,
});


const rect3 = new Rect({
  width: 30,
  height: 100,
  top: 500,
  left: 300,
  scaleY: 1.2,
});



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
// vinci.add(polygon);
// vinci.add(polyline);
vinci.add(ellipse1);
vinci.add(ellipse2);

// vinci.add(ellipse3);
vinci.render();


}









function render() {
  if (amplitude) {
    var level = amplitude.getLevel();

    detectBeat(level);

    // distort the rectangle based based on the amp
    var distortDiam = (window as any).map(level, 0, 1, 0, MAX_ENERGY);
    
    // distortion direction shifts each beat
    if (rectRotate) {
      var rotation = 15;
    } else {
      var rotation = 45;
    }

    vinci.backgroundColor = backgroundColor;
    

    (window as any).rect1.set({
      top: 600 - (rectMin + distortDiam),
      height: rectMin + distortDiam,
      angle: rotation
    });

    (window as any).rect2.set({
      top: 600 - (rectMin + distortDiam),
      height: rectMin + distortDiam,
      angle: rotation
    });

    (window as any).rect3.set({
      top: 600 - (rectMin + distortDiam),
      height: rectMin + distortDiam,
      angle: rotation
    });


    


    if (rectRotate) {

    
      (window as any).ellipse1.set({
        scaleX: 1 + distortDiam / SCALE_BASE,
        scaleY: 1 + distortDiam / SCALE_BASE,
      });

      (window as any).ellipse2.set({
        scaleX: 1 - distortDiam / SCALE_BASE,
        scaleY: 1 - distortDiam / SCALE_BASE,
      });

      
    } else {
      (window as any).ellipse1.set({
        scaleX: 1 - distortDiam / SCALE_BASE,
        scaleY: 1 - distortDiam / SCALE_BASE,
      });

      (window as any).ellipse2.set({
        scaleX: 1 + distortDiam / SCALE_BASE,
        scaleY: 1 + distortDiam / SCALE_BASE,
      });
    }


  }

  requestAnimationFrame(render);

  
}

init().then(render);


const chunks: any = [];
let recorder: any;
let aStream: any;


function clickHandler() {
  this.textContent = 'stop recording';

  const target: any = vinci.getCanvas();
  const cStream = target.captureStream(25);

  cStream.addTrack(aStream.getAudioTracks()[0]);
  recorder = new (window as any).MediaRecorder(cStream);
  recorder.start();
  recorder.ondataavailable = saveChunks;
  recorder.onstop = exportStream;
  this.onclick = stopRecording;
};

function exportStream(e) {

  if (chunks.length > 0) {

    var blob = new Blob(chunks, { type: "video/webm" })
    var vidURL = URL.createObjectURL(blob);
    var vid: any = document.createElement('video');
    vid.controls = true;
    vid.src = vidURL;
    vid.onend = function() {
      URL.revokeObjectURL(vidURL);
    }
    document.body.appendChild(vid);
  }
}

function saveChunks(e) {
  e.data.size && chunks.push(e.data);
}

function stopRecording() {
  this.parentNode.removeChild(this);
  recorder.stop();
}





