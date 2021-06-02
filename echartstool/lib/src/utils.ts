export function rgbToNumber(rgb: number[]) {
  let num = 0;
  num = (rgb[0] << 16) & 0xff0000;
  num += (rgb[1] << 8) & 0x00ff00;
  num += rgb[2] & 0x0000ff;

  return num;
}

const stringOrBoolean = (v: string) => {
  if (v == 'false') {
    return false;
  } else if (v == 'true') {
    return true;
  }
  return v;
};

export const selectedMode = {
  enum: ['false', 'single', 'multiple'],
  fn: stringOrBoolean,
};

export const sampling = {
  enum: ['false', 'lttb', 'average', 'max', 'min', 'sum'],
  fn: stringOrBoolean,
};

export const cursor = {
  enum: [
    'auto',
    'default',
    'none',
    'context-menu',
    'help',
    'pointer',
    'progress',
    'wait',
    'cell',
    'crosshair',
    'text',
    'vertical-text',
    'alias',
    'copy',
    'move',
    'no-drop',
    'not-allowed',
    'grab',
    'grabbing',
    'all-scroll',
    'col-resize',
    'row-resize',
    'n-resize',
    'e-resize',
    's-resize',
    'w-resize',
    'ne-resize',
    'nw-resize',
    'se-resize',
    'sw-resize',
    'ew-resize',
    'ns-resize',
    'nesw-resize',
    'nwse-resize',
    'zoom-in',
    'zoom-out',
  ],
};

export const roseType = {
  enum: ['false', 'radius', 'area'],
  fn: stringOrBoolean,
};
