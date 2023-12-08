type WEBGL_CONTEXT = WebGLRenderingContext | WebGL2RenderingContext
enum ShaderType {
    VERTEX_SHADER = WebGLRenderingContext.VERTEX_SHADER,
    FRAGMENT_SHADER = WebGLRenderingContext.FRAGMENT_SHADER
}

export default class WebGLCanvas {

    public _canvas: HTMLCanvasElement;
    public _gl: WEBGL_CONTEXT;
    public _program?: WebGLProgram;

    constructor(canvas?: HTMLCanvasElement, style?: {
        width?: string, height?: string
    }) {
        this._canvas = canvas ? canvas : document.createElement('canvas');

        style = style || {}
        this._canvas.style.width = style.width || '100vw';
        this._canvas.style.height = style.height || '100vh';
        this._gl = this._canvas.getContext('webgl2')!;
        if (!this._gl) {
            throw new Error('GL 初始化失败')
        }
    }

    private check(): asserts this is (this & { _program: WebGLProgram }) {
        if ((!this._canvas) || (!this._gl) || (!this._program)) {
            throw new Error('未初始化完成')
        }
    }

    public createProgram(vertex: string, fragment: string) {
        const vertexShader = this.compileShader(vertex, ShaderType.VERTEX_SHADER);
        const fragmentShader = this.compileShader(fragment, ShaderType.FRAGMENT_SHADER);

        this._program = this._gl.createProgram()!;
        this._gl.attachShader(this._program, vertexShader);
        this._gl.attachShader(this._program, fragmentShader);
        this._gl.linkProgram(this._program);

        const success = this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS);
        if (!success) {
            throw new Error('链接失败：' + this._gl.getProgramInfoLog(this._program));
        }
    }

    public compileShader(shaderSource: string, shaderType: ShaderType) {
        const shader = this._gl.createShader(shaderType)!;
        this._gl.shaderSource(shader, shaderSource);
        this._gl.compileShader(shader);

        const success = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS);
        if (!success) {
            throw new Error('着色器未编译成功：' + this._gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    public getAttribLocation(name: string) {
        this.check()
        const gl = this._gl;
        const loc = gl.getAttribLocation(this._program, name);
        let buffer: WebGLBuffer, size: number, type: number, normalize = false;

        return {
            setFloat32(arr: Float32Array) {
                if (!buffer) {
                    size = 2;
                    type = gl.FLOAT;
                    normalize = false;
                    buffer = gl.createBuffer()!;
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
                }
            },
            bindBuffer() {
                if (buffer) {
                    gl.enableVertexAttribArray(loc);
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                    gl.vertexAttribPointer(loc, size, type, normalize, 0, 0);
                }
            }
        }
    }

    public getUniformLocation(name: string) {
        this.check();
        const gl = this._gl;
        const loc = gl.getUniformLocation(this._program, name);

        return {
            // TODO:
        }
    }

}