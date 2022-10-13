import ShaderToy from './shaderToy'
import Stats from 'stats.js'
import { GUI, GUIController } from 'dat.gui'
import NameConfig from './name'
import { Config, ShaderPassConfig } from './type'
import Image from './image'
import { fact, removeFolders } from './factGui'
import createMediaRecorder from './utils/mediaRecorder'

const shaders = import.meta.glob('./shadersources/*.ts')

function init() {
    let shaderToy: ShaderToy

    const stats = new Stats()
    document.body.appendChild(stats.dom)
    stats.dom.style.left = ''
    stats.dom.style.right = '0'

    const keyToShaderKey = new Map<string, string>()

    const guiData = {
        current: '',
        paused: false,
        goto: () => {
            const key = keyToShaderKey.get(guiData.current)
            if (key) {
                window.open(`https://www.shadertoy.com/view/${key}`, '_blank')
            }
        },
        gainValue: 0.0,
        showTextures: false,
    }

    const keyToUrlMap = new Map<string, string>()

    const nameRecord = NameConfig as Record<string, string>
    const shaderNameList = Object.keys(shaders).map((url) => {
        let arr = url.split('/')
        arr = arr[arr.length - 1].split('.')
        let key = arr[0]

        if (nameRecord[key]) {
            key = `${nameRecord[key]} (${key})`
        }
        keyToUrlMap.set(key, url)
        keyToShaderKey.set(key, arr[0])
        return key
    })

    const gui = new GUI()
    const mainFolder = gui.addFolder('主菜单')
    const folderMap = new Map<string, GUI>()

    let soundFolder: GUI | null

    const changeConfigCallback = (renderpass: ShaderPassConfig[]) => {
        shaderToy.load(renderpass)
        shaderToy.resetTime(true)
    }

    mainFolder
        .add(guiData, 'current', shaderNameList)
        .name('当前 ShaderToy')
        .onChange((key) => {
            const url = keyToUrlMap.get(key)
            if (url) {
                removeFolders(gui, folderMap)
                const fn = shaders[url]
                if (soundFolder) {
                    gui.removeFolder(soundFolder)
                    soundFolder = null
                }
                shaderToy.effect.setGainValue(0)
                fn().then((m) => {
                    const c = m.default as Config[]
                    const { config: renderpass } = fact(
                        gui,
                        folderMap,
                        c,
                        changeConfigCallback,
                        shaderToy
                    )
                    shaderToy.load(renderpass)
                    shaderToy.resetTime(true)
                    if (renderpass.some((r) => r.type === 'sound')) {
                        soundFolder = gui.addFolder('WebGL 音乐')
                        soundFolder
                            .add(guiData, 'gainValue', 0.0, 1.0, 0.01)
                            .onChange((val) => {
                                shaderToy.effect.setGainValue(Number(val))
                            })
                        ;(guiData as any).exportWav = () => {
                            shaderToy.effect.exportToWav()
                        }
                        soundFolder.add(guiData, 'exportWav').name('导出音效')

                        soundFolder.open()
                        shaderToy.effect.setGainValue(guiData.gainValue)
                    }
                })
            }
        })
    mainFolder
        .add(guiData, 'paused')
        .name('暂停播放')
        .onChange(() => {
            shaderToy.pauseTime(true)
        })
    mainFolder
        .add(guiData, 'showTextures')
        .name('显示材质列表')
        .onChange((show: boolean) => {
            showTextures(show)
        })
    mainFolder.add(guiData, 'goto').name('跳转到 ShaderToy')

    let mediaRecorder: MediaRecorder
    let recordGUI: GUIController
    ;(guiData as any).record = () => {
        if (mediaRecorder === undefined) {
            mediaRecorder = createMediaRecorder((isRecording) => {
                if (isRecording) {
                    recordGUI.name('结束录制')
                } else {
                    recordGUI.name('开始录制')
                }
            }, shaderToy.canvas)!
        }
        if (mediaRecorder) {
            if (mediaRecorder.state === 'inactive') {
                mediaRecorder.start()
            } else {
                mediaRecorder.stop()
            }
        }
    }
    recordGUI = mainFolder.add(guiData, 'record').name('开始录制')

    mainFolder.open()

    const st = new ShaderToy()
    st.start(() => {
        stats.update()
    })
    shaderToy = st
}

init()

function showTextures(show: boolean) {
    let list: HTMLDivElement = document.querySelector('#textures')!
    if (!list) {
        list = document.createElement('div')
        list.id = 'textures'
        list.style.display = 'flex'
        list.style.flexDirection = 'row'
        list.style.flexWrap = 'wrap'
        document.body.appendChild(list)

        Image.forEach((img) => {
            const div = document.createElement('div')
            div.style.width = '80px'
            div.style.textAlign = 'center'
            div.style.overflow = 'hidden'
            div.style.padding = '0 5px'

            const imgEl = document.createElement('img')
            imgEl.src = img.url
            imgEl.style.width = '100%'
            imgEl.style.height = '60px'
            div.appendChild(imgEl)

            const labelEl = document.createElement('div')
            labelEl.innerHTML = img.name
            div.appendChild(labelEl)

            list.appendChild(div)
        })
    }
    if (show) {
        list.style.display = 'flex'
    } else {
        list.style.display = 'none'
    }
}
