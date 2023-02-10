import './style.css'

import Stats from 'stats.js'

const monitor = document.querySelector('#monitor')!
const stats = new Stats()
monitor.appendChild(stats.dom)

const app = document.querySelector('#app')!

const mainLoop = () => {
  requestAnimationFrame(mainLoop)

  stats.update()
}
mainLoop()

import E_Keyframes from './examples/webgl/animation/keyframes'

const test = new E_Keyframes()

test.startRun({ container: app })

const run = () => {
  requestAnimationFrame(run)
  test.run()
}
run()
