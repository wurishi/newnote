import { GUI } from 'dat.gui';

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

export function getSymbol(ignore: string[] = []) {
  const arr = [
    'emptyCircle',
    'circle',
    'rect',
    'roundRect',
    'triangle',
    'diamond',
    'pin',
    'arrow',
    'none',
  ];
  const map: any = {};
  arr.forEach((v) => (map[v] = v));
  map['image'] =
    'image://https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/searchbox/nicon-10750f3f7d.png';
  map['dataURI'] =
    'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7';
  map['path'] =
    'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z';
  ignore.forEach((s) => {
    const index = arr.indexOf(s);
    if (index >= 0) {
      arr.splice(index, 1);
    }
    delete map[s];
  });
  return {
    arr,
    map,
  };
}

export function uiListOrColor(
  ui: GUI,
  list: string[],
  callback: Function,
  useAlpha: boolean = false,
  name: string = 'color',
  defaultColor: string = 'rgba(0,0,0,1)'
) {
  list.push('#color');
  const tmp = {
    mode: list[0],
    color: defaultColor,
    alpha: 1,
  };
  const change = () => {
    let v = tmp.mode;
    if (v === '#color') {
      if (useAlpha) {
        const arr = tmp.color.split(',');
        arr[arr.length - 1] = tmp.alpha + ')';
        tmp.color = arr.join(',');
      }
      v = tmp.color;
    }
    callback(v);
  };
  if (list.length > 1) {
    ui.add(tmp, 'mode', list).name(name).onChange(change);
  }

  ui.addColor(tmp, 'color').name(`${name}=#color`).onChange(change);
  if (useAlpha) {
    ui.add(tmp, 'alpha', 0, 1, 0.05)
      .name(`${name}=#color.alpha`)
      .onChange(change);
  }

  // {
  //   type: 'linear',
  //   x:0, y:0, x2:0, y2:1,
  //   colorStops: [
  //     {offset:0, color: 'red'},
  //     {offset:1, color: 'blue'},
  //   ],
  //   global: false
  // }
  // {
  //   type: 'radial',
  //   x:0.5, y:0.5, r:0.5,
  //   colorStops: [
  //     {offset:0, color: 'red'},
  //     {offset:1, color: 'blue'},
  //   ],
  //   global: false
  // }
  // {
  //   image: imageDom, // HTMLImageElement, HTMLCanvasElement
  //   repeat: 'repeat' // 'repeat', 'repeat-x', 'repeat-y', 'no-repeat'
  // }
}

export function uiArr(
  ui: GUI,
  obj: any,
  key: string,
  params: any[],
  callback: Function,
  arrLen: number = 2
) {
  for (let i = 0; i < arrLen; i++) {
    ui.add({ a: obj[key][i] }, 'a', ...params)
      .name(`${key}[${i}]`)
      .onChange((v) => {
        obj[key][i] = v;
        callback();
      });
  }
}

export const position = {
  enum: [
    'top',
    'left',
    'right',
    'bottom',
    'inside',
    'insideLeft',
    'insideRight',
    'insideTop',
    'insideBottom',
    'insideTopLeft',
    'insideBottomLeft',
    'insideTopRight',
    'insideBottomRight',
  ],
};

export const pie_position = {
  enum: ['outside', 'inside', 'inner', 'center'],
};

export const fontStyle = {
  enum: ['normal', 'italic', 'oblique'],
};

export const fontWeight = {
  enum: [
    'normal',
    'bold',
    'bolder',
    'lighter',
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    1000,
  ],
};

export const align = {
  enum: ['left', 'center', 'right'],
};

export const verticalAlign = {
  enum: ['top', 'middle', 'bottom'],
};

export const borderType = {
  enum: ['solid', 'dashed', 'dotted'],
};

export const overflow = {
  enum: ['none', 'truncate', 'break', 'breakAll'],
};

export const lineOverflow = {
  enum: ['none', 'truncate'],
};

export const alignTo = {
  enum: ['none', 'labelLine', 'edge'],
};

export const target = {
  enum: ['blank', 'self'],
};

export const textAlign = {
  enum: ['auto', 'left', 'right', 'center'],
};

export const textVerticalAlign = {
  enum: ['auto', 'top', 'bottom', 'middle'],
};

export const cap = {
  enum: ['butt', 'round', 'square'],
};

export const join = {
  enum: ['bevel', 'round', 'miter'],
};

export function batchLineStyle(
  ui: GUI,
  params: any,
  obj: any,
  changeOptions: () => void
) {
  const keys = Object.keys(params);
  keys.forEach((key) => {
    const defaultV = params[key];
    switch (key) {
      case 'color':
      case 'shadowColor':
        {
          uiListOrColor(
            ui,
            [],
            (v: any) => {
              obj[key] = v;
              changeOptions();
            },
            true,
            key,
            defaultV
          );
        }
        break;
      case 'width':
      case 'dashOffset':
      case 'miterLimit':
      case 'shadowBlur':
        {
          obj[key] = obj[key] || defaultV;
          ui.add(obj, key, 0, 50, 1).onChange(changeOptions);
        }
        break;
      case 'shadowOffsetX':
      case 'shadowOffsetY':
        {
          obj[key] = obj[key] || defaultV;
          ui.add(obj, key, -100, 100, 1).onChange(changeOptions);
        }
        break;
      case 'opacity':
        {
          obj[key] = obj[key] || defaultV;
          ui.add(obj, key, 0, 1, 0.1).onChange(changeOptions);
        }
        break;
      case 'type':
        {
          obj.type = obj.type || defaultV;
          ui.add(obj, 'type', borderType.enum).onChange(changeOptions);
        }
        break;
      case 'cap':
        {
          obj.cap = obj.cap || defaultV;
          ui.add(obj, 'cap', cap.enum).onChange(changeOptions);
        }
        break;
      case 'join':
        {
          obj.join = obj.join || defaultV;
          ui.add(obj, 'join', join.enum).onChange(changeOptions);
        }
        break;
    }
  });
}
