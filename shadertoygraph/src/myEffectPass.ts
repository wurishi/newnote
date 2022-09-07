import {
    CreateShaderResolveSucc,
    EffectPassInfo,
    EffectPassInput,
    EffectPassSoundProps,
    FILTER,
    PaintParam,
    PassType,
    TEXFMT,
    TextureInfo,
    TEXTYPE,
    TEXWRP,
} from './type'
import { isMobile } from './utils'
import { createRenderTarget, setRenderTarget } from './utils/renderTarget'
import { createTexture } from './utils/texture'
import NewImageTexture from './effectpass/newImageTexture'
import NewVolumeTexture from './effectpass/newVolumeTexture'
import NewBufferTexture from './effectpass/newBufferTexture'
import createShader from './utils/createShader'

type DestroyCall = {
    (wa: AudioContext): void
}

export default class MyEffectPass {
    public static IS_LOW_END = isMobile()

    private mGL
    private mID
    private mType?: PassType
    private mProgram?: CreateShaderResolveSucc | null

    private mHeader
    private mSource
    private mInputs: EffectPassInput[]
    private mOutputs: any[]
    private destroyCall: DestroyCall | null

    private soundProps: EffectPassSoundProps | null

    private mFrame

    constructor(gl: WebGL2RenderingContext, id: number) {
        this.mGL = gl
        this.mID = id
        this.mHeader = ''
        this.mSource = ''
        this.mInputs = [null, null, null, null]
        this.mOutputs = [null, null, null, null]
        this.destroyCall = null
        this.soundProps = null

        this.mFrame = 0
    }

    public Destroy(wa: any) {
        this.destroyCall && this.destroyCall(wa)
        this.destroyCall = null
    }

    public Create = (passType: PassType, wa?: AudioContext) => {
        this.mType = passType
        switch (passType) {
            case 'image':
                this.Create_Image(wa)
                break
            case 'sound':
                wa && this.Create_Sound(wa)
                break
            case 'buffer':
                this.Create_Buffer(wa)
                break
            case 'common':
                this.Create_Common(wa)
                break
            case 'cubemap':
                this.Create_Cubemap(wa)
                break
        }
    }

    public NewTexture = (
        wa: any,
        slot: number,
        url?: EffectPassInfo,
        buffers?: any,
        cubeBuffers?: any,
        keyboard?: any
    ): TextureInfo => {
        const result: TextureInfo = {
            failed: true,
        }
        let input: EffectPassInput = null
        if (url === null || !url?.type) {
            result.needsShaderCompile = false
            this.resetTexture(slot, null)
            result.failed = false
        } else if (url.type === 'texture') {
            input = NewImageTexture(this.mGL, url)

            result.needsShaderCompile =
                this.mInputs[slot] === null ||
                (this.mInputs[slot]?.mInfo.type !== 'texture' &&
                    this.mInputs[slot]?.mInfo.type !== 'webcam' &&
                    this.mInputs[slot]?.mInfo.type !== 'mic' &&
                    this.mInputs[slot]?.mInfo.type !== 'music' &&
                    this.mInputs[slot]?.mInfo.type !== 'musicstream' &&
                    this.mInputs[slot]?.mInfo.type !== 'keyboard' &&
                    this.mInputs[slot]?.mInfo.type !== 'video')
            this.resetTexture(slot, input)
            result.failed = false
        } else if (url.type === 'volume') {
            input = NewVolumeTexture(this.mGL, url)

            result.needsShaderCompile =
                this.mInputs[slot] === null ||
                this.mInputs[slot]?.mInfo.type !== 'volume'
            this.resetTexture(slot, input)
            result.failed = false
        } else if (url.type === 'cubemap') {
            // TODO: cubemap
        } else if (url.type === 'webcam') {
            // TODO: webcam
        } else if (url.type === 'mic') {
            // TODO: mic
        } else if (url.type === 'video') {
            // TODO: video
        } else if (url.type === 'music' || url.type === 'musicstream') {
            // TODO: music
        } else if (url.type === 'keyboard') {
            // TODO: keyboard
        } else if (url.type === 'buffer') {
            input = NewBufferTexture(url)

            result.needsShaderCompile =
                this.mInputs[slot] === null ||
                (this.mInputs[slot]?.mInfo.type !== 'texture' &&
                    this.mInputs[slot]?.mInfo.type !== 'webcam' &&
                    this.mInputs[slot]?.mInfo.type !== 'mic' &&
                    this.mInputs[slot]?.mInfo.type !== 'music' &&
                    this.mInputs[slot]?.mInfo.type !== 'musicstream' &&
                    this.mInputs[slot]?.mInfo.type !== 'keyboard' &&
                    this.mInputs[slot]?.mInfo.type !== 'video')
            this.DestroyInput(slot)
            this.mInputs[slot] = input

            // TODO: resetbuffer
            // this.SetSamplerFilter(slot, url.sampler.filter, buffers, cubeBuffers)
            // this.SetSamplerVFlip(slot, url.sampler.vflip)
            // this.SetSamplerWrap(slot, url.sampler.wrap, buffers)
            this.MakeHeader()
        }
        return result
    }

