


export type SHAPE_TYPE = 'rect' | 'circle' | 'ellipse' | 'line' | 'polyline' | 'polygon';

export const MTR_LENGTH = 20;

export const DIMS_PROPERTIES: string[] = ['left', 'top', 'width', 'height'];

export const TRANSFORM_PROPERTIES: string[] = [
  'angle', 'skewX', 'skewY', 'scaleX', 'scaleY', 'transelateX', 'translateY',
];

export const SHAPE_PROPERTIES: string[] = [
  'x', 'y',  'rx', 'ry',
  'cx', 'cy', 'r',
  'cx', 'cy', 'rx', 'ry',
  'x1', 'x2', 'y1', 'y2',
  'points',
];

export const DRAWING_PROPERTIES: string[] = [
  'lineWidth', 'fillStyle', 'strokeStyle', 'lineDash',
];


export const RENDERING_PROPERTIES: string[] = ([] as string[]).concat(
  SHAPE_PROPERTIES, 
  DIMS_PROPERTIES,
  TRANSFORM_PROPERTIES,
  DRAWING_PROPERTIES,
);

