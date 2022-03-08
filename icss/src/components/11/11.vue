<template>
    <div class="demo1">
        <p>外部 height = line-height, IFC 布局，display:inline-block、text-align:center和vertical-align:middle方法来实现文本垂直居中 inline-block 元素以单个封闭块来参与外部的IFC，其内部会生成一个BFC，不在本例讨论范围之内。</p>
    </div>
</template>

<style scoped>
.demo1 {
    text-align: center;
    width: 400px;
    line-height: 300px;
    height: 300px;
    background-color: #ccc;
}
.demo1 p {
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    line-height: normal;
}
</style>