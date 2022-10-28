import { Config } from '../type'

import Image from './glsl/XsX3RB.glsl?raw'
import A from './glsl/XsX3RB_a.glsl?raw'

export default [
    {
        name: 'XsX3RB',
        type: 'image',
        fragment: Image,
        channels: [{ type: 'buffer', id: 0 }],
    },
    {
        name: 'A',
        type: 'buffer',
        fragment: A,
        channels: [
            {
                type: 'texture',
                src: 'RGBANoiseMedium',
                filter: 'linear',
                noFlip: true,
            },
            { type: 'texture', src: 'Lichen', noFlip: true },
            { type: 'texture', src: 'Organic2', noFlip: true },
        ],
    },
] as Config[]
