[api link](https://composition-api.vuejs.org/zh/api.html#setup)

[link](https://www.vue3js.cn/docs/zh/guide/installation.html#npm)

# Vue 组合式 API

## 1. setup

`setup`函数是一个新的组件选项. 作为在组件内使用 Composition API 的入口点.

### 调用时机

创建组件实例, 然后初始化 `props`, 紧接着就调用 `setup`函数. 从生命周期钩子的视角来看, 它会在 `beforeCreate`钩子之前被调用.

### 模板中使用

如果 `setup`返回一个对象, 则对象的属性将会被合并到组件模板的渲染上下文.



