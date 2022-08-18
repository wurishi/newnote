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
    value: string
}

export type ShaderInstance = {
    name: 'Image' | ShaderBufferName
    getFragment(): string
    channels?: (ShaderBufferChannel | ShaderImageChannel)[]
}

export type RenderInstance = {
    name: string
    canvas: HTMLCanvasElement
    gl: WebGL2RenderingContext
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
    (id: WebGLUniformLocation, index: number): void
}

export type MyWebGLFramebuffer = {
    framebuffer: WebGLFramebuffer
    texture: WebGLTexture
    renderFramebuffer(): void
    bindChannel: BindChannel
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

export type Image2D = {
    bindChannel: BindChannel
}

export type TextureFilterSetting = 'NONE' | 'LINEAR' | 'MIPMAP' | null
export type TextureWrapSetting = 'CLAMP' | 'REPEAT'

export type TextureType = 'T2D'

export type TextureSetting = {
    filter?: TextureFilterSetting
    wrap: TextureWrapSetting
}

export type ImageTextureSetting = {
    vflip: boolean
} & TextureSetting

export type Format =
    | 'C4I8'
    | 'C1I8'
    | 'C1F16'
    | 'C4F16'
    | 'C1F32'
    | 'C4F32'
    | 'C3F32'
    | 'Z16'
    | 'Z24'
    | 'Z32'
    | 'UNKNOW'

export type GLFormat = {
    format: number
    external: number
    type: number
}
