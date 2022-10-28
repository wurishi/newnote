import { Config } from '../type'
import fragment from './glsl/MslGWN.glsl?raw'

export default [
    {
        name: 'MslGWN',
        type: 'image',
        fragment,
        channels: [{ type: 'music' }],
    },
] as Config[]
