import { ShaderToy } from '../type'
import Image from './glsl/WlKXRR.glsl?raw'
import BufferA from './glsl/WlKXRR_a.glsl?raw'

export default {
    key: 'WlKXRR',
    name: 'Day 61',
    shaderList: [
        {
            name: 'Image',
            getFragment() {
                return Image
            },
            channels: [{ type: 'Buffer', value: 'BufferA' }],
        },
        {
            name: 'BufferA',
            getFragment: () => BufferA,
        },
    ],
} as ShaderToy
