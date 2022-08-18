import {
    AttribLocation,
    CanvasMouseHandler,
    CanvasMouseMetadata,
    Image2D,
    ImageTextureSetting,
    MyWebGLFramebuffer,
    TextureSetting,
    TextureType,
    UniformLocation,
} from './type'

export function createProgram(
    gl: WebGL2RenderingContext,
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
    VERTEX_SHADER = WebGL2RenderingContext.VERTEX_SHADER,
    FRAGMENT_SHADER = WebGL2RenderingContext.FRAGMENT_SHADER,
}

export function compileShader(
    gl: WebGL2RenderingContext,
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
    gl: WebGL2RenderingContext,
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
    gl: WebGL2RenderingContext,
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

function createTexture(
    gl: WebGL2RenderingContext,
    type: TextureType,
    setting: TextureSetting,
    width?: number,
    height?: number
): WebGLTexture {
    const texture = gl.createTexture() as WebGLTexture
    if (texture) {
        const wrap = setting.wrap === 'CLAMP' ? gl.CLAMP_TO_EDGE : gl.REPEAT

        if (type === 'T2D') {
            gl.bindTexture(gl.TEXTURE_2D, texture)

            if ('vflip' in setting) {
                const imgSetting = setting as ImageTextureSetting
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, imgSetting.vflip)
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
                gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE)
            } else {
                width = width || 0
                height = height || 0
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    0,
                    gl.RGBA,
                    width,
                    height,
                    0,
                    gl.RGBA,
                    gl.UNSIGNED_BYTE,
                    null
                )
            }

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap)

            switch (setting.filter) {
                case 'NONE':
                    {
                        gl.texParameteri(
                            gl.TEXTURE_2D,
                            gl.TEXTURE_MAG_FILTER,
                            gl.NEAREST
                        )
                        gl.texParameteri(
                            gl.TEXTURE_2D,
                            gl.TEXTURE_MIN_FILTER,
                            gl.NEAREST
                        )
                    }
                    break
                case 'LINEAR':
                    {
                        gl.texParameteri(
                            gl.TEXTURE_2D,
                            gl.TEXTURE_MAG_FILTER,
                            gl.LINEAR
                        )
                        gl.texParameteri(
                            gl.TEXTURE_2D,
                            gl.TEXTURE_MIN_FILTER,
                            gl.LINEAR
                        )
                    }
                    break
                case 'MIPMAP':
                    {
                        gl.texParameteri(
                            gl.TEXTURE_2D,
                            gl.TEXTURE_MAG_FILTER,
                            gl.LINEAR
                        )
                        gl.texParameteri(
                            gl.TEXTURE_2D,
                            gl.TEXTURE_MIN_FILTER,
                            gl.LINEAR_MIPMAP_LINEAR
                        )
                        gl.generateMipmap(gl.TEXTURE_2D)
                    }
                    break
                default:
                    {
                        gl.texParameteri(
                            gl.TEXTURE_2D,
                            gl.TEXTURE_MAG_FILTER,
                            gl.NEAREST
                        )
                        gl.texParameteri(
                            gl.TEXTURE_2D,
                            gl.TEXTURE_MIN_FILTER,
                            gl.NEAREST_MIPMAP_LINEAR
                        )
                        gl.generateMipmap(gl.TEXTURE_2D)
                    }
                    break
            }

            // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
            gl.bindTexture(gl.TEXTURE_2D, null)
        }
    }
    return texture
}

const DEFAULT_TEXTURE_SETTING: TextureSetting = {
    wrap: 'CLAMP',
    filter: 'LINEAR',
}

export function createFramebuffer(
    gl: WebGL2RenderingContext,
    level: number,
    setting: TextureSetting = DEFAULT_TEXTURE_SETTING
): MyWebGLFramebuffer {
    const texture = createTexture(gl, 'T2D', setting, 400, 300)
    const framebuffer = gl.createFramebuffer() as WebGLFramebuffer

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
        bindChannel: (id: WebGLUniformLocation, index: number) => {
            gl.uniform1i(id, index)
            gl.activeTexture(gl.TEXTURE0 + index)
            gl.bindTexture(gl.TEXTURE_2D, texture)
            // console.log('create')
        },
    }
}

const DEFAULT_IMAGE_TEXTURE_SETTING: ImageTextureSetting = {
    vflip: true,
    wrap: 'REPEAT',
    filter: 'MIPMAP',
}

export function getImageTexture(
    gl: WebGL2RenderingContext,
    path: string,
    setting: ImageTextureSetting = DEFAULT_IMAGE_TEXTURE_SETTING
): Image2D {
    let loading = false
    const image = new Image()
    image.src = path
    image.addEventListener('load', () => {
        loading = true
    })
    let _source = image
    const texture = createTexture(gl, 'T2D', setting)
    return {
        bindChannel: (id, index) => {
            if (loading) {
                gl.uniform1i(id, index)
                gl.activeTexture(gl.TEXTURE0 + index)
                gl.bindTexture(gl.TEXTURE_2D, texture)

                gl.texImage2D(
                    gl.TEXTURE_2D,
                    0,
                    gl.RGBA,
                    gl.RGBA,
                    gl.UNSIGNED_BYTE,
                    _source
                )

                gl.generateMipmap(gl.TEXTURE_2D)
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
