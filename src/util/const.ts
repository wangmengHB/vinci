


export type SHAPE_TYPE = 'rect' | 'circle' | 'ellipse' | 'line' | 'polyline' | 'polygon';

export const MTR_LENGTH = 20;

export const DIMS_PROPERTIES = ['left', 'top', 'width', 'height'];

export const TRANSFORM_PROPERTIES = [
  'angle', 'skewX', 'skewY', 'scaleX', 'scaleY', 'transelateX', 'translateY',
];

export const SHAPE_PROPERTIES = [
  'x', 'y',  'rx', 'ry',
  'cx', 'cy', 'r',
  'cx', 'cy', 'rx', 'ry',
  'x1', 'x2', 'y1', 'y2',
  'points',
];

export const DRAWING_PROPERTIES = [
  'lineWidth', 'fillStyle', 'strokeStyle', 'lineDash',
];