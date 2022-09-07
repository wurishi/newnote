import { CLEAR, EffectBuffer } from './type'
import { clear, createMipmaps } from './utils/index'
import { setRenderTarget, setRenderTargetCubeMap } from './utils/renderTarget'

export default class MyEffect {
    private xres
    private yres
    private glContext

    private maxBuffers
    private buffers
    private maxCubeBuffers
    private cubeBuffers
    private frame

    constructor(
        vr: any,
        ac: AudioContext | null,
        canvas: HTMLCanvasElement,
        callback: any,
        obj: any,
        forceMuted: any,
        forcePaused: any,
        resizeCallback: any,
        crashCallback?: () => void
    ) {
        this.xres = canvas.width
        this.yres = canvas.height
        this.maxBuffers = 4
        this.buffers = new Array<EffectBuffer>()
        this.maxCubeBuffers = 1
        this.cubeBuffers = new Array<EffectBuffer>()
        this.frame = 0

        this.glContext = createGlContext(canvas, false, false, true, false)

        canvas.addEventListener(
            'webglcontextlost',
            (event) => {
                event.preventDefault()
                crashCallback && crashCallback()
            },
            false
        )

        // this.mRenderer = piRenderer()

        // this.mScreenshotSytem = Screenshots()

        if (ac) {
            // TODO:
        }

        // mProgramCopy

        for (let i = 0; i < this.maxBuffers; i++) {
            this.buffers[i] = {
                texture: [null, null],
                target: [null, null],
                resolution: [0, 0],
                lastRenderDone: 0,
            }
        }

        for (let i = 0; i < this.maxCubeBuffers; i++) {
            this.cubeBuffers[i] = {
                texture: [null, null],
                target: [null, null],
                resolution: [0, 0],
                lastRenderDone: 0,
            }
        }

        // keyboard

        // resize
    }

    public Paint = (
        time: number,
        dtime: number,
        fps: number,
        mouseOriX: number,
        mouseOriY: number,
        mousePosX: number,
        mousePosY: number,
        isPaused: boolean
    ) => {
        const wa = null
        const da = new Date()
        const vrData = null
        let xres = this.xres / 1
        let yres = this.yres / 1
        if (this.frame === 0) {
            this.buffers.forEach((buffer) => {
                if (buffer.texture[0]) {
                    setRenderTarget(buffer.target[0])
                    clear(
                        this.glContext,
                        CLEAR.Color,
                        [0.0, 0.0, 0.0, 0.0],
                        1.0,
                        0
                    )
                    setRenderTarget(buffer.target[1])
                    clear(
                        this.glContext,
                        CLEAR.Color,
                        [0.0, 0.0, 0.0, 0.0],
                        1.0,
                        0
                    )

                    createMipmaps(this.glContext, buffer.texture[0]!)
                    createMipmaps(this.glContext, buffer.texture[1]!)
                }
            })
            this.cubeBuffers.forEach((buffer) => {
                if (buffer.texture[0]) {
                    for (let face = 0; face < 6; face++) {
                        setRenderTargetCubeMap(
                            this.glContext,
                            buffer.target[0],
                            face
                        )
                        clear(
                            this.glContext,
                            CLEAR.Color,
                            [0.0, 0.0, 0.0, 0.0],
                            1.0,
                            0
                        )
                        setRenderTargetCubeMap(
                            this.glContext,
                            buffer.target[1],
                            face
                        )
                        clear(
                            this.glContext,
                            CLEAR.Color,
                            [0.0, 0.0, 0.0, 0.0],
                            1.0,
                            0
                        )
                        createMipmaps(this.glContext, buffer.texture[0]!)
                        createMipmaps(this.glContext, buffer.texture[1]!)
                    }
                }
            })
            // 
            
        }

        this.frame++
    }

    // TODO: Load
}

function createGlContext(
    cv: HTMLCanvasElement,
    useAlpha: boolean,
    useDepth: boolean,
    usePreserveBuffer: boolean,
    useSupersampling: boolean
): WebGL2RenderingContext {
    return cv.getContext('webgl2', {
        alpha: useAlpha,
        depth: useDepth,
        stencil: false,
        premultipliedAlpha: false,
        antialias: useSupersampling,
        preserveDrawingBuffer: usePreserveBuffer,
        powerPreference: 'high-performance', // "low_power", "high_performance", "default"
    })!
}
