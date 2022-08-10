import { RenderInstance, ShaderInstance, ShaderToy } from './type'
import { createProgram, getAttribLocation, getUniformLocation } from './utils'
import { vertex, fragment } from './shaderTemplate'

enum PRECISION {
    MEDIUMP = 'mediump',
    HIGHP = 'highp',
    LOW = 'lowp',
}

let renderList: RenderInstance[] = []

export function createRender(shaderToy: ShaderToy) {
    destory()

    const shaderList = shaderToy.shaderList.concat()
    shaderList.sort((a, b) => {
        if (a.name === 'Image') {
            return -1
        } else if (b.name === 'Image') {
            return 1
        }
        return a.name.localeCompare(b.name)
    })
    shaderList.forEach((shader) => {
        const render = createRenderInstance(shader)
        render && renderList.push(render)
    })
}

function createRenderInstance(shader: ShaderInstance) {
    const canvas = document.createElement('canvas')
    if (shader.name === 'Image') {
        canvas.style.width = '400px'
        canvas.style.height = '300px'
        document.body.appendChild(canvas)
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
            canvas,
            gl,
            program,
            props: {
                a_position,
                iResolution: getUniformLocation(gl, program, 'iResolution'),
                iTime: getUniformLocation(gl, program, 'iTime'),
                iFrame: getUniformLocation(gl, program, 'iFrame'),
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

export function render(iTime: number, iFrame: number) {
    renderList.forEach((r) => {
        r.gl.useProgram(r.program)

        r.props.a_position.bindBuffer()
        if (resizeCanvasToDisplaySize(r.canvas, false)) {
            r.gl.viewport(0, 0, r.canvas.width, r.canvas.height)
            r.props.iResolution.uniform3f(r.canvas.width, r.canvas.height, 1)
        }

        r.props.iTime.uniform1f(iTime)
        r.props.iFrame.uniform1i(iFrame)

        // r.gl.bindFramebuffer(r.gl.FRAMEBUFFER, null)

        r.gl.drawArrays(r.gl.TRIANGLES, 0, 6)
    })
}

export function destory() {
    renderList.forEach((r) => {
        r.gl.deleteProgram(r.program)
        if (r.canvas.parentElement) {
            r.canvas.parentElement.removeChild(r.canvas)
        }
    })
    renderList = []
}
