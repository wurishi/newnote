import { EffectPassInfo, EffectPassInput, TEXFMT, TEXTYPE } from '../type'
import { sampler2Renderer } from '../utils'
import { CreateTextureFromImage } from '../utils/texture'

export default function NewImageTexture(
    gl: WebGL2RenderingContext,
    url: EffectPassInfo
): EffectPassInput {
    const input: EffectPassInput = {
        mInfo: url,
        loaded: false,
    }
    const image = new Image()
    const imageLoadHandler = () => {
        const rti = sampler2Renderer(url.sampler)
        let channels = TEXFMT.C4I8
        // TODO: C1I8
        input.globject = CreateTextureFromImage(
            gl,
            TEXTYPE.T2D,
            [image],
            channels,
            rti.filter,
            rti.wrap,
            rti.vflip
        )
        input.loaded = true
    }
    const imageDestroy = () => {
        image.removeEventListener('load', imageLoadHandler)
        input.globject?.Destroy()
    }

    input.texture = {
        image,
        destroy: imageDestroy,
    }

    image.crossOrigin = ''
    image.addEventListener('load', imageLoadHandler)
    image.src = url.src

    return input
}
