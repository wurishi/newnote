import { Config } from '../type'
import fragment from './glsl/Mdl3Rr.glsl?raw'
export default [
    {
        // 'Mdl3Rr': 'attic',
        name: 'Mdl3Rr',
        type: 'image',
        fragment,
        channels: [],
    },
] as Config[]