    private SetSamplerFilter = (
        id: number,
        str: string,
        buffers: any,
        cubeBuffers: any
    ) => {
        // const inp = this.mInputs[id]
        // let filter = FILTER.NONE
        // if(str === 'linear') filter = FILTER.LINEAR
        // if(str === 'mipmap') filter = FILTER.MIPMAP
        // if(inp === null) {}
        // else if(inp.mInfo.type === 'texture') {
        // }
    }

    private resetTexture(slot: number, input: EffectPassInput) {
        this.DestroyInput(slot)
        this.mInputs[slot] = input
        this.MakeHeader()
    }

    private DestroyInput = (id: number) => {
        if (this.mInputs[id] === null) {
            return
        }
        if (this.mInputs[id]?.mInfo.type === 'texture') {
            this.mInputs[id]?.texture?.destroy()
        }
    }

    private Create_Image = (wa: any) => {
        this.MakeHeader()

        this.mProgram = null
        this.destroyCall = this.Destroy_Image
    }

    private Destroy_Image: DestroyCall = (wa) => {}

    private Create_Sound = (wa: AudioContext) => {
        this.MakeHeader()
        const mSampleRate = 44100,
            mPlayTime = 60 * 3,
            mTextureDimensions = 512
        const mPlaySamples = mPlayTime * mSampleRate
        this.soundProps = {
            mSampleRate,
            mPlayTime,
            mPlaySamples,
            mTextureDimensions,
            mTmpBufferSamples: mTextureDimensions * mTextureDimensions,
            mPlaying: false,
            mSoundShaderCompiled: false,
        }
        this.soundProps.mBuffer = wa.createBuffer(2, mPlaySamples, mSampleRate)
        this.soundProps.mRenderTexture = createTexture(
            this.mGL,
            TEXTYPE.T2D,
            mTextureDimensions,
            mTextureDimensions,
            TEXFMT.C4I8,
            FILTER.NONE,
            TEXWRP.CLAMP,
            null
        )
        this.soundProps.mRenderFBO = createRenderTarget(
            this.mGL,
            this.soundProps.mRenderTexture,
            null,
            false
        )
        this.soundProps.mData = new Uint8Array(
            this.soundProps.mTmpBufferSamples * 4
        )

        this.destroyCall = this.Destroy_Sound
    }

    private Destroy_Sound: DestroyCall = (wa) => {
        if (this.soundProps) {
            this.soundProps.mPlayNode?.stop()
            this.soundProps.mPlayNode = undefined
            this.soundProps.mBuffer = undefined
            this.soundProps.mData = undefined
            this.soundProps.mRenderFBO?.Destroy()
            this.soundProps.mRenderFBO = undefined
            this.soundProps.mRenderTexture?.Destroy()
            this.soundProps.mRenderTexture = undefined
        }
    }

    private Create_Buffer = (wa: any) => {
        this.MakeHeader()
        this.mProgram = null
        this.destroyCall = this.Destroy_Buffer
    }

