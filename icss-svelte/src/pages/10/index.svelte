<h1>单标签实现斜线</h1>

<div class="page">
    1. CSS3 旋转缩放
    <div class="demo1" />
    2. 线性渐变
    <div class="demo2" />
    3. 伪元素 + 三角形
    <div class="demo3" />
    4. `clip-path`
    <div class="demo4" />
    5. 直接画线
    <div class="demo5" />
</div>

<style>
    .page > div {
        width: 100px;
        height: 100px;
        box-sizing: border-box;
        border: 1px solid #333;
        margin-bottom: 20px;
    }
    /* 1 */
    .demo1 {
        position: relative;
        overflow: hidden;
    }
    .demo1::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        border-bottom: 1px solid deeppink;
        transform-origin: bottom center;
        transform: rotateZ(45deg) scale(1.414);
    }
    /* 2 */
    .demo2 {
        background: linear-gradient(
            45deg,
            transparent 49.5%,
            deeppink 49.5%,
            deeppink 50.5%,
            transparent 50.5%
        );
    }
    /* 3 */
    .demo3 {
        position: relative;
        background: #fff;
    }
    .demo3::before,
    .demo3::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 0;
    }
    .demo3::before {
        border: 49px solid transparent;
        border-left-color: deeppink;
        border-bottom-color: deeppink;
    }
    .demo3::after {
        border: 48px solid transparent;
        border-left-color: #fff;
        border-bottom-color: #fff;
    }
    /* 4 */
    .demo4 {
        position: relative;
        background: deeppink;
    }
    .demo4::before,
    .demo4::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #fff;
    }
    .demo4::before {
        clip-path: polygon(0 0, 0 100px, 100px 100px, 0 0);
    }
    .demo4::after {
        clip-path: polygon(100px 99px, 100px 0, 1px 0, 100px 99px);
    }
    /* 5 */
    .demo5 {
        background: deeppink;
        clip-path: polygon(1px 0, 100px 99px, 99px 100px, -1px 0);
    }
</style>
