import { Config } from '../type'
import fragment from './glsl/4sl3Dr.glsl?raw'
export default [
    {
        // '4sl3Dr': 'Digital Brain',
        name: '4sl3Dr',
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
        ],
    },
] as Config[]
