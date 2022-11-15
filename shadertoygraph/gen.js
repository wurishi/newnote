const pt = require('path')
const fs = require('fs')

const TARGET = pt.join(__dirname, 'src', 'shadersources')
const GLSL_TARGET = pt.join(TARGET, 'glsl')
const SEARCH = pt.join(__dirname, 'e')

fs.readdir(SEARCH, (err, files) => {
    if (err) {
        console.log(err)
        return
    }
    files.forEach((name) => {
        if (name.endsWith('.json')) {
            readJSON(pt.join(SEARCH, name))
        }
    })
})

function readJSON(path) {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        try {
            const json = JSON.parse(data)
            const id = json.info.id
            if (!fs.existsSync(pt.join(TARGET, `${id}.ts`))) {
                const tsFileArr = ["import { Config } from '../type'"]
                const tsObjArr = ['export default [']
                json.renderpass.forEach((pass) => {
                    const channels = []
                    if (Array.isArray(pass.inputs)) {
                        pass.inputs.forEach((inp) => {
                            let obj = null
                            if (inp.type === 'buffer') {
                                obj = { type: 'buffer', id: 0 }
                            } else if (inp.type === 'cubemap') {
                                obj = { type: 'cubemap', map: '' }
                            } else if (inp.type === 'texture') {
                                obj = { type: 'texture', src: '' }
                            } else if (inp.type === 'volumn') {
                                obj = { type: 'volumn', volumn: '' }
                            }
                            if (obj) {
                                if (inp.sampler.filter) {
                                    obj.filter = inp.sampler.filter
                                }
                                if (inp.sampler.wrap) {
                                    obj.wrap = inp.sampler.wrap
                                }
                                if (inp.sampler.vflip === 'false') {
                                    obj.noFlip = true
                                }
                            }
                            if (
                                inp.type === 'musicstream' ||
                                inp.type === 'music'
                            ) {
                                obj = { type: 'music' }
                            } else if (inp.type === 'keyboard') {
                                obj = { type: 'keyboard' }
                            } else if (inp.type === 'video') {
                                obj = { type: 'video' }
                            }
                            if (obj) {
                                channels.push(obj)
                            }
                        })
                    }
                    if (pass.type === 'image') {
                        tsFileArr.push(
                            `import fragment from './glsl/${id}.glsl?raw'`
                        )
                        tsObjArr.push(`
                        {
                            // '${id}': '${json.info.name}',
                            name: '${id}',
                            type: 'image',
                            fragment,
                            channels: ${JSON.stringify(channels)}
                        },`)
                        fs.writeFile(
                            pt.join(GLSL_TARGET, `${id}.glsl`),
                            pass.code,
                            { encoding: 'utf-8' },
                            (err) => {
                                err && console.log(err)
                            }
                        )
                    } else if (pass.type === 'buffer') {
                        const name = pass.name[pass.name.length - 1]
                        tsFileArr.push(
                            `import ${name} from './glsl/${id}_${name}.glsl?raw'`
                        )
                        tsObjArr.push(`
                        {
                            name: '${pass.name}',
                            type: 'buffer',
                            fragment: ${name},
                            channels: ${JSON.stringify(channels)}
                        },`)
                        fs.writeFile(
                            pt.join(GLSL_TARGET, `${id}_${name}.glsl`),
                            pass.code,
                            { encoding: 'utf-8' },
                            (err) => {
                                err && console.log(err)
                            }
                        )
                    } else if (pass.type === 'sound') {
                        tsFileArr.push(
                            `import Sound from './glsl/${id}_sound.glsl?raw'`
                        )
                        tsObjArr.push(`
                        {
                            name: '${pass.name}',
                            type: 'sound',
                            fragment: Sound,
                        },`)
                        fs.writeFile(
                            pt.join(GLSL_TARGET, `${id}_sound.glsl`),
                            pass.code,
                            { encoding: 'utf-8' },
                            (err) => {
                                err && console.log(err)
                            }
                        )
                    } else if (pass.type === 'common') {
                        tsFileArr.push(
                            `import Common from './glsl/${id}_common.glsl?raw'`
                        )
                        tsObjArr.push(`
                        {
                            name: '${pass.name}',
                            type: 'common',
                            fragment: Common
                        },`)
                        fs.writeFile(
                            pt.join(GLSL_TARGET, `${id}_common.glsl`),
                            pass.code,
                            { encoding: 'utf-8' },
                            (err) => {
                                err && console.log(err)
                            }
                        )
                    }
                })
                tsObjArr.push('] as Config[]')

                const tsFile = tsFileArr.join('\n') + '\n' + tsObjArr.join('\n')
                fs.writeFile(
                    pt.join(TARGET, `${id}.ts`),
                    tsFile,
                    { encoding: 'utf-8' },
                    (err) => {
                        err && console.log(err)
                        console.log('create succ', id)
                    }
                )
            }
        } catch (error) {
            console.log(error)
        }
    })
}
