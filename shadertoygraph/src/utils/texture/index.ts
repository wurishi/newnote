import { iFormatPI2GL } from '../index'
import { FILTER, TEXFMT, Texture, TEXTYPE, TEXWRP } from '../../type'
import createTextureT2D from './create2D'
import createTextureT3D from './create3D'
import createTextureCubeMap from './createCM'
import createTextureT2DFromImage from './create2DFromImage'
import createTextureCubeMapFromImage from './createCMFromImage'

export function createTexture(
    gl: WebGL2RenderingContext,
    type: TEXTYPE,
    xres: number,
    yres: number,
    format: TEXFMT,
    filter: FILTER,
    wrap: TEXWRP,
    buffer: ArrayBufferView | null = null
): Texture {
    const id = gl.createTexture()!

    const glFoTy = iFormatPI2GL(format)
    let glWrap = wrap === TEXWRP.CLAMP ? gl.CLAMP_TO_EDGE : gl.REPEAT

    if (type === TEXTYPE.T2D) {
        createTextureT2D(id, gl, xres, yres, glFoTy, filter, glWrap, buffer)
    } else if (type === TEXTYPE.T3D) {
        createTextureT3D(id, gl, xres, yres, glFoTy, filter, glWrap, buffer)
    } else {
        createTextureCubeMap(id, gl, xres, yres, glFoTy, filter, glWrap, buffer)
    }
    return {
        id,
        xres,
        yres,
        format,
        type,
        filter,
        wrap,
        vFlip: false,
        Destroy: () => {
            gl.deleteTexture(id)
        },
    }
}

export function CreateTextureFromImage(
    gl: WebGL2RenderingContext,
    type: TEXTYPE,
    image: HTMLImageElement[],
    format: TEXFMT,
    filter: FILTER,
    wrap: TEXWRP,
    flipY: boolean
): Texture {
    const id = gl.createTexture()!
    const glFoTy = iFormatPI2GL(format)
    const glWrap = wrap === TEXWRP.CLAMP ? gl.CLAMP_TO_EDGE : gl.REPEAT
    if (type === TEXTYPE.T2D) {
        createTextureT2DFromImage(
            id,
            gl,
            glFoTy,
            filter,
            glWrap,
            flipY,
            image[0]
        )
    } else if (type === TEXTYPE.T3D) {
    } else {
        createTextureCubeMapFromImage(id, gl, glFoTy, filter, flipY, image)
    }
    return {
        id,
        xres: image[0].width,
        yres: image[0].height,
        format,
        type,
        filter,
        wrap,
        vFlip: flipY,
        Destroy: () => {
            gl.deleteTexture(id)
        },
    }
}
