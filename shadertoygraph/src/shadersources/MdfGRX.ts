import { Config } from '../type'

import fragment from './glsl/MdfGRX.glsl?raw'
export default [
    {
        name: 'MdfGRX',
        type: 'image',
        fragment,
        channels: [
            { type: 'texture', src: 'RGBANoiseMedium', filter: 'linear' },
        ],
    },
] as Config[]
