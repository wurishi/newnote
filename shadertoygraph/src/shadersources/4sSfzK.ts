import { Config } from '../type'
import fragment from './glsl/4sSfzK.glsl?raw'
import A from './glsl/4sSfzK_A.glsl?raw'
export default [
    {
        name: '4sSfzK',
        type: 'image',
        fragment,
        channels: [],
    },

    {
        name: 'Buffer A',
        type: 'buffer',
        fragment: A,
        channels: [],
    },
] as Config[]
