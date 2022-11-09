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
                    if (pass.type === 'image') {
                        tsFileArr.push(
                            `import fragment from './glsl/${id}.glsl?raw'`
                        )
                        tsObjArr.push(`
                        {
                            name: '${id}', // ${pass.name}
                            type: 'image',
                            fragment,
                            channels: []
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
                            channels: []
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
