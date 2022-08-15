import {
    RenderInstance,
    ShaderBufferName,
    ShaderInstance,
    ShaderToy,
} from './type'
import {
    createProgram,
    getAttribLocation,
    getTexture,
    getUniformLocation,
} from './utils'
import { vertex, fragment } from './shaderTemplate'

enum PRECISION {
    MEDIUMP = 'mediump',
    HIGHP = 'highp',
    LOW = 'lowp',
}

let renderList: RenderInstance[] = []
const bufferMap = new Map<ShaderBufferName, HTMLCanvasElement>()

export function createRender(shaderToy: ShaderToy) {
    destory()

    const shaderList = shaderToy.shaderList.concat()
    shaderList.sort((a, b) => {
        if (a.name === 'Image') {
            return 1
        } else if (b.name === 'Image') {
            return -1
        }
        return a.name.localeCompare(b.name)
    })

    shaderList.forEach((shader) => {
        const render = createRenderInstance(shader)
        if (render) {
            if (shader.channels) {
                render.channels = []
                shader.channels?.forEach((channel, i) => {
                    if (channel.type === 'Buffer') {
                        const c = bufferMap.get(
                            channel.value
                        ) as HTMLCanvasElement
                        const texture = getTexture(
                            render.gl,
                            render.program,
                            'iChannel' + i,
                            c
                        )
                        render.channels?.push(texture)
                    }
                })
            }

            renderList.push(render)
        }
    })
}

function createRenderInstance(shader: ShaderInstance): RenderInstance | null {
    const canvas =
        shader.name === 'Image'
            ? document.createElement('canvas')
            : (bufferMap.get(shader.name) as HTMLCanvasElement)
    canvas.style.width = '400px'
    canvas.style.height = '300px'
    if (shader.name === 'Image') {
        document.body.appendChild(canvas)
    } else {
        document.body.appendChild(canvas)
        // canvas.style.position = 'fixed'
        // canvas.style.left = '-10000px'
    }
    const gl = canvas.getContext('webgl2')
    if (gl) {
        const v = vertex
        let f = fragment
        f = f.replace('{COMMON}', '')
        f = f.replace('{PRECISION}', PRECISION.MEDIUMP)
        f = f.replace('{USER_FRAGMENT}', shader.getFragment())
        const program = createProgram(gl, v, f)

        const a_position = getAttribLocation(gl, program, 'a_position')
        a_position.setFloat32(
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
        )

        return {
            name: shader.name,
            canvas,
            gl,
            program,
            props: {
                a_position,
                iResolution: getUniformLocation(gl, program, 'iResolution'),
                iTime: getUniformLocation(gl, program, 'iTime'),
                iFrame: getUniformLocation(gl, program, 'iFrame'),
                iTimeDelta: getUniformLocation(gl, program, 'iTimeDelta'),
            },
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
    renderList.forEach((r) => {
        const resize = resizeCanvasToDisplaySize(r.canvas, false)
        if (resize) {
            r.gl.viewport(0, 0, r.canvas.width, r.canvas.height)
        }

        r.gl.useProgram(r.program)
        // r.gl.clear(r.gl.COLOR_BUFFER_BIT);

        r.channels?.forEach((c) => {
            c.bindTexture()
        })

        r.props.a_position.bindBuffer()
        if (resize) {
            r.props.iResolution.uniform3f(r.canvas.width, r.canvas.height, 1)
        }

        r.props.iTime.uniform1f(iTime)
        r.props.iFrame.uniform1i(iFrame)
        r.props.iTimeDelta.uniform1f(iTimeDelta)

        // r.gl.bindFramebuffer(r.gl.FRAMEBUFFER, null)

        r.gl.drawArrays(r.gl.TRIANGLES, 0, 6)
    })
}

export function destory() {
    bufferMap.clear()
    ;['BufferA', 'BufferB', 'BufferC', 'BufferD'].forEach((name) => {
        const canvas = document.createElement('canvas')
        bufferMap.set(name as ShaderBufferName, canvas)
    })
    renderList.forEach((r) => {
        r.gl.deleteProgram(r.program)
        if (r.canvas.parentElement) {
            r.canvas.parentElement.removeChild(r.canvas)
        }
    })
    renderList = []
}
