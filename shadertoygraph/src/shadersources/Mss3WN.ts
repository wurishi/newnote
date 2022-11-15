import { Config } from '../type'
import fragment from './glsl/Mss3WN.glsl?raw'
export default [
    {
        // 'Mss3WN': 'MetaHexaBalls',
        name: 'Mss3WN',
        type: 'image',
        fragment,
        channels: [],
    },
] as Config[]
