[api link](https://composition-api.vuejs.org/zh/api.html#setup)

[link](https://www.vue3js.cn/docs/zh/guide/installation.html#npm)

# Vue 组合式 API

## 1. setup

`setup`函数是一个新的组件选项. 作为在组件内使用 Composition API 的入口点.

### 调用时机

创建组件实例, 然后初始化 `props`, 紧接着就调用 `setup`函数. 从生命周期钩子的视角来看, 它会在 `beforeCreate`钩子之前被调用.

### 模板中使用

如果 `setup`返回一个对象, 则对象的属性将会被合并到组件模板的渲染上下文.

注意的是, 在 `setup`中返回的 `ref`会在模板中自动解开.

```vue
<template>
	<div>
        {{count}}
    </div>
</template>
<script>
	export default {
        setup() {
            const count = ref(0);
            return {
                count
            }
        }
    }
</script>
```

### 渲染函数 / JSX 中使用

`setup`也可以返回一个函数, 函数中也能使用当前 `setup`函数作用域中的响应式数据.

```jsx
import {h, ref, reactive } from 'vue';
export default {
    setup() {
        const count = ref(0);
        const object = reactive({ foo: 'bar' });
        return () => h('div', [count.value, object.foo]);
    }
}
```

### 参数

`setup`函数接收 `props`作为其第一个参数.

```js
export default {
    props: {
        name: String,
    },
    setup(props) {
        console.log(props.name);
    }
}
```

注意, `props`对象是响应式的, `wathEffect`或 `watch`会观察和响应 `props`的更新.

```js
export default {
    props: {
        name: String,
    },
    setup(props) {
        watchEffect(() => {
            console.log(`name is: ${props.name}`);
        });
    }
}
```

> 另外要注意, **不要解构** `props`对象, 这会使其失去响应性.
>
> 在开发过程中, `props`对象对用户空间代码是不可变的. (尝试修改 `props`时会触发警告)

`setup`函数第二个参数提供了一个上下文对象, 从原来的 2.x 中 `this`选择性地暴露了一些 property.

```js
export default {
    setup(props, context) {
        const {attrs, slots, emit} = context;
        
        function onClick() {
            console.log(attrs.foo);
        }
    }
}
```

`attrs`和 `slots`都是内部组件实例上对应项的代理, 可以确保在更新后仍然是最新值. 所以可以直接解构.

出于一些原因将 `props`作为第一个参数, 而不是包含在上下文中:

- 组件使用 `props`的场景更多, 有时候甚至只使用 `props`.
- 将 `props`独立出来作为第一个参数, 可以让 TypeScript 对 `props`单独做类型推导, 不会和上下文中的其他属性相混淆. 这也使得 `setup`, `render`和其他使用了 TSX 的函数式组件的签名保持一致.

### this 的用法

`this`在 `setup()`中不可用. 由于 `setup()`在解析 2.x 选项前被调用, `setup()`中的 `this`将与 2.x 选项中的 `this`完全不同. 同时在 `setup()`和 2.x 选项中使用 `this`时将造成混乱.

> 所以建议使用箭头函数来定义 `setup`

### 类型定义

为了让 `setup()`对参数进行类型推断, 需要使用 `defineComponent`.

```js
export default defineComponent({
    props: {
        name: String,
    },
    setup: (props, context) => {
        return {
            name: props.name, // IDE 可以自动进行类型推断
        }
    }
})
// 另外一种方法:
interface iProps {
    name: string;
}
export default defineComponent<Readonly<iProps>>(
    props:{
    	name: String,
    } as any, // 这里为什么要用 any ?
    setup: (props: iProps) => {
        return {
            name: props.name, // IDE 可以自动类型推断, 或者指定类型
        }
    }
)
```

## 2. 响应式系统 API

### reactive

接收一个普通对象然后返回该普通对象的响应式代理. 等同于 2.x 的 `Vue.observable()`

```js
const obj = reactive({ count: 0 });
```

响应式转换是 "深层的": 会影响对象内部所有嵌套的属性. 基于 ES2015 的 Proxy 实现. 返回的代理对象不等于原始对象. 建议仅使用代理对象而避免依赖原始对象.

### ref

接受一个参数值并返回一个响应式且可改变的 ref 对象. ref 对象拥有一个指向内部值的单一属性 `.value`.

```js
const count = ref(0);
console.log(count.value); // 0
count.value ++;
console.log(count.value); // 1
```

#### 模板中访问

当 ref 作为渲染上下文的属性返回 (即在 `setup()`返回的对象中)并在模板中使用时, 它会自动解套, 无需在模板中额外书写 `.value`.

```vue
<template>
	<div>
        {{ count }}
    </div>
</template>
<script>
	export default {
        setup: () => {
            return {
                count: ref(0),
            }
        }
    }
</script>
```

#### 作为响应式对象的属性访问

当 ref 作为 reactive 对象的属性被访问或修改时, 也会自动解套 value, 其行为类似普通属性.

```js
const count = ref(0);
const state = reactive({
    count,
});
console.log(state.count); // 0
state.count = 1;
console.log(state.count); // 1
```

注意, 如果将一个新的 ref 分配给现有的 ref, 将替换旧的 ref.

```js
const otherCount = ref(2);

state.count = otherCount;
console.log(state.count) // 2
console.log(count.value) // 1
```

注意, 只有在 reactive 的 object 中, ref 才会自动解套. 从 Array 或 Map 等原生集合类中访问 ref 时, 不会自动解套.

```js
const arr = reactive([ref(0)]);
console.log(arr[0].value); // 这里 .value 不能省略

const map = reactive(new Map([['foo', ref(0)]]));
console.log(map.get('foo').value); // 这里 .value 也不能省略
```

有时我们需要为 ref 做一个较为复杂的类型标注, 可以通过在调用 `ref`时传递泛型类型来覆盖默认推导.

```js
const foo = ref<string | number>('foo');
foo.value = 123;
```

### computed

传入一个 getter 函数, 返回一个默认不可手动修改的 ref 对象.

```js
const count = ref(1);
const plusOne = computed(() => count.value + 1);
console.log(plusOne.value); // 2
plusOne.value ++; // 错误!
```

或者传入一个拥有 `get`和 `set`函数的对象, 创建一个可手动修改的计算状态.

```js
const count = ref(1);
const plusOne = computed({
    get: () => count.value + 1,
    set: val => count.value = val - 1,
});
plusOne.value = 1;
console.log(count.value) // 0
```

### readonly

传入一个对象(响应式或普通即可) 或 ref, 返回一个原始对象的只读代理. 一个只读代理是"深层的", 对象内部任何嵌套的属性也都是只读的.

```js
const original = reactive({ count: 0 });
const copy = readonly(original);

watchEffect(() => {
    console.log(copy.count); // 0
});

original.count ++; // 在 original 上的修改会触发对 copy 的监听 (1 来自于上 watchEffect)
copy.count ++; // warning! 无法修改 copy
```

### watchEffect

立即执行传入的一个函数, 并响应式追踪其依赖, 并在其依赖变更时重新运行该函数.

```js
const count = ref(0);
watchEffect(() => console.log(count.value)); // 0

setTimeout(() => {
    count.value++; // 1
}, 100);
```

#### 停止侦听

当 `watchEffect`在组件的 `setup()`函数或生命周期钩子被调用时, 侦听器会被链接到该组件的生命周期, 并在组件卸载时自动停止.

在一些情况下, 也可以显式调用返回值以停止侦听.

```js
const stop = watchEffect(() => {});

stop(); // 停止侦听
```

#### 清除副作用

有时副作用函数会执行一些异步的副作用, 这些响应需要在其失效时清除. 所以侦听副作用传入的函数可以接收一个 `onInvalidate`函数作为参数, 用来注册清理失效时的回调.

```js
watchEffect((onInvalidate) => {
    const token = performAsyncOperation(id.value);
    onInvalidate(() => {
        // 当 id 改变时或停止侦听时
        token.cancel();
    });
});
```

失效回调会在以下情况下被触发.

- 副作用即将重新执行时.
- 侦听器被停止.
  - 如果在 `setup()`或生命周期钩子函数中使用了 `watchEffect`, 侦听器会在卸载组件时被停止.
  - 调用 `watchEffect`的返回值停止侦听器.

之所以是通过传入一个注册失效回调函数, 而不是通过回调返回值.(如 React 中的 `useEffect` 的方式), 是因为返回值对于异步错误处理很重要.

```js
const data = ref(null);
watchEffect(async () => {
    data.value = await fetchData(props.id);
});
```

异步函数都会隐式地返回一个 Promise, 但是清理函数必须要在 Promise 被 resolve 之前被注册. 另外, Vue 依赖这个返回的 Promise 来自动处理 Promise 链上的潜在错误.

#### 副作用刷新时机

Vue 的响应式系统会缓存副作用函数, 并异步地刷新它们. 这样可以避免同一个 tick 中多个状态改变导致的不必要的重复调用. 在核心的具体实现中, 组件的更新函数也是一个被侦听的副作用. 当一个用户定义的副作用函数进入队列时, 会在所有的组件更新后执行.

```vue
<template>
	<div>
        {{ count }}
    </div>
</template>
<script>
	export default {
        setup: () => {
            const count = ref(0);
            
            watchEffect(() => {
                console.log(count.value);
            });
            
            return {
                count,
            }
        }
    }
</script>
```

在这个例子中:

- `count`会在初始运行时同步打印出来.
- 更改 `count`时, 将在组件更新后执行副作用.

请注意, `setup()`是运行在组件 `mounted`之前的. 因此, 如果希望编写的副作用函数访问 DOM 或 模板的 refs, 需要在 `onMounted`钩子中进行.

```js
onMounted(() => {
    watchEffect(() => {
        // 在这里可以访问到 DOM 或 template 的 refs
    })
})
```

如果副作用需要同步或在组件更新之前重新运行, 可以传递一个拥有 `flush`属性的对象作为选项. (默认为 'post'):

```js
// 同步执行
watchEffect(() => {}, {
    flush: 'sync'
})

// 组件更新前执行
watchEffect(() => {}, {
    flush: 'pre'
})
```

#### 侦听器调试

`onTrack`或 `onTrigger`选项可用于调试一个侦听器的行为.

- 当一个 reactive 对象属性或一个 ref 作为依赖被追踪时, 将调用 `onTrack`
- 依赖项变更导致副作用被触发时, 将调用 `onTrigger`

仅在开发模式下生效.