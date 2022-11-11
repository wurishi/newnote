import { Config } from '../type'
import fragment from './glsl/4sXGRM.glsl?raw'
export default [
    {
        // '4sXGRM': 'Oceanic',
        name: '4sXGRM',
        type: 'image',
        fragment,
        channels: [
            {
                type: 'texture',
                src: 'GrayNoiseMedium',
                filter: 'mipmap',
                wrap: 'repeat',
                noFlip: true,
            },
        ],
    },
] as Config[]
