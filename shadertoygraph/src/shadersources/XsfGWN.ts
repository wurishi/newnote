import { Config } from '../type'
import fragment from './glsl/XsfGWN.glsl?raw'
export default [
    {
        // 'XsfGWN': 'furball',
        name: 'XsfGWN',
        type: 'image',
        fragment,
        channels: [
            {
                type: 'texture',
                src: 'RGBANoiseMedium',
                filter: 'mipmap',
                wrap: 'repeat',
                noFlip: true,
            },
            {
                type: 'texture',
                src: 'RGBANoiseMedium',
                filter: 'mipmap',
                wrap: 'repeat',
                noFlip: true,
            },
        ],
    },
] as Config[]
