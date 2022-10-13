import {
    CreateShaderResolveSucc,
    EffectPassInfo,
    EffectPassInput,
    EffectPassSoundProps,
    FILTER,
    GPUDraw,
    PaintParam,
    PassType,
    RenderSoundCallback,
    TEXFMT,
    Texture,
    TextureInfo,
    TEXTYPE,
    TEXWRP,
} from './type'
import {
    createDrawFullScreenTriangle,
    createDrawUnitQuad,
    isMobile,
} from './utils'
import { createRenderTarget, setRenderTarget } from './utils/renderTarget'
import { attachTextures, createTexture, dettachTextures } from './utils/texture'
import NewImageTexture from './effectpass/newImageTexture'
import NewVolumeTexture from './effectpass/newVolumeTexture'
import NewBufferTexture from './effectpass/newBufferTexture'
import createShader from './utils/createShader'
import MyEffect from './myEffect'
import {
    attachShader,
    detachShader,
    getAttribLocation,
    getPixelData,
    getShaderConstantLocation,
    setBlend,
    setShaderConstant1F,
    setShaderConstant1FV,
    setShaderConstant1I,
    setShaderConstant3F,
    setShaderConstant3FV,
    setShaderConstant4FV,
    setShaderTextureUnit,
    setViewport,
} from './utils/attr'
import { createMipmaps } from './utils/index'

type DestroyCall = {
    (wa: AudioContext): void
}

export default class MyEffectPass {
    public static IS_LOW_END = isMobile()

    private mGL
    private mID
    public mType?: PassType
    public mProgram?: CreateShaderResolveSucc | null

    private mHeader
    private mSource
    private mInputs: EffectPassInput[]
    public mOutputs: number[]
    private destroyCall: DestroyCall | null

    private soundProps: EffectPassSoundProps | null

    public mFrame
    private mEffect

    public name: string = ''

