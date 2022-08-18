import { ShaderToy } from '../type'
import Image from './glsl/ldfyzl.glsl?raw'

export default {
    key: 'ldfyzl',
    name: 'Rainier mood',
    shaderList: [
        {
            name: 'Image',
            getFragment() {
                return Image
            },
            channels: [{ type: 'Img', value: '/img.jpeg' }],
        },
    ],
} as ShaderToy
