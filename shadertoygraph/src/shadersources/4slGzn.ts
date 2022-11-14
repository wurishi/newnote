import { Config } from '../type'
import fragment from './glsl/4slGzn.glsl?raw'
export default [
    {
        // '4slGzn': 'Rasterizer - Object',
        name: '4slGzn',
        type: 'image',
        fragment,
        channels: [
            {
                type: 'texture',
                src: 'RustyMetal',
                filter: 'mipmap',
                wrap: 'repeat',
                noFlip: true,
            },
        ],
    },
] as Config[]
