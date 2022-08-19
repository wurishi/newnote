import { ShaderToy } from '../type'
import Image from './glsl/4sf3Rn.glsl?raw'

export default {
    key: '4sf3Rn',
    name: 'Planet',
    shaderList: [
        {
            name: 'Image',
            getFragment() {
                return Image
            },
            channels: [
                { type: 'Img', value: '/textures/Organic4.jpeg' },
                { type: 'Img', value: '/textures/Organic2.jpeg' },
            ],
        },
    ],
} as ShaderToy
