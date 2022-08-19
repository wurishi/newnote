import { ShaderToy } from '../type'
import { DEFAULT_TEXTURE_SETTING } from '../utils'
import Image from './glsl/MdG3Dd.glsl?raw'
import A from './glsl/MdG3Dd_a.glsl?raw'
import B from './glsl/MdG3Dd_b.glsl?raw'

export default {
    key: 'MdG3Dd',
    name: 'Synaptic',
    shaderList: [
        {
            name: 'Image',
            getFragment() {
                return Image
            },
            channels: [
                {
                    type: 'Buffer',
                    value: 'BufferB',
                    setting: DEFAULT_TEXTURE_SETTING,
                },
            ],
        },
        {
            name: 'BufferA',
            getFragment() {
                return A
            },
            channels: [
                {
                    type: 'Buffer',
                    value: 'BufferA',
                    setting: { filter: 'NEAREST', wrap: 'CLAMP' },
                },
                { type: 'Img', value: '/textures/RGBANoiseMedium.png' },
            ],
        },
        {
            name: 'BufferB',
            getFragment() {
                return B
            },
            channels: [
                {
                    type: 'Buffer',
                    value: 'BufferA',
                    setting: { filter: 'NEAREST', wrap: 'CLAMP' },
                },
                {
                    type: 'Buffer',
                    value: 'BufferB',
                    setting: { filter: 'NEAREST', wrap: 'CLAMP' },
                },
            ],
        },
    ],
} as ShaderToy
