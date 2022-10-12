import MyEffect from './myEffect'
import { getRealTime, requestAnimFrame } from './utils/index'
// import Image from './shaders/glsl/4sf3Rn.glsl?raw'

import Image1 from './shaders/glsl/MdG3Dd.glsl?raw'
import A from './shaders/glsl/MdG3Dd_a.glsl?raw'
import B from './shaders/glsl/MdG3Dd_b.glsl?raw'

import Image from './shaders/glsl/WlKXRR.glsl?raw'
import BufferA from './shaders/glsl/WlKXRR_a.glsl?raw'
import { ShaderPassConfig } from './type'

export default class ShaderToy {
    private canvas
    private effect
    private tOffset
    private to
    private tf

    constructor() {
        this.tOffset = 0
        this.to = getRealTime()
        this.tf = 0

        const canvas = document.createElement('canvas')
        this.canvas = canvas
        document.body.appendChild(canvas)

        canvas.style.width = '400px'
        canvas.style.height = '300px'
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        this.effect = new MyEffect(
            null,
            null,
            canvas,
            null,
            null,
            null,
            null,
            null
        )
    }

    public load = (renderpass: ShaderPassConfig[]) => {
        this.effect.Load({
            renderpass,
        })
        this.effect.Compile()
    }

    private loopCallback?: () => any
    public start = (callback?: () => any) => {
        this.loopCallback = callback
        this.renderLoop()
    }

    private renderLoop = () => {
        requestAnimFrame(this.renderLoop)

        const time = getRealTime()

        let ltime = 0.0,
            dtime = 0.0
        ltime = this.tOffset + time - this.to
        dtime = ltime - this.tf
        this.tf = ltime

        this.effect.Paint(ltime / 1000.0, dtime / 1000.0, 60, 0, 0, 0, 0, false)

        this.loopCallback && this.loopCallback()
    }
}
