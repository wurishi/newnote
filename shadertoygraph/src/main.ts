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

let aLink: HTMLAnchorElement

function create() {
    if (aLink && aLink.parentElement) {
        aLink.parentElement.removeChild(aLink)
    }
    then = 0
    time = 0
    iframe = 0
    if (currentShaderToy) {
        createRender(currentShaderToy)
        aLink = document.createElement('a')
        aLink.href = 'https://www.shadertoy.com/view/' + currentShaderToy.key
        aLink.target = '_blank'
        aLink.innerHTML = currentShaderToy.key
        document.body.appendChild(aLink)
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

    renderFn(time, iframe, elapsedTime)

    requestAnimationFrame(render)
}

requestAnimationFrame(render)
