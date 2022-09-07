import MyEffect from './myEffect'
import { getRealTime, requestAnimFrame } from './utils/index'

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

    public startRendering = () => {
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
    }
}
