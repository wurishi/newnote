import './style.css'

import Stats from 'stats.js'

const ui = document.querySelector('#ui')!

const monitor = document.querySelector('#monitor')!
const stats = new Stats()
monitor.appendChild(stats.dom)

const app = document.querySelector('#app')!

const mainLoop = () => {
  requestAnimationFrame(mainLoop)

  stats.update()
}
mainLoop()

import { GUI } from 'dat.gui'
import Example from './libs/example'

const menu = new GUI()
ui.appendChild(menu.domElement.parentElement!)
menu.domElement.setAttribute('style', 'float: left; margin-top: 48px;')

menu.addFolder('菜单')

const menuSettings: any = {}
const folderMap: Record<string, GUI> = {}

// ./examples/webgl/animation/keyframes.ts
const lv3Examples = import.meta.glob('./examples/*/*/*.ts')
const lv4Examples = import.meta.glob('./examples/*/*/*/*.ts')
const lv5Examples = import.meta.glob('./examples/*/*/*/*/*.ts')
function buildMenu(examples: Record<string, () => Promise<unknown>>) {
  Object.keys(examples).forEach((path) => {
    const pathList = path.split('/')
    const len = pathList.length
    let folderKey = ''
    for (let i = 1; i < len; i++) {
      if (i !== len - 1) {
        // path
        const parentFolder = folderMap[folderKey] || menu
        folderKey += pathList[i] + '/'
        let folder = folderMap[folderKey]
        if (!folder) {
          folder = parentFolder.addFolder(pathList[i])
          folderMap[folderKey] = folder
          folder.open()
        }
      } else {
        // file
        const parentFolder = folderMap[folderKey]
        menuSettings[path] = () => {
          startExample(examples[path])
          saveLoc(path)
        }
        parentFolder
          .add(menuSettings, path)
          .name(pathList[i].split('.').slice(0, -1).join('.'))
      }
    }
  })
}
buildMenu(lv3Examples)
buildMenu(lv4Examples)
buildMenu(lv5Examples)
menu.open()

let currentExample: Example | null
let currentExampleDestroy: (() => void) | null
async function startExample(fn: () => Promise<unknown>) {
  if (currentExample) {
    currentExampleDestroy && currentExampleDestroy()
    currentExampleDestroy = null
    currentExample = null
  }
  const module: any = await fn()
  const ExampleClass = module.default
  currentExample = new ExampleClass()
  currentExampleDestroy = currentExample!.startRun({ ui, container: app })
}

function saveLoc(path: string) {
  window.localStorage.setItem('_histroy_path', path)
}

function loadLoc() {
  const path = window.localStorage.getItem('_histroy_path')
  if (path) {
    ;[lv3Examples, lv4Examples, lv5Examples].find((examples) => {
      const fn = examples[path]
      if (!!fn) {
        startExample(fn)
        return true
      }
    })
  }
}

const run = () => {
  requestAnimationFrame(run)
  currentExample?.run()
}
run()

loadLoc()
