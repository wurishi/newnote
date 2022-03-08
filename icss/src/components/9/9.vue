<template>
    <div class="container1">
        <div class="left">多列等高布局左</div>
        <div class="right">多列等高布局右 display: flex 多列等高布局右 display: flex 多列等高布局右 display: flex</div>
    </div>
    <br />
    <div class="container2">
        <div class="left">多列等高布局左</div>
        <div
            class="right"
        >多列等高布局右 正负 margin padding 相冲 多列等高布局右 正负 margin padding 相冲 多列等高布局右 正负 margin padding 相冲</div>
    </div>
    <br />
    <div class="container3">
        <div class="left">多列等高布局左</div>
        <div class="right">多列等高布局右 父容器背景色 多列等高布局右 父容器背景色 多列等高布局右 父容器背景色 多列等高布局右 父容器背景色</div>
    </div>

    <br />
    <div class="container4">
        <div class="left">多列等高布局左</div>
        <div class="right">多列等高布局右 线性渐变 多列等高布局右 线性渐变 多列等高布局右 线性渐变 多列等高布局右 线性渐变 多列等高布局右 线性渐变</div>
    </div>

    <br />
    <div class="container5">
        <div class="left">多列等高布局左</div>
        <div
            class="right"
        >多列等高布局右 display: table-cell 多列等高布局右 display: table-cell 多列等高布局右 display: table-cell</div>
    </div>
</template>

<style scoped>
.left {
    width: 200px;
    background: deeppink;
}
.right {
    width: 200px;
    background: yellowgreen;
}
.container1 {
    display: flex;
    flex-direction: row;
}

.container1 .left,
.container1 .right {
    display: 1;
    width: 200px;
}

.container2 {
    overflow: hidden;
}
.container2 .left,
.container2 .right {
    float: left;
    padding-bottom: 5000px;
    margin-bottom: -5000px;
}

.container3 {
    background: deeppink;
    width: 400px;
    overflow: hidden;
}
.container3 .left {
    float: left;
    background: none;
}
.container3 .right {
    float: left;
    background: yellowgreen;
}

.container4 {
    height: 120px;
    width: 400px;
    background: linear-gradient(90deg, deeppink 50%, yellowgreen 0);
}

.container4 .left,
.container4 .right {
    float: left;
    background: none;
}

.container5 {
    display: table;
}
.container5 .left,
.container5 .right {
    display: table-cell;
}
</style>