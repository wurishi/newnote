import {
    CanvasMouseHandler,
    MyWebGLFramebuffer,
    RenderInstance,
    ShaderBufferName,
    ShaderInstance,
    ShaderToy,
} from './type'
import {
    createFramebuffer,
    createProgram,
    getAttribLocation,
    getUniformLocation,
    handleMouseEvent,
} from './utils'
import { vertex, fragment, DEFAULT_SOUND } from './shaderTemplate'

enum PRECISION {
    MEDIUMP = 'mediump',
    HIGHP = 'highp',
    LOW = 'lowp',
}

let renderList: RenderInstance[] = []
let rootCanvas: HTMLCanvasElement | null = null
let rootGL: WebGL2RenderingContext | null = null
let canvasMouseHandler: CanvasMouseHandler | null = null
const framebufferMap = new Map<string, MyWebGLFramebuffer>()

export function createRender(shaderToy: ShaderToy) {
    destory()

    init()

    const shaderList = shaderToy.shaderList.concat()
    shaderList.sort((a, b) => {
        if (a.name === 'Image') {
            return 1
        } else if (b.name === 'Image') {
            return -1
        }
        return a.name.localeCompare(b.name)
    })

    shaderList.forEach((shader, index) => {
        const render = createRenderInstance(shader, index)
        if (render) {
            if (shader.channels) {
                render.channels = []
                shader.channels?.forEach((channel, i) => {
                    if (channel.type === 'Buffer') {
                        const myfb = framebufferMap.get(channel.value)
                        if (myfb) {
                            render.channels?.push(myfb.createBindChannel(i))
                        }
                        // if (!framebufferMap.has(channel.value)) {
                        //     framebufferMap.set(
                        //         channel.value,
                        //         getFramebuffer(render.gl, i)
                        //     )
                        // }
                        // const c = bufferMap.get(
                        //     channel.value
                        // ) as HTMLCanvasElement
                        // const texture = getTexture(
                        //     render.gl,
                        //     render.program,
                        //     'iChannel' + i,
                        //     c
                        // )
                        // render.channels?.push(texture)
                    }
                })
            }

            renderList.push(render)
        }
    })
}

function createRenderInstance(
    shader: ShaderInstance,
    index: number
): RenderInstance | null {
    const gl = rootGL as WebGL2RenderingContext
    if (gl) {
        const v = vertex
        let f = fragment
        f = f.replace('{COMMON}', '')
        f = f.replace('{PRECISION}', PRECISION.MEDIUMP)
        f = f.replace('{USER_FRAGMENT}', shader.getFragment())
        f = f.replace('{MAIN_SOUND}', DEFAULT_SOUND)
        const program = createProgram(gl, v, f)

        const a_position = getAttribLocation(gl, program, 'a_position')
        a_position.setFloat32(
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
        )

        let framebuffer: MyWebGLFramebuffer | undefined = undefined
        if (shader.name.startsWith('Buffer')) {
            framebuffer = createFramebuffer(gl, index)
            framebufferMap.set(shader.name, framebuffer)
        }

        return {
            name: shader.name,
            canvas: rootCanvas as HTMLCanvasElement,
            gl,
            program,
            props: {
                a_position,
                iResolution: getUniformLocation(gl, program, 'iResolution'),
                iTime: getUniformLocation(gl, program, 'iTime'),
                iFrame: getUniformLocation(gl, program, 'iFrame'),
                iTimeDelta: getUniformLocation(gl, program, 'iTimeDelta'),
                iMouse: getUniformLocation(gl, program, 'iMouse'),
            },
            framebuffer,
        }
    }
    return null
}

export function resizeCanvasToDisplaySize(
    canvas: HTMLCanvasElement,
    pixelRatio = true
): boolean {
    const realToCSSPixels = pixelRatio ? window.devicePixelRatio : 1

    const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels)
    const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels)

    if (canvas.width != displayWidth || canvas.height != displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        return true
    }
    return false
}

export function render(iTime: number, iFrame: number, iTimeDelta: number) {
    let resize = false
    const wh = { width: 0, height: 0 }
    if (rootCanvas) {
        resize = resizeCanvasToDisplaySize(rootCanvas, false)
    }
    if (resize) {
        wh.width = rootCanvas?.width || 0
        wh.height = rootCanvas?.height || 0
    }
    let posX = 0
    let posY = 0
    let oriX = 0
    let oriY = 0
    if (canvasMouseHandler) {
        const { data } = canvasMouseHandler
        posX = data.posX
        posY = data.posY
        oriX = Math.abs(data.oriX)
        oriY = Math.abs(data.oriY)
        if (!data.isDown) {
            oriX = -oriX
        }
        if (!data.isSignalDown) {
            oriY = -oriY
        }
        data.isSignalDown = false
    }
    renderList.forEach((r) => {
        const { framebuffer, gl, props } = r
        if (resize) {
            gl.viewport(0, 0, wh.width, wh.height)
        }

        gl.useProgram(r.program)
        // gl.clear(gl.COLOR_BUFFER_BIT);

        r.channels?.forEach((c, channelIdx) => {
            // gl.getUniformLocation(program, name)
            const id = gl.getUniformLocation(
                r.program,
                `iChannel${channelIdx}`
            ) as WebGLUniformLocation
            c(id)
        })

        props.a_position.bindBuffer()
        if (resize) {
            props.iResolution.uniform3f(wh.width, wh.height, 1)
        }

        props.iTime.uniform1f(iTime)
        props.iFrame.uniform1i(iFrame)
        props.iTimeDelta.uniform1f(iTimeDelta)
        props.iMouse.uniform4fv([posX, posY, oriX, oriY])

        if (framebuffer) {
            framebuffer.renderFramebuffer()
        } else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        }

        gl.drawArrays(r.gl.TRIANGLES, 0, 6)
    })
}

function init() {
    rootCanvas = document.createElement('canvas')
    rootCanvas.style.width = '400px'
    rootCanvas.style.height = '300px'
    document.body.appendChild(rootCanvas)

    rootGL = rootCanvas.getContext('webgl2')

    canvasMouseHandler = handleMouseEvent(rootCanvas)
}

function destory() {
    if (canvasMouseHandler) {
        canvasMouseHandler.clear()
        canvasMouseHandler = null
    }
    if (rootCanvas && rootCanvas.parentElement) {
        rootCanvas.parentElement.removeChild(rootCanvas)
    }
    rootCanvas = null
    rootGL = null
    renderList.forEach((r) => {
        r.gl.deleteProgram(r.program)
    })
    renderList = []
    framebufferMap.clear()
}