    private Destroy_Buffer: DestroyCall = (wa) => {}

    private Create_Common = (wa: any) => {
        this.MakeHeader()
        this.mProgram = null
        this.destroyCall = this.Destroy_Common
    }

    private Destroy_Common: DestroyCall = (wa) => {}

    private Create_Cubemap = (wa: any) => {
        this.MakeHeader()
        this.mProgram = null
        this.destroyCall = this.Destroy_Cubemap
    }

    private Destroy_Cubemap: DestroyCall = (wa) => {}

    private MakeHeader = () => {
        switch (this.mType) {
            case 'image':
                this.MakeHeader_Image()
                break
            case 'sound':
                this.MakeHeader_Sound()
                break
            case 'buffer':
                this.MakeHeader_Buffer()
                break
            case 'common':
                this.MakeHeader_Common()
                break
            case 'cubemap':
                this.MakeHeader_Cubemap()
                break
        }
    }

    private MakeHeader_Image = () => {
        let header = [
            `#define HW_PERFORMANCE ${MyEffectPass.IS_LOW_END === true ? 0 : 1}
            uniform vec3    iResolution;
            uniform float   iTime;
            uniform float   iChannelTime[4];
            uniform vec4    iMouse;
            uniform vec4    iDate;
            uniform float   iSampleRate;
            uniform vec3    iChannelResolution[4];
            uniform int     iFrame;
            uniform float   iTimeDelta;
            uniform float   iFrameRate;
        `,
        ]

        this.mInputs.forEach((inp, i) => {
            let channelType = 'sampler2D'
            switch (inp?.mInfo.type) {
                case 'cubemap':
                    channelType = 'samplerCube'
                    break
                case 'volume':
                    channelType = 'sampler3D'
                    break
            }
            header.push(`
            uniform ${channelType} iChannel${i};
            uniform struct {
                ${channelType} sampler;
                vec3    size;
                float   time;
                int     loaded;
            }iCh${i};
            `)
        })
        header.push(`
        void mainImage(out vec4 c, in vec2 f);
        void st_assert(bool cond);
        void st_assert(bool cond, int v);
        out vec4 shadertoy_out_color;
        void st_assert(bool cond, int v) {
            if(!cond) {
                if(v == 0) {
                    shadertoy_out_color.x = -1.0;
                }
                else if(v == 1) {
                    shadertoy_out_color.y = -1.0;
                }
                else if(v == 2) {
                    shadertoy_out_color.z = -1.0;
                }
                else {
                    shadertoy_out_color.w = -1.0;
                }
            }
        }
        void st_assert(bool cond) {
            if(!cond) {
                shadertoy_out_color.x = -1.0;
            }
        }
        void main(void) {
            shadertoy_out_color = vec4(1.0, 1.0, 1.0, 1.0);
            vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
            mainImage(color, gl_FragCoord.xy);
            if(shadertoy_out_color.x < 0.0) color = vec4(1.0, 0.0, 0.0, 1.0);
            if(shadertoy_out_color.y < 0.0) color = vec4(0.0, 1.0, 0.0, 1.0);
            if(shadertoy_out_color.z < 0.0) color = vec4(0.0, 0.0, 1.0, 1.0);
            if(shadertoy_out_color.w < 0.0) color = vec4(1.0, 1.0, 0.0, 1.0);
            shadertoy_out_color = vec4(color.xyz, 1.0);
        }
        `)
        this.mHeader = header.join('\n') + '\n'
    }

