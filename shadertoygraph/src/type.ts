export type ShaderToy = {
    key: string
    name: string
    shaderList: ShaderInstance[]
}

export type ShaderBufferName = 'BufferA' | 'BufferB' | 'BufferC' | 'BufferD'

type ShaderChannel = {
    type: string
    value: string
}

type ShaderBufferChannel = ShaderChannel & {
    type: 'Buffer'
    value: ShaderBufferName
}

type ShaderImageChannel = ShaderChannel & {
    type: 'Img'
}

export type ShaderInstance = {
    name: 'Image' | ShaderBufferName
    getFragment(): string
    channels?: (ShaderBufferChannel | ShaderImageChannel)[]
}

export type RenderInstance = {
    name: string
    canvas: HTMLCanvasElement
    gl: WebGLRenderingContext
    program: WebGLProgram
    props: {
        a_position: AttribLocation
        iResolution: UniformLocation
        iTime: UniformLocation
        iFrame: UniformLocation
        iTimeDelta: UniformLocation
        iMouse: UniformLocation
    }
    framebuffer?: MyWebGLFramebuffer
    channels?: BindChannel[]
}

export type AttribLocation = {
    setFloat32(arr: Float32Array): void
    bindBuffer(): void
}

export type UniformLocation = {
    uniform1i(x: number): void
    uniform1f(x: number): void
    uniform2f(x: number, y: number): void
    uniform3f(x: number, y: number, z: number): void
    uniform4fv(v: Float32List): void
}

export type BindChannel = {
    (id: WebGLUniformLocation): void
}

export type MyWebGLFramebuffer = {
    framebuffer: WebGLFramebuffer
    texture: WebGLTexture
    renderFramebuffer(): void
    createBindChannel(channel: number): BindChannel
}

export type CanvasMouseMetadata = {
    oriX: number
    oriY: number
    posX: number
    posY: number
    isDown: boolean
    isSignalDown: boolean
}

export type CanvasMouseHandler = {
    data: CanvasMouseMetadata
    clear(): void
}

// export type TextureImage2DLocation = {
//     bindTexture(): void
// }
