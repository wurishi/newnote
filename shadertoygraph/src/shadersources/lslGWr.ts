import { Config } from '../type'
import fragment from './glsl/lslGWr.glsl?raw'
export default [
    {
        // 'lslGWr': 'Simplicity',
        name: 'lslGWr',
        type: 'image',
        fragment,
        channels: [],
    },
] as Config[]