    constructor(gl: WebGL2RenderingContext, id: number, effect: MyEffect) {
        this.mGL = gl
        this.mID = id
        this.mHeader = ''
        this.mSource = ''
        this.mInputs = [null, null, null, null]
        this.mOutputs = []
        this.destroyCall = null
        this.soundProps = null

        this.mFrame = 0
        this.mEffect = effect
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

            // result.failed = false
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
            mGainNode: this.mEffect.gainNode,
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
                } else {
                    console.log(state)
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
            if (this.soundProps && this.mFrame === 0) {
                if (this.soundProps.mPlaying && this.soundProps.mPlayNode) {
                    this.soundProps.mPlayNode.disconnect()
                    this.soundProps.mPlayNode.stop()
                    this.soundProps.mPlayNode = null
                }
                if (param.wa) {
                    this.soundProps.mPlaying = true

                    const playNode: AudioBufferSourceNode =
                        param.wa.createBufferSource()
                    this.soundProps.mPlayNode = playNode
                    playNode.buffer = this.soundProps.mBuffer!
                    if (this.soundProps.mGainNode) {
                        playNode.connect(this.soundProps.mGainNode)
                    }
                    playNode.start(0)
                }
            }
            this.mFrame++
        } else if (this.mType === 'image') {
            setRenderTarget(this.mGL, null)
            this.Paint_Image(param)
            this.mFrame++
        } else if (this.mType === 'common') {
        } else if (this.mType === 'buffer') {
            this.Paint_Buffer(param)
            this.mFrame++
        }
    }

    private Paint_Sound = (param: PaintParam) => {
        if (this.soundProps) {
            const { da } = param
            const { mBuffer } = this.soundProps
            const bufL = mBuffer!.getChannelData(0)
            const bufR = mBuffer!.getChannelData(1)

            this.renderSound(da!, (off, data, numSamples) => {
                for (let i = 0; i < numSamples; i++) {
                    bufL[off + i] =
                        -1.0 +
                        (2.0 * (data[4 * i + 0] + 256.0 * data[4 * i + 1])) /
                            65535.0
                    bufR[off + i] =
                        -1.0 +
                        (2.0 * (data[4 * i + 2] + 256.0 * data[4 * i + 3])) /
                            65535.0
                }
            })
        }
    }

    private renderSound = (d: Date, callback: RenderSoundCallback) => {
        const {
            mRenderFBO,
            mTextureDimensions,
            mTmpBufferSamples,
            mPlaySamples,
            mSampleRate,
            mData,
        } = this.soundProps!
        const dates = [
            d.getFullYear(), // the year (four digits)
            d.getMonth(), // the month (from 0-11)
            d.getDate(), // the day of the month (from 1-31)
            d.getHours() * 60.0 * 60 + d.getMinutes() * 60 + d.getSeconds(),
        ]
        const resos = [
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        ]

        setRenderTarget(this.mGL, mRenderFBO!)

        setViewport(this.mGL, [0, 0, mTextureDimensions, mTextureDimensions])
        attachShader(this.mGL, this.mProgram!)
        setBlend(this.mGL, false)

        //
        const texID: Texture[] = []
        this.mInputs.forEach((inp, i) => {
            if (inp === null) {
            } else if (inp.mInfo.type === 'texture') {
                if (inp.loaded) {
                    texID[i] = inp.globject!
                    resos[3 * i + 0] = inp.texture!.image.width
                    resos[3 * i + 1] = inp.texture!.image.height
                    resos[3 * i + 2] = 1
                }
            } else if (inp.mInfo.type === 'volume') {
                if (inp.loaded) {
                    texID[i] = inp.globject!
                    resos[3 * i + 0] = inp.volume!.image.xres
                    resos[3 * i + 1] = inp.volume!.image.yres
                    resos[3 * i + 2] = inp.volume!.image.zres
                }
            }
        })

        attachTextures(this.mGL, texID)

        // const l2 = getShaderConstantLocation(
        //     this.mGL,
        //     this.mProgram!,
        //     'iTimeOffset'
        // )
        // const l3 = getShaderConstantLocation(
        //     this.mGL,
        //     this.mProgram!,
        //     'iSampleOffset'
        // )

        setShaderConstant4FV(this.mGL, 'iDate', dates)
        setShaderConstant3FV(this.mGL, 'iChannelResolution', resos)
        setShaderConstant1F(this.mGL, 'iSampleRate', mSampleRate)
        setShaderTextureUnit(this.mGL, 'iChannel0', 0)
        setShaderTextureUnit(this.mGL, 'iChannel1', 1)
        setShaderTextureUnit(this.mGL, 'iChannel2', 2)
        setShaderTextureUnit(this.mGL, 'iChannel3', 3)

        const quad = createDrawUnitQuad(this.mGL, this.mProgram!.program)

        const numSamples = mTmpBufferSamples
        const numBlocks = mPlaySamples / numSamples
        for (let j = 0; j < numBlocks; j++) {
            const off = j * numSamples

            setShaderConstant1F(this.mGL, 'iTimeOffset', off / mSampleRate)
            setShaderConstant1I(this.mGL, 'iSampleOffset', off)
            quad()

            getPixelData(
                this.mGL,
                mData!,
                0,
                mTextureDimensions,
                mTextureDimensions
            )

            callback(off, mData!, numSamples)
        }

        detachShader(this.mGL)
        dettachTextures(this.mGL)
        setRenderTarget(this.mGL, null)
    }

    private Paint_Buffer = (param: PaintParam) => {
        const { buffers, bufferNeedsMimaps, bufferID } = param

        this.mEffect.ResizeBuffer(
            bufferID,
            this.mEffect.xres,
            this.mEffect.yres,
            false
        )

        const buffer = buffers![bufferID]
        if (!buffer) {
            return
        }
        const dstID = 1 - buffer.lastRenderDone

        setRenderTarget(this.mGL, buffer.target[dstID])
        this.Paint_Image(param)

        // if (bufferNeedsMimaps) {
        //     // TODO
        //     // buffer.texture[dstID]
        //     createmip
        // }
        // if (true) {
        //     createMipmaps(this.mGL, buffer.texture[dstID]!)
        // }

        buffer.lastRenderDone = 1 - buffer.lastRenderDone
    }

    private Paint_Image = (param: PaintParam) => {
        const {
            time,
            mousePosX,
            mousePosY,
            mouseOriX,
            mouseOriY,
            buffers,
            cubeBuffers,
            xres,
            yres,
            dtime,
            fps,
        } = param
        const d = param.da || new Date()
        const times = [0.0, 0.0, 0.0, 0.0]
        const dates = [
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            d.getHours() * 60.0 * 60.0 +
                d.getMinutes() * 60 +
                d.getSeconds() +
                d.getMilliseconds() / 1000.0,
        ]
        const mouse = [mousePosX, mousePosY, mouseOriX, mouseOriY]

        const resos = [
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        ]
        const texIsLoaded = [0, 0, 0, 0]
        const texID: Texture[] = []

        this.mInputs.forEach((inp, i) => {
            if (inp) {
                if (inp.mInfo.type === 'texture') {
                    if (inp.loaded) {
                        texID[i] = inp.globject!
                        texIsLoaded[i] = 1
                        resos[3 * i + 0] = inp.texture!.image.width
                        resos[3 * i + 1] = inp.texture!.image.height
                        resos[3 * i + 2] = 1
                    }
                } else if (inp.mInfo.type === 'volume') {
                    if (inp.loaded) {
                        texID[i] = inp.globject!
                        texIsLoaded[i] = 1
                        resos[3 * i + 0] = inp.volume!.image.xres
                        resos[3 * i + 1] = inp.volume!.image.yres
                        resos[3 * i + 2] = inp.volume!.image.zres
                    }
                } else if (inp.mInfo.type === 'keyboard') {
                    // TODO
                } else if (inp.mInfo.type === 'cubemap') {
                    if (inp.loaded) {
                        // TODO
                    }
                } else if (inp.mInfo.type === 'webcam') {
                    // TODO
                } else if (inp.mInfo.type === 'video') {
                    // TODO
                } else if (
                    inp.mInfo.type === 'music' ||
                    inp.mInfo.type === 'musicstream'
                ) {
                    // TODO
                } else if (inp.mInfo.type === 'mic') {
                    // TODO
                } else if (inp.mInfo.type === 'buffer') {
                    const id = inp.buffer?.id
                    // const id = i
                    const buffer = id !== undefined ? buffers![id] : undefined
                    if (inp.loaded && buffer) {
                        texID[i] = buffer.texture[buffer.lastRenderDone]!
                        texIsLoaded[i] = 1
                        resos[3 * i + 0] = xres
                        resos[3 * i + 1] = yres
                        resos[3 * i + 2] = 1
                        // TODO: setSampler
                    }
                }
            }
        })

        attachTextures(this.mGL, texID)

        const prog = this.mProgram!

        attachShader(this.mGL, prog)

        setShaderConstant1F(this.mGL, 'iTime', time)
        setShaderConstant3F(this.mGL, 'iResolution', xres, yres, 1.0)
        setShaderConstant4FV(this.mGL, 'iMouse', mouse)
        setShaderConstant1FV(this.mGL, 'iChannelTime', times)
        setShaderConstant4FV(this.mGL, 'iDate', dates)
        setShaderConstant3FV(this.mGL, 'iChannelResolution', resos)
        setShaderConstant1F(this.mGL, 'iSampleRate', 44100)
        setShaderTextureUnit(this.mGL, 'iChannel0', 0)
        setShaderTextureUnit(this.mGL, 'iChannel1', 1)
        setShaderTextureUnit(this.mGL, 'iChannel2', 2)
        setShaderTextureUnit(this.mGL, 'iChannel3', 3)
        setShaderConstant1I(this.mGL, 'iFrame', this.mFrame)
        setShaderConstant1F(this.mGL, 'iTimeDelta', dtime)
        setShaderConstant1F(this.mGL, 'iFrameRate', fps)

        setShaderConstant1F(this.mGL, 'iCh0.time', times[0])
        setShaderConstant1F(this.mGL, 'iCh1.time', times[1])
        setShaderConstant1F(this.mGL, 'iCh2.time', times[2])
        setShaderConstant1F(this.mGL, 'iCh3.time', times[3])
        setShaderConstant3F(this.mGL, 'iCh0.size', resos[0], resos[1], resos[2])
        setShaderConstant3F(this.mGL, 'iCh1.size', resos[3], resos[4], resos[5])
        setShaderConstant3F(this.mGL, 'iCh2.size', resos[6], resos[7], resos[8])
        setShaderConstant3F(
            this.mGL,
            'iCh3.size',
            resos[9],
            resos[10],
            resos[11]
        )
        setShaderConstant1I(this.mGL, 'iCh0.loaded', texIsLoaded[0])
        setShaderConstant1I(this.mGL, 'iCh1.loaded', texIsLoaded[1])
        setShaderConstant1I(this.mGL, 'iCh2.loaded', texIsLoaded[2])
        setShaderConstant1I(this.mGL, 'iCh3.loaded', texIsLoaded[3])

        // const l1 = getAttribLocation(this.mGL, prog, 'pos')

        // TODO: vr

        setViewport(this.mGL, [0, 0, xres, yres])

        if (!this.gpu) {
            this.gpu = createDrawFullScreenTriangle(this.mGL, prog.program)
        }
        this.gpu()

        dettachTextures(this.mGL)
    }

    private gpu?: GPUDraw

    public SetOutputs = (slot: number, id: number) => {
        this.mOutputs[slot] = id
    }

    public SetCode = (src: string) => {
        this.mSource = src
    }
}
