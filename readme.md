# vinci.js (in development)

vinci.js is an interactive 2D graphic canvas library engine. It can be used to support 2D picture edit, data visualization, video editting, etc.   

Currently, it already has the basic interactive feature, and it is still in development. 

![demo1](https://github.com/wangmengHB/vinci/blob/master/images/demo1.png =250x)

# install
```bash
npm install --S vinci
```

# usage
```ts
import { VinciCanvas, StaticVinciCanvas, Shapes } from 'vinci';
```

```ts
const vinci = new VinciCanvas();

const rect = new Shapes.Rect({ left: 10, top: 20, width: 300, height: 200 });

const circle = new Shapes.Circle({ cx: 50, cy: 50, r: 100});

vinci.add(rect);
vinci.add(circle);

// append vinci to the DOM
vinci.getElement();

```


# TODO list

* Path shape
* Textbox shape
* group function        
* fillStyle/strokeStyle/ refactor
* drawing mode  

After these feature done, it will be published in public. 


# roadmap 






