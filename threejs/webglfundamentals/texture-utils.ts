interface iTextureOptions {
    width?: number;
    height?: number;
    color1?: string;
    color2?: string;
}

const ctx = document.createElement('canvas').getContext('2d');

function setCanvasSize(width: number, height: number) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function makeTexture(gl: WebGLRenderingContext) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        ctx.canvas
    );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    return tex;
}

export function makeStripeTexture(
    gl: WebGLRenderingContext,
    options?: iTextureOptions
) {
    options = options || {};
    const {
        width = 2,
        height = 2,
        color1 = 'white',
        color2 = 'black',
    } = options;

    setCanvasSize(width, height);

    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color2;
    ctx.fillRect(0, 0, width, height / 2);

    return makeTexture(gl);
}
