import { EffectPassInfo, EffectPassInput, TEXFMT, TEXTYPE } from '../type'
import { sampler2Renderer } from '../utils'
import { CreateTextureFromImage } from '../utils/texture'

export default function NewWebCamTexture(
    gl: WebGL2RenderingContext,
    url: EffectPassInfo
): EffectPassInput {
    const input: EffectPassInput = {
        mInfo: url,
        loaded: false,
    }

    const video = document.createElement('video')
    video.width = 320
    video.height = 240
    video.autoplay = true
    video.loop = true

    const rti = sampler2Renderer(url.sampler)

    // TODO: size
    navigator.mediaDevices
        .getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
        .then((stream) => {
            video.srcObject = stream
        })

    const canplay = () => {
        input.loaded = true

        if (input.globject) {
            input.globject.Destroy()
        }
        input.globject = CreateTextureFromImage(
            gl,
            TEXTYPE.T2D,
            [video as any],
            TEXFMT.C4I8,
            rti.filter,
            rti.wrap,
            rti.vflip
        )
    }
    video.addEventListener('canplay', canplay)

    input.video = {
        video,
        destroy() {
            video.removeEventListener('canplay', canplay)
            video.pause()
            video.src = ''

            if (video.srcObject) {
                const tmp = video.srcObject as any
                if (tmp.getVideoTracks) {
                    const tracks = tmp.getVideoTracks()
                    if (tracks) {
                        tracks[0].stop()
                    }
                }
                input.globject?.Destroy()
            }
        },
    }
    return input
}
