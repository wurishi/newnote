<h1>多列等高布局</h1>

1. display: flex
<div class="container1">
    <div class="left">多列等高布局左</div>
    <div class="right">多列等高布局右</div>
</div>

2. 使用正负 `margin`与 `padding`相冲的方式实现
<div class="container2">
    <div class="left">多列等高布局左</div>
    <div class="right">多列等高布局右</div>
</div>

3 父容器背景色实现
<div class="container3">
    <div class="left">多列等高布局左</div>
    <div class="right">多列等高布局右</div>
</div>

4 父容器多重背景色 - 线性渐变
<div class="container4">
    <div class="left">多列等高布局左</div>
    <div class="right">多列等高布局右</div>
</div>

5 `display: table-cell`实现
<div class="container5">
    <div class="left">多列等高布局左</div>
    <div class="right">多列等高布局右</div>
</div>

<style>
    .left {
        width: 200px;
        background: deeppink;
    }
    .right {
        width: 200px;
        background: yellowgreen;
    }
    /* 1 */
    .container1 {
        display: flex;
        flex-direction: row;
    }
    .container1 .left,
    .container1 .right {
        display: 1;
        width: 200px;
    }
    /* 2 */
    .container2 {
        overflow: hidden;
    }
    .container2 .left,
    .container2 .right {
        float: left;
        padding-bottom: 5000px;
        margin-bottom: -5000px;
    }
    /* 3 */
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
    /* 4 */
    .container4 .left,
    .container4 .right {
        float: left;
        background: none;
    }
    .container4 {
        height: 120px;
        width: 400px;
        background: linear-gradient(90deg, deeppink 50%, yellowgreen 0);
    }
    /* 5 */
    .container5 {
        display: table;
    }
    .container5 .left,
    .container5 .right {
        display: table-cell;
    }
</style>