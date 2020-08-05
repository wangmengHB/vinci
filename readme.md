# vinci.js (in development)

vinci.js is an interactive 2D graphic canvas library engine. It can be used to support 2D picture edit, data visualization, video editting, etc.   

Currently, it already has the basic interactive feature, and it is still in development. 

Below is the demo capture from vinci.js.     

<img alt="demo" src="https://github.com/wangmengHB/vinci/blob/master/images/demo1.png?raw=true" height="300" />

# install
```bash
npm install --S vinci
```

# usage
```ts
import { VinciCanvas, StaticVinciCanvas, Shapes } from 'vinci';
const {Ellipse, Polyline, ImageShape, Rect, Polygon, Circle } = Shapes;
```

```ts
const vinci = new VinciCanvas();

const rect = new Shapes.Rect({ left: 10, top: 20, width: 300, height: 200 });
vinci.add(rect);
const circle = new Shapes.Circle({ cx: 50, cy: 50, r: 100});
vinci.add(circle);

const img = new ImageShape();
const url = 'http://xxx.jpg';   // it must be allowed cross origin!!!
await img.loadFromImage(url);
img.set({
  left: 300,
  top: 200,
});

vinci.add(img);

// get the container element of vinci and you can append it to the DOM
vinci.getElement();
```

# TODO list

* Path shape
* Textbox shape
* group function    
* behavior improvement    
* serialization
* color validation
* scale improvement 
* fillStyle/strokeStyle/ refactor   
* event improvement   
* drawing mode  

After these features done, it will be published in public. 


# roadmap 






