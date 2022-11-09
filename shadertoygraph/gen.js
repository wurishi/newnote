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
                            name: '${id}',
                            type: 'image',
                            fragment,
                            channels: []
                        },`)
                        fs.writeFile(
                            pt.join(GLSL_TARGET, `${id}.glsl`),
                            pass.code,
                            { encoding: 'utf-8' },
                            (err) => {
                                console.log(err)
                            }
                        )
                    }
                })
                tsObjArr.push('] as Config[]')

                const tsFile = tsFileArr.join('\n') + tsObjArr.join('\n')
                fs.writeFile(
                    path.join(TARGET, `${id}.ts`),
                    tsFile,
                    { encoding: 'utf-8' },
                    (err) => {
                        console.log(err)
                    }
                )
            }
        } catch (error) {
            console.log(error)
        }
    })
}
