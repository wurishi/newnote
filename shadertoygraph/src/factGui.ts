import { GUI } from 'dat.gui'
import { Config, EffectPassInfo, Sampler, ShaderPassConfig } from './type'
import Image from './image'

export function removeFolders(rootGUI: GUI, folderMap: Map<string, GUI>) {
    for (const folder of folderMap.values()) {
        rootGUI.removeFolder(folder)
    }
    folderMap.clear()
}

const BUFFER_IDS = [0, 1, 2, 3]
const IMAGES = Image.map((img) => img.name)

function getImageName(url: string) {
    return Image.find((img) => img.url === url)?.name
}

function getImageUrl(name: string) {
    return Image.find((img) => img.name === name)?.url
}

export function fact(
    rootGUI: GUI,
    folderMap: Map<string, GUI>,
    configs: Config[],
    callback: any
) {
    const guiData: any = {}
    const c: ShaderPassConfig[] = []
    const raw = parseConfig(configs)
    raw.forEach((cfg, i) => {
        c[i] = cfg
        let folderName = cfg.name || i.toString()
        if (cfg.type === 'buffer') {
            folderName += ` (id: ${
                cfg.outputs[0] ? cfg.outputs[0].id : 'UNKNOW'
            })`
        }
        const folder = rootGUI.addFolder(folderName)
        folderMap.set(folderName, folder)

        const title = folder.domElement.querySelector('.dg .title')
        if (title) {
            ;(title as HTMLElement).style.color = 'green'
        }

        cfg.inputs.forEach((inp, j) => {
            const fName = 'Channel ' + inp.channel
            const path = `${i}.${fName}`
            let tmpPath = path

            const subFolder = folder.addFolder(fName)
            if (inp.type === 'buffer') {
                tmpPath = path + '_src'
                guiData[tmpPath] = inp.src
                subFolder.add(guiData, tmpPath, BUFFER_IDS).name('Buffer ID')
            } else if (inp.type === 'texture') {
                tmpPath = path + '_src'
                guiData[tmpPath] = getImageName(inp.src)
                subFolder
                    .add(guiData, tmpPath, IMAGES)
                    .name('Texture')
                    .onChange((newImgName) => {
                        const url = getImageUrl(newImgName)
                        if (url) {
                            c[i].inputs[j].src = url
                            callback && callback(c)
                        }
                    })
                subFolder.open()
            }
        })
        if (cfg.inputs.length > 0) {
            folder.open()
        }
    })

    return {
        config: c,
    }
}

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
