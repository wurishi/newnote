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
    }
    channels?: TextureImage2DLocation[]
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
}

export type TextureImage2DLocation = {
    bindTexture(): void
}
