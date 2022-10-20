import { Config } from '../type'

import Image from './glsl/4dcGW2.glsl?raw'
import A from './glsl/4dcGW2_a.glsl?raw'
import B from './glsl/4dcGW2_b.glsl?raw'
import C from './glsl/4dcGW2_c.glsl?raw'
import D from './glsl/4dcGW2_d.glsl?raw'

export default [
    {
        name: '4dcGW2',
        type: 'image',
        fragment: Image,
        channels: [
            {
                type: 'buffer',
                id: 0,
            },
            {
                type: 'buffer',
                id: 2,
            },
            {
                type: 'Empty',
            },
            {
                type: 'texture',
                src: 'RGBANoiseMedium',
            },
        ],
    },
    {
        name: 'A',
        type: 'buffer',
        fragment: A,
        channels: [
            {
                type: 'buffer',
                id: 0,
            },
            {
                type: 'buffer',
                id: 2,
            },
            {
                type: 'buffer',
                id: 3,
            },
            {
                type: 'texture',
                src: 'RGBANoiseMedium',
            },
        ],
    },
    {
        name: 'B',
        type: 'buffer',
        fragment: B,
        channels: [
            {
                type: 'buffer',
                id: 0,
            },
        ],
    },
    {
        name: 'C',
        type: 'buffer',
        fragment: C,
        channels: [
            {
                type: 'buffer',
                id: 1,
            },
        ],
    },
    {
        name: 'D',
        type: 'buffer',
        fragment: D,
        channels: [
            {
                type: 'buffer',
                id: 0,
            },
        ],
    },
] as Config[]
