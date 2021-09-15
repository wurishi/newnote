# API

## 插件 API

Vite 插件扩展了设计出色的 Rollup 接口，带有一些 Vite 独有的配置项。因此，你只需要编写一个 Vite 插件，就可以同时为开发环境和生产环境工作。

推荐在阅读下面的章节之前，首先阅读下 [Rollup 插件文档](https://rollupjs.org/guide/en/#plugin-development)。

### 1. 约定

如果插件不使用 Vite 特有的钩子，可以实现为 兼容的 Rollup 插件，推荐使用 Rollup 插件名称约定。

- Rollup 插件应用带有一个带 `rollup-plugin-` 前缀，语义清晰的名称。

- 在 `package.json` 中包含 `rollup-plugin` 和 `vite-plugin`关键字。

这样，插件也可以用于纯 Rollup 基于 WMR 的项目。

对于 Vite 专属的插件：

- Vite 插件应该有一个带 `vite-plugin-` 前缀，语义清晰的名称。

- 在 `package.json`中包含 `vite-plugin`关键字。

- 在插件文档增加一部分关于为什么本插件是一个 Vite 专属插件的详细说明（如，本插件使用了 Vite 特有的插件钩子）。

如果你的插件只适用于特定的框架，它的名字应该遵循以下前缀格式：

- `vite-plugin-vue-` 前缀作为 Vue 插件。

- `vite-plugin-react-` 前缀作为 React 插件。

- `vite-plugin-svelte-` 前缀作为 Svelte 插件。