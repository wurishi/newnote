import { CLEAR, GLFormat, TEXFMT, Texture, TEXTYPE } from '../type'

export function iFormatPI2GL(format: TEXFMT): GLFormat {
    const GL = WebGL2RenderingContext
    let glFormat: GLFormat = {
        format: 0,
        external: 0,
        type: 0,
    }
    switch (format) {
        case TEXFMT.C4I8:
            glFormat = {
                format: GL.RGBA8,
                external: GL.RGBA,
                type: GL.UNSIGNED_BYTE,
            }
            break
        case TEXFMT.C1I8:
            glFormat = {
                format: GL.R8,
                external: GL.RED,
                type: GL.UNSIGNED_BYTE,
            }
            break
        case TEXFMT.C1F16:
            glFormat = {
                format: GL.R16F,
                external: GL.RED,
                type: GL.FLOAT,
            }
            break
        case TEXFMT.C4F16:
            glFormat = {
                format: GL.RGBA16F,
                external: GL.RGBA,
                type: GL.FLOAT,
            }
            break
        case TEXFMT.C1F32:
            glFormat = {
                format: GL.R32F,
                external: GL.RED,
                type: GL.FLOAT,
            }
            break
        case TEXFMT.C4F32:
            glFormat = {
                format: GL.RGBA32F,
                external: GL.RGBA,
                type: GL.FLOAT,
            }
            break
        case TEXFMT.C3F32:
            glFormat = {
                format: GL.RGB32F,
                external: GL.RGB,
                type: GL.FLOAT,
            }
            break
        case TEXFMT.Z16:
            glFormat = {
                format: GL.DEPTH_COMPONENT16,
                external: GL.DEPTH_COMPONENT,
                type: GL.UNSIGNED_SHORT,
            }
            break
        case TEXFMT.Z24:
            glFormat = {
                format: GL.DEPTH_COMPONENT24,
                external: GL.DEPTH_COMPONENT,
                type: GL.UNSIGNED_SHORT,
            }
            break
        case TEXFMT.Z32:
            glFormat = {
                format: GL.DEPTH_COMPONENT32F,
                external: GL.DEPTH_COMPONENT,
                type: GL.UNSIGNED_SHORT,
            }
            break
        default:
        // warn('iFormatPI2GL', '没有找到正确的format', format)
    }
    return glFormat
}

export function randomStr(start = 7) {
    return Math.random().toString(36).substring(start)
}

export const getRealTime = (function () {
    if ('performance' in window) {
        return () => window.performance.now()
    }
    return () => new Date().getTime()
})()

export const requestAnimFrame = (function () {
    const W: any = window
    return (
        window.requestAnimationFrame ||
        W.webkitRequestAnimationFrame ||
        W.mozRequestAnimationFrame ||
        W.oRequestAnimationFrame ||
        W.msRequestAnimationFrame ||
        function (cb: any) {
            window.setTimeout(cb, 1000 / 60)
        }
    )
})()

export function clear(
    gl: WebGL2RenderingContext,
    flags: CLEAR,
    ccolor: number[],
    cdepth: number,
    cstencil: number
) {
    let mode = 0
    if (flags & 1) {
        mode |= gl.COLOR_BUFFER_BIT
        gl.clearColor(ccolor[0], ccolor[1], ccolor[2], ccolor[3])
    }
    if (flags & 2) {
        mode |= gl.DEPTH_BUFFER_BIT
        gl.clearDepth(cdepth)
    }
    if (flags & 4) {
        mode |= gl.STENCIL_BUFFER_BIT
        gl.clearStencil(cstencil)
    }
    gl.clear(mode)
}

export function createMipmaps(gl: WebGL2RenderingContext, te: Texture) {
    if (te.type === TEXTYPE.T2D) {
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, te.id)
        gl.generateMipmap(gl.TEXTURE_2D)
        gl.bindTexture(gl.TEXTURE_2D, null)
    } else if (te.type === TEXTYPE.CUBEMAP) {
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, te.id)
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null)
    }
}
