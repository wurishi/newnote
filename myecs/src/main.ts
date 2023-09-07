import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    MYECS
  </div>
`

import { PoolManager } from './libs/Pool'

const pm = new PoolManager()

let list: any[] = []
for (let i = 0; i < 10; i++) {
  list.push(pm.getPool('T2').create())
  list[i].b = i
}
console.log(JSON.stringify(list))
list.forEach(item => {
  pm.getPool('T2').destroy(item)
})
list = []
console.log(JSON.stringify(list))
for (let i = 0; i < 15; i++) {
  list.push(pm.getPool('T2').create())
}
console.log(JSON.stringify(list))