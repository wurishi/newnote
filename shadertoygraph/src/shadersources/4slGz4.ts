import { Config } from '../type'
import fragment from './glsl/4slGz4.glsl?raw'
export default [
    {
        // '4slGz4': 'Demo - Volumetric Lines',
        name: '4slGz4',
        type: 'image',
        fragment,
        channels: [
            {
                type: 'music',
            },
        ],
    },
] as Config[]
