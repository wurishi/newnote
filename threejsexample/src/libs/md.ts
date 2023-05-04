import { getAssetsUrl } from '@/proxy'
import hljs from 'highlight.js'
import { markdown } from 'markdown'

const supportLan = ['js', 'javascript', 'typescript', 'html']

let previewDiv: HTMLDivElement

export function createPreview(root: Element) {
  if (previewDiv) {
    previewDiv.parentElement?.removeChild(previewDiv)
  }
  previewDiv = document.createElement('div')
  previewDiv.id = 'preview'
  root.appendChild(previewDiv)
  return previewDiv
}

function highlightMarkdown() {
  let idx = 0
  let codeStart = false
  let codeType = ''
  let codeArray: string[] = []

  const replaceList = new Array<{
    name: string
    code: string
    type: string
  }>()

  const randomName = () => {
    return `###replace_${Math.random().toString(30)}_${idx++}`
  }

  return {
    replaceCode(html: string): string {
      replaceList.forEach((item) => {
        html = html.replace(
          item.name,
          `<pre><code class="language-${item.type}">${item.code}</code></pre>`
        )
      })
      return html
    },
    preprocessTreeNode(tree: any) {
      if (Array.isArray(tree) && tree[0] === 'code_block') {
        if (codeStart) {
          codeArray = codeArray.concat('    ' + (tree[1] + '').split('\n') + '    ')
          return ''
        }
        return tree
      }
      if (Array.isArray(tree) && tree[0] === 'para') {
        if (codeStart) {
          if (tree[1]) {
            codeArray = codeArray.concat((tree[1] + '').split('\n'))
          }
          if (tree[2] && tree[2][0] === 'inlinecode') {
            codeStart = false
            const code = hljs.highlight(codeArray.join('\n'), {
              language: codeType,
            })
            const name = randomName()
            replaceList.push({
              name,
              code: code.value,
              type: codeType,
            })
            return name
          }
          return ''
        } else if (Array.isArray(tree[1]) && tree[1][0] === 'inlinecode') {
          if (tree[1][1]) {
            // 单行 code
            codeArray = (tree[1][1] + '').split('\n')
            codeType = codeArray.splice(0, 1).join('') || 'html'
            if (supportLan.indexOf(codeType) < 0) {
              // console.log('不支持' + codeType)
              return tree
            }
            const code = hljs.highlight(codeArray.join('\n'), {
              language: codeType,
            })
            const name = randomName()
            replaceList.push({
              name,
              code: code.value,
              type: codeType,
            })
            return name
          } else if (tree[2]) {
            // 多行 code
            codeArray = (tree[2] + '').split('\n')
            codeType = codeArray.splice(0, 1).join('') || 'html'
            if (codeType[0] === '`') {
              codeType = codeType.substring(1)
            }
            if (supportLan.indexOf(codeType) < 0) {
              console.log('不支持' + codeType)
              return tree
            }
            codeStart = true
            return ''
          }
        }
      }
      return tree
    },
  }
}

let allTreeMap: Map<number, Array<any>>
let fMarkdown: any
let allTree: any
export async function loadMarkdown(path: string) {
  if (!allTreeMap) {
    const raw = await (await fetch(getAssetsUrl('/note.md'))).text()

    const tree = markdown.parse(raw)
    allTreeMap = splitMarkdownTree(tree)
    allTree = tree
  }

  const arr = path.split('/')
  arr.splice(0, 1)
  arr[0] = 'md'
  const mdfile = arr.at(-1)?.split('.')!
  mdfile[mdfile.length - 1] = 'md'
  arr[arr.length - 1] = mdfile.join('.')

  let showTree: any[] = allTree
  try {
    const raw = await (await fetch(getAssetsUrl('/' + arr.join('/')))).text()
    if (raw) {
      const fileTree = markdown.parse(raw)
      // console.log(fileTree)
      // 查找link
      if (Array.isArray(fileTree)) {
        const idx = fileTree.findIndex((item) => {
          if (Array.isArray(item) && item[0] === 'bulletlist') {
            if (item[1][1] === 'link' && Array.isArray(item[1][2])) {
              return true
            }
          }
          return false
        })
        if (idx >= 0) {
          const list = fileTree[idx]
          showTree = [fMarkdown, ['para', path]]
          fileTree.splice(0, idx + 1)
          showTree.push(...fileTree)
          if (Array.isArray(list[1][2])) {
            showTree.push(['header', {level: 1}, '附A:'])
            showTree.push(['para', '本例中使用到的'])
            list[1][2].forEach((item) => {
              if (Array.isArray(item) && item[0] === 'listitem') {
                const num = Number(item[1])
                const partTree = allTreeMap.get(num)
                partTree && showTree.push(...partTree)
              }
            })
          }
        }
        showTree.push(['header', {level: 1}, '附B:'])
        showTree.push(['para', '常用类'])
        for (let i = 1; i <= 100; i++) {
          const partTree = allTreeMap.get(i)
          partTree && showTree.push(...partTree)
        }
      }
    }
  } catch (error) {}
  const tn = highlightMarkdown()
  const toTree = markdown.toHTMLTree(
    showTree,
    {},
    {
      preprocessTreeNode: tn.preprocessTreeNode,
    }
  )
  const html = markdown.renderJsonML(toTree)
  previewDiv && (previewDiv.innerHTML = tn.replaceCode(html))
}

function splitMarkdownTree(tree: any, level = 1) {
  const splitTreeMap = new Map<number, Array<any>>()
  let subTree: Array<any> | null
  if (Array.isArray(tree)) {
    fMarkdown = tree[0]
    tree.forEach((item) => {
      if (
        Array.isArray(item) &&
        item[0] === 'header' &&
        item[1]?.level === level
      ) {
        subTree = null
        const id = Number((item[2] + '').split('.')[0])
        if (id > 0) {
          subTree = []
          splitTreeMap.set(id, subTree)
        }
      }
      if (subTree) {
        subTree.push(item)
      }
    })
  }
  return splitTreeMap
}
