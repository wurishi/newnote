import ShaderToy from './shaderToy'
import Stats from 'stats.js'
import { GUI } from 'dat.gui'
import NameConfig from './name'
import { Config, EffectPassInfo, Sampler, ShaderPassConfig } from './type'
import Image from './image'

const shaders = import.meta.glob('./shadersources/*.ts')

// new ShaderToy().startRendering()
let shaderToy: ShaderToy

function parseConfig(configs: Config[]) {
    const shaderPassConfig: ShaderPassConfig[] = []

    let buffId = 0
    configs.forEach((c, idx) => {
        const sInputs = c.channels
            ? c.channels.map<EffectPassInfo>((ch, chIdx) => {
                  let src = ''
                  const sampler: Sampler = {
                      filter: ch.filter || 'linear',
                      wrap: ch.wrap || 'clamp',
                      vflip: ch.noFlip ? false : true,
                  }
                  if (ch.type === 'buffer') {
                      src = ch.id + ''
                  } else if (ch.type === 'texture') {
                      const img = Image.find((it) => it.name === ch.src)
                      if (img) {
                          src = img.url
                      }
                      sampler.filter = ch.filter || 'mipmap'
                      sampler.wrap = ch.wrap || 'repeat'
                  }
                  return {
                      channel: chIdx,
                      type: ch.type,
                      src: src,
                      sampler,
                  }
              })
            : []
        const sOutputs: { channel: number; id: number }[] = []
        if (c.type === 'buffer') {
            sOutputs.push({
                channel: 0,
                id: buffId++,
            })
        }
        shaderPassConfig.push({
            name: c.name,
            type: c.type,
            code: c.fragment,
            inputs: sInputs,
            outputs: sOutputs,
        })
    })

    return shaderPassConfig
}

function init(): ShaderToy {
    const stats = new Stats()
    document.body.appendChild(stats.dom)
    stats.dom.style.left = ''
    stats.dom.style.right = '0'

    const guiData = {
        current: '',
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
        return key
    })

    const gui = new GUI()
    const mainFolder = gui.addFolder('主菜单')
    mainFolder.add(guiData, 'current', shaderNameList).onChange((key) => {
        const url = keyToUrlMap.get(key)
        if (url) {
            const fn = shaders[url]
            fn().then((m) => {
                const c = m.default as Config[]
                const renderpass = parseConfig(c)
                shaderToy.load(renderpass)
            })
        }
    })
    mainFolder.open()

    const imageFolder = gui.addFolder('Image')
    const buffAFolder = gui.addFolder('Buffer A')

    const st = new ShaderToy()
    st.start(() => {
        stats.update()
    })
    return st
}

shaderToy = init()
