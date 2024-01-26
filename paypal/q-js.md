1. 

https://codepen.io/wurishi/pen/gOKggQO

```js
setTimeout(() => {
  console.log(1)
}, 0)

setImmediate(() => console.log(2))

const t = setInterval(() => {
  console.log(3)
  clearInterval(t)
}, 0)

process.nextTick(console.log, 4)

new Promise((r) => {
  console.log(5)
  r(6)
}).then(console.log)
```

2. 