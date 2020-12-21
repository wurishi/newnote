import { autorun, computed, getDependencyTree, observable, trace } from 'mobx';

const dom = document.createElement('div');
dom.style.width = '100px';
dom.style.height = '100px';
dom.style.backgroundColor = 'yellow';

document.body.appendChild(dom);

const o = observable({
  a: 100,
  b: 200,
});

const o2 = observable({
  c: 300,
});

const c = computed(() => {
  // throw new Error('A');
  return o.a + o.b + Math.random();
});

let tmp = 0;
document.body.addEventListener('click', () => {
  tmp++;
  // console.log(c.get());
  o.a = Math.random();
  // setTimeout(() => {
  //   o.b = Math.random() * 100;
  // });
  o2.c = Math.random() * 100;
});

// 每次执行时, 只观察执行到的代码部分中的 observable, 所以类似 useHook, 不应该使用判断语句区分. 应该用 when, reaction 替换.
const disposer = autorun(() => {
  if (tmp % 2 == 0) {
    console.log(o.a, 'a');
  } else {
    console.log(o2.c, 'c');
  }
  trace();
});

console.log(getDependencyTree(disposer));
