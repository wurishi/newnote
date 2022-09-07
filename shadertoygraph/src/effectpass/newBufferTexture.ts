import { EffectPassInfo, EffectPassInput } from '../type'

export default function NewBufferTexture(url: EffectPassInfo): EffectPassInput {
    const input: EffectPassInput = {
        mInfo: url,
        loaded: true,
        buffer: {
            id: url.channel,
            destroy: () => {},
        },
    }

    return input
}
