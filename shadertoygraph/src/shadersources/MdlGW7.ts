import { Config } from '../type';

import fragment from './glsl/MdlGW7.glsl?raw';
import a from './glsl/MdlGW7_a.glsl?raw';

export default [
  {
    name: 'MdlGW7',
    type: 'image',
    fragment,
    channels: [{ type: 'buffer', id: 0 }],
  },
  {
    type: 'buffer',
    fragment: a,
    channels: [
      { type: 'texture', src: 'GrayNoiseMedium', filter:'linear',noFlip:true },
      { type: 'texture', src: 'Abstract1',noFlip:true },
      { type: 'buffer', id: 0 },
      { type: 'texture', src: 'RGBANoiseSmall',noFlip:true },
    ],
  },
] as Config[];
