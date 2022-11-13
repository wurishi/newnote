import { Config } from '../type';
import fragment from './glsl/MsXGRf.glsl?raw';
export default [
  {
    // 'MsXGRf': 'Flames',
    name: 'MsXGRf',
    type: 'image',
    fragment,
    channels: [
      {
        type: 'texture',
        src: 'RGBANoiseMedium',
        filter: 'linear',
        wrap: 'repeat',
        noFlip: true,
      },
    ],
  },
] as Config[];