    private MakeHeader_Sound = () => {
        let header = [
            `#define HW_PERFORMANCE ${MyEffectPass.IS_LOW_END === true ? 0 : 1}
            uniform float   iChannelTime[4];
            uniform float   iTimeOffset;
            uniform int     iSampleOffset;
            uniform vec4    iDate;
            uniform float   iSampleRate;
            uniform vec3    iChannelResolution[4];
            `,
        ]

        this.mInputs.forEach((inp, i) => {
            let channelType = 'sampler2D'
            if (inp?.mInfo.type === 'cubemap') {
                channelType = 'samplerCube'
            }
            header.push(`uniform ${channelType} iChannel${i};`)
        })
        header.push(`
        vec2 mainSound(in int samp, float time);
        out vec4 outColor;
        void main() {
            float t = iTimeOffset + ((gl_FragCoord.x - 0.5) + (gl_FragCoord.y - 0.5) * 512.0) / iSampleRate;
            int s = iSampleOffset + int(gl_FragCoord.y - 0.2) * 512 + int(gl_FragCoord.x - 0.2);
            vec2 y = mainSound(s, t);
            vec2 v = floor((0.5 + 0.5 * y) * 65536.0);
            vec2 vl = mod(v, 256.0) / 255.0;
            vec2 vh = floor(v / 256.0) / 255.0;
            outColor = vec4(vl.x, vh.x, vl.y, vh.y);
        }
        `)
        this.mHeader = header.join('\n') + '\n'
    }

    private MakeHeader_Buffer = () => {
        const header = [
            `
        #define HW_PERFORMANCE ${MyEffectPass.IS_LOW_END === true ? 0 : 1}
        uniform vec3    iResolution;
        uniform float   iTime;
        uniform float   iChannelTime[4];
        uniform vec4    iMouse;
        uniform vec4    iDate;
        uniform float   iSampleRate;
        uniform vec3    iChannelResolution[4];
        uniform int     iFrame;
        uniform float   iTimeDelta;
        uniform float   iFrameRate;
        `,
        ]
        this.mInputs.forEach((inp, i) => {
            let channelType = 'sampler2D'
            switch (inp?.mInfo.type) {
                case 'cubemap':
                    channelType = 'samplerCube'
                    break
                case 'volume':
                    channelType = 'sampler3D'
                    break
            }
            header.push(`uniform ${channelType} iChannel${i};`)
        })
        header.push(`
        void mainImage(out vec4 c, in vec2 f);
        out vec4 outColor;
        void main(void) {
            vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
            mainImage(color, gl_FragCoord.xy);
            outColor = color;
        }
        `)
        this.mHeader = header.join('\n') + '\n'
    }

    private MakeHeader_Common = () => {
        this.mHeader = `
        uniform vec4    iDate;
        uniform float   iSampleRate;
        out vec4 outColor;
        void main(void) {
            outColor = vec4(0.0);
        }
        `
    }

    private MakeHeader_Cubemap = () => {
        const header = [
            `
        #define HW_PERFORMANCE ${MyEffectPass.IS_LOW_END === true ? 0 : 1}
        uniform vec3    iResolution;
        uniform float   iTime;
        uniform float   iChannelTime[4];
        uniform vec4    iMouse;
        uniform vec4    iDate;
        uniform float   iSampleRate;
        uniform vec3    iChannelResolution[4];
        uniform int     iFrame;
        uniform float   iTimeDelta;
        uniform float   iFrameRate;
        `,
        ]
        this.mInputs.forEach((inp, i) => {
            let channelType = 'sampler2D'
            switch (inp?.mInfo.type) {
                case 'cubemap':
                    channelType = 'samplerCube'
                    break
                case 'volume':
                    channelType = 'sampler3D'
                    break
            }
            header.push(`uniform ${channelType} iChannel${i};`)
        })
        header.push(`
        void mainCubemap(out vec4 c, in vec2 f, in vec3 ro, in vec3 rd);
        uniform vec4 unViewport;
        uniform vec3 unCorners[5];
        out vec4 outColor;
        void main(void) {
            vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
            vec3 ro = unCorners[4];
            vec2 uv = (gl_FragCoord.xy - unViewport.xy) / unViewport.zw;
            vec3 rd = normalize(
                mix(
                    mix(unCorners[0], unCorners[1], uv.x),
                    mix(unCorners[3], unCorners[2], uv.x),
                    uv.y
                )
            ) - ro);
            mainCubemap(color, gl_FragCoord.xy - unViewport.xy, ro, rd);
            outColor = color;
        }
        `)
        this.mHeader = header.join('\n') + '\n'
    }

