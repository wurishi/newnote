import {
    AttribLocation,
    CanvasMouseHandler,
    CanvasMouseMetadata,
    MyWebGLFramebuffer,
    UniformLocation,
} from './type'

export function createProgram(
    gl: WebGLRenderingContext,
    vertex: string,
    fragment: string
) {
    const vertexShader = compileShader(gl, vertex, ShaderType.VERTEX_SHADER)
    const fragmentShader = compileShader(
        gl,
        fragment,
        ShaderType.FRAGMENT_SHADER
    )

    const program = gl.createProgram() as WebGLProgram

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)

    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (!success) {
        throw new Error('链接失败：' + gl.getProgramInfoLog(program))
    }

    return program
}

enum ShaderType {
    VERTEX_SHADER = WebGLRenderingContext.VERTEX_SHADER,
    FRAGMENT_SHADER = WebGLRenderingContext.FRAGMENT_SHADER,
}

export function compileShader(
    gl: WebGLRenderingContext,
    shaderSource: string,
    shaderType: ShaderType
) {
    const shader = gl.createShader(shaderType) as WebGLShader
    gl.shaderSource(shader, shaderSource)
    gl.compileShader(shader)

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (!success) {
        throw new Error('着色器未编译成功：' + gl.getShaderInfoLog(shader))
    }

    return shader
}

export function getAttribLocation(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    name: string
): AttribLocation {
    const loc = gl.getAttribLocation(program, name)
    let buffer: WebGLBuffer
    let size: number
    let type: number
    let normalize = false
    return {
        setFloat32(arr: Float32Array) {
            if (buffer) {
                throw new Error('buffer已经设置过了')
                return
            }
            size = 2
            type = gl.FLOAT
            normalize = false
            buffer = gl.createBuffer() as WebGLBuffer
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW)
        },
        bindBuffer() {
            if (buffer) {
                gl.enableVertexAttribArray(loc)
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
                gl.vertexAttribPointer(loc, size, type, normalize, 0, 0)
            }
        },
    }
}

export function getUniformLocation(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    name: string
): UniformLocation {
    const loc = gl.getUniformLocation(program, name)
    return {
        uniform1i(x) {
            gl.uniform1i(loc, x)
        },
        uniform1f(x) {
            gl.uniform1f(loc, x)
        },
        uniform2f(x, y) {
            gl.uniform2f(loc, x, y)
        },
        uniform3f(x, y, z) {
            gl.uniform3f(loc, x, y, z)
        },
        uniform4fv(v) {
            gl.uniform4fv(loc, v)
        },
    }
}

export function createFramebuffer(
    gl: WebGLRenderingContext,
    level: number
): MyWebGLFramebuffer {
    // const id = gl.getUniformLocation
    const texture = gl.createTexture() as WebGLTexture
    const framebuffer = gl.createFramebuffer() as WebGLFramebuffer
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(
        gl.TEXTURE_2D,
        level,
        gl.RGBA,
        400,
        300,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
    )
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        level
    )

    return {
        framebuffer,
        texture,
        renderFramebuffer: () => {
            // gl.bindRenderbuffer(gl.RENDERBUFFER, framebuffer)
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
        },
        createBindChannel: (channel: number) => {
            return (id: WebGLUniformLocation) => {
                const tmp = 0
                gl.uniform1i(id, tmp)
                gl.activeTexture(gl.TEXTURE0 + tmp)
                gl.bindTexture(gl.TEXTURE_2D, texture)
                // console.log(tmp)
            }
        },
    }
}

export function handleMouseEvent(
    canvas: HTMLCanvasElement
): CanvasMouseHandler {
    const data: CanvasMouseMetadata = {
        oriX: 0,
        oriY: 0,
        posX: 0,
        posY: 0,
        isDown: false,
        isSignalDown: false,
    }
    function mouseDown(ev: MouseEvent) {
        const rect = canvas.getBoundingClientRect()
        data.oriX = Math.floor(
            ((ev.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
        )
        data.oriY = Math.floor(
            canvas.height -
                ((ev.clientY - rect.top) / (rect.bottom - rect.top)) *
                    canvas.height
        )
        data.posX = data.oriX
        data.posY = data.oriY
        data.isDown = true
        data.isSignalDown = true
    }

    function mouseUp(ev: MouseEvent) {
        data.isDown = false
    }

    function mouseMove(ev: MouseEvent) {
        if (data.isDown) {
            const rect = canvas.getBoundingClientRect()
            data.posX = Math.floor(
                ((ev.clientX - rect.left) / (rect.right - rect.left)) *
                    canvas.width
            )
            data.posY = Math.floor(
                canvas.height -
                    ((ev.clientY - rect.top) / (rect.bottom - rect.top)) *
                        canvas.height
            )
        }
    }

    canvas.addEventListener('mousedown', mouseDown)
    canvas.addEventListener('mouseup', mouseUp)
    canvas.addEventListener('mousemove', mouseMove)

    return {
        data,
        clear() {
            canvas.removeEventListener('mousedown', mouseDown)
            canvas.removeEventListener('mouseup', mouseUp)
            canvas.removeEventListener('mousemove', mouseMove)
        },
    }
}

// export function getTexture(
//     gl: WebGLRenderingContext,
//     program: WebGLProgram,
//     name: string,
//     source: TexImageSource
// ): TextureImage2DLocation {
//     const last = name.charAt(name.length - 1)
//     const index = Number(last)
//     if (index.toString() !== last) {
//         throw new Error(`(${name}) iChannel 名称最后一位需要指示 index`)
//     }
//     const loc = gl.getUniformLocation(program, name)
//     const texture = gl.createTexture() as WebGLTexture
//     let tmp = source
//     return {
//         bindTexture() {
//             if (!tmp) {
//                 return
//             }
//             gl.uniform1i(loc, index)
//             gl.activeTexture(gl.TEXTURE0 + index)
//             gl.bindTexture(gl.TEXTURE_2D, texture)

//             gl.texImage2D(
//                 gl.TEXTURE_2D,
//                 0,
//                 gl.RGBA,
//                 gl.RGBA,
//                 gl.UNSIGNED_BYTE,
//                 source
//             )
//         },
//     }
// }
