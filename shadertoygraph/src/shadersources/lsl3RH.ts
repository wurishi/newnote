import { Config } from '../type'

import fragment from './glsl/lsl3RH.glsl?raw'

export default [
    {
        name: 'lsl3RH',
        type: 'image',
        fragment,
    },
] as Config[]