    public NewShader = (commonSourceCodes: string[], preventCache: boolean) => {
        let vs_fs: string[] = []
        switch (this.mType) {
            case 'sound':
                vs_fs = this.NewShader_Sound(this.mSource, commonSourceCodes)
                break
            case 'image':
                vs_fs = this.NewShader_Image(this.mSource, commonSourceCodes)
                break
            case 'buffer':
                vs_fs = this.NewShader_Image(this.mSource, commonSourceCodes)
                break
            case 'common':
                vs_fs = this.NewShader_Common(this.mSource)
                break
            case 'cubemap':
                vs_fs = this.NewShader_Cubemap(this.mSource, commonSourceCodes)
                break
        }

        createShader(
            this.mGL,
            vs_fs[0],
            vs_fs[1],
            preventCache,
            false,
            (state) => {
                if (state.succ) {
                    if (this.mType === 'sound') {
                        this.soundProps &&
                            (this.soundProps.mSoundShaderCompiled = true)
                    }
                    this.mProgram?.Destroy()

                    this.mProgram = state
                }
            }
        )
    }

    private NewShader_Sound = (
        shaderCode: string,
        commonShaderCodes: string[]
    ) => {
        const vsSource =
            'layout(location = 0) in vec2 pos; void main() { gl_Position = vec4(pos.xy, 0.0, 1.0); }'
        let fsSource = this.mHeader
        commonShaderCodes.forEach((commonCode) => {
            fsSource += commonCode + '\n'
        })
        fsSource += shaderCode

        this.soundProps!.mSoundShaderCompiled = false

        return [vsSource, fsSource]
    }

    private NewShader_Image = (
        shaderCode: string,
        commonShaderCodes: string[]
    ) => {
        const vsSource =
            'layout(location = 0) in vec2 pos; void main() { gl_Position = vec4(pos.xy, 0.0, 1.0); }'
        let fsSource = this.mHeader
        commonShaderCodes.forEach((commonCode) => {
            fsSource += commonCode + '\n'
        })
        fsSource += shaderCode
        return [vsSource, fsSource]
    }

    private NewShader_Common = (shaderCode: string) => {
        const vsSource =
            'layout(location = 0) in vec2 pos; void main() { gl_Position = vec4(pos.xy, 0.0, 1.0); }'
        const fsSource = this.mHeader + shaderCode
        return [vsSource, fsSource]
    }

    private NewShader_Cubemap = (
        shaderCode: string,
        commonShaderCodes: string[]
    ) => {
        const vsSource =
            'layout(location = 0) in vec2 pos; void main() { gl_Position = vec4(pos.xy, 0.0, 1.0); }'
        let fsSource = this.mHeader
        commonShaderCodes.forEach((commonCode) => {
            fsSource += commonCode + '\n'
        })
        fsSource += shaderCode

        return [vsSource, fsSource]
    }

    public Paint = (param: PaintParam) => {
        if (this.mType === 'sound') {
            if (this.soundProps?.mSoundShaderCompiled) {
                const returnFlag = this.mInputs.find((inp) => {
                    if (inp) {
                        if (inp.mInfo.type === 'texture' && !inp.loaded) {
                            return true
                        }
                        if (inp.mInfo.type === 'cubemap' && !inp.loaded) {
                            return true
                        }
                    }
                    return false
                })
                if (returnFlag) {
                    return
                }
                this.Paint_Sound(param)
                this.soundProps.mSoundShaderCompiled = false
            }
            if (this.mFrame === 0) {
                // TODO:
            }
            this.mFrame++
        } else if (this.mType === 'image') {
            setRenderTarget(this.mGL)
            this.Paint_Image(param)
            this.mFrame++
        } else if (this.mType === 'common') {
        } else if (this.mType === 'buffer') {
            // resizebuffer
        }
    }

    private Paint_Sound = (param: PaintParam) => {
        // TODO
    }

    private Paint_Image = (param: PaintParam) => {
        // TODO
    }
}
