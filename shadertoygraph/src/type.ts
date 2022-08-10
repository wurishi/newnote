export type ShaderToy = {
    key: string
    name: string
    shaderList: ShaderInstance[]
}

export type ShaderInstance = {
    name: string
    getFragment(): string
    channelList?: any[]
}

export type RenderInstance = {
    canvas: HTMLCanvasElement
    gl: WebGLRenderingContext
    program: WebGLProgram
    props: {
        a_position: AttribLocation
        iResolution: UniformLocation
        iTime: UniformLocation
        iFrame: UniformLocation
    }
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
