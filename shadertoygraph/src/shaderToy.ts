import MyEffect from './myEffect'
import { getRealTime, requestAnimFrame } from './utils/index'
// import Image from './shaders/glsl/4sf3Rn.glsl?raw'

import Image1 from './shaders/glsl/MdG3Dd.glsl?raw'
import A from './shaders/glsl/MdG3Dd_a.glsl?raw'
import B from './shaders/glsl/MdG3Dd_b.glsl?raw'

import Image from './shaders/glsl/WlKXRR.glsl?raw'
import BufferA from './shaders/glsl/WlKXRR_a.glsl?raw'

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
        this.effect.Load({
            renderpass: [
                // WlKXRR
                // {
                //     type: 'image',
                //     code: Image,
                //     inputs: [
                //         // {
                //         //     channel: 1,
                //         //     type: 'texture',
                //         //     src: '/textures/RGBANoiseMedium.png',
                //         //     sampler: {
                //         //         filter: 'linear',
                //         //         wrap: 'clamp',
                //         //         vflip: false,
                //         //     },
                //         // },
                //         {
                //             channel: 0,
                //             type: 'buffer',
                //             src: '',
                //             sampler: {
                //                 filter: 'linear',
                //                 wrap: 'clamp',
                //                 vflip: false,
                //             },
                //         },
                //     ],
                //     outputs: [],
                // },
                // {
                //     type: 'buffer',
                //     code: BufferA,
                //     inputs: [],
                //     outputs: [
                //         {
                //             channel: 0,
                //             id: 0,
                //         },
                //     ],
                // },

                // MdG3Dd
                {
                    name: 'main',
                    type: 'image',
                    code: Image1,
                    inputs: [
                        {
                            channel: 0,
                            type: 'buffer',
                            src: '1',
                            sampler: {
                                filter: 'linear',
                                wrap: 'clamp',
                                vflip: true,
                            },
                        },
                    ],
                    outputs: [
                        // {
                        //     channel: 0,
                        //     id: 0,
                        // },
                    ],
                },
                {
                    name: 'buffA',
                    type: 'buffer',
                    code: A,
                    inputs: [
                        {
                            channel: 0,
                            type: 'buffer',
                            src: '0',
                            sampler: {
                                filter: 'nearest',
                                wrap: 'clamp',
                                vflip: true,
                            },
                        },
                        {
                            channel: 1,
                            type: 'texture',
                            src: '/textures/RGBANoiseMedium.png',
                            sampler: {
                                filter: 'mipmap',
                                wrap: 'repeat',
                                vflip: true,
                            },
                        },
                    ],
                    outputs: [
                        {
                            channel: 0,
                            id: 0,
                        },
                    ],
                },
                {
                    name: 'buffB',
                    type: 'buffer',
                    code: B,
                    inputs: [
                        {
                            channel: 0,
                            type: 'buffer',
                            src: '0',
                            sampler: {
                                filter: 'nearest',
                                wrap: 'clamp',
                                vflip: true,
                            },
                        },
                        {
                            channel: 1,
                            type: 'buffer',
                            src: '1',
                            sampler: {
                                filter: 'nearest',
                                wrap: 'clamp',
                                vflip: true,
                            },
                        },
                    ],
                    outputs: [
                        {
                            channel: 0,
                            id: 1,
                        },
                    ],
                },

                // {
                //     type: 'image',
                //     code: Image,
                //     inputs: [
                //         {
                //             channel: 0,
                //             type: 'texture',
                //             src: '/textures/Organic4.jpeg',
                //             sampler: {
                //                 filter: 'linear',
                //                 wrap: '',
                //                 vflip: false,
                //             },
                //         },
                //         {
                //             channel: 1,
                //             type: 'texture',
                //             src: '/textures/Organic2.jpeg',
                //             sampler: {
                //                 filter: 'linear',
                //                 wrap: '',
                //                 vflip: false,
                //             },
                //         },
                //     ],
                //     outputs: [],
                // },
            ],
        })
        this.effect.Compile()
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
