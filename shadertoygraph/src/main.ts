import Stats from 'stats.js'
import { GUI } from 'dat.gui'
import { createRender, render as renderFn } from './render'
import { ShaderToy } from './type'

const shaders = import.meta.glob('./shaders/*.ts')

type Main = {
    stats: Stats
    gui: GUI
}

export const main = init()

let currentShaderToy: ShaderToy

function init(): Main {
    const stats = new Stats()
    document.body.appendChild(stats.dom)

    const guiData = {
        current: '',
        ReLaunch: () => {
            create()
        },
    }
    const shaderNameList = Object.keys(shaders)
    const gui = new GUI()
    gui.add(guiData, 'current', shaderNameList).onChange((val) => {
        const fn = shaders[val]
        fn().then((m) => {
            currentShaderToy = m.default
            create()
        })
    })

    gui.add(guiData, 'ReLaunch')

    return { stats, gui }
}

function create() {
    then = 0
    time = 0
    iframe = 0
    if (currentShaderToy) {
        createRender(currentShaderToy)
    }
}

let then = 0
let time = 0
let iframe = 0

function render(now: number) {
    now *= 0.001

    const elapsedTime = Math.min(now - then, 0.1)
    then = now
    time += elapsedTime
    iframe++

    main.stats.update()

    renderFn(time, iframe)

    requestAnimationFrame(render)
}

requestAnimationFrame(render)
