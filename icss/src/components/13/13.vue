<script lang="ts" setup>
const changeHandler = () => {
    // 读取
    const root = getComputedStyle(document.documentElement)
    const cssVariable = root.getPropertyValue('--bgColor').trim()
    console.log(cssVariable)

    // 写入
    document.documentElement.style.setProperty('--bgColor', '#0f0')
}
</script>

<template>
    <div class="demo1"></div>
    <div class="demo2"></div>
    <div class="demo3"></div>
    <div class="demo4"></div>
    <button @click="changeHandler">修改 --bgColor</button>
</template>

<style>
/* 声明一个变量 */
:root {
    --bgColor: #000;
    --word: "Hello";
    --word-second: "World";
    --margin: 10px;
}
</style>

<style scoped>
div {
    width: 100px;
    height: 100px;
}
.demo1 {
    background: var(--bgColor);
}
.demo2 {
    --bgColor: red;
    background: var(--bgColor);
}
.demo3::before {
    content: var(--word) "_" var(--word-second);
}

.demo4 {
    border: 1px solid var(--bgColor);
    text-indent: calc(var(--margin) * 10);
}
</style>