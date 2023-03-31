<h1>7. 消失的边界线</h1>

1. nth-child 需要知道一行有几列，且不需要兼容 IE8-
<div class="demo1">
    <ul>
        <li>测试</li>
        <li>消失</li>
        <li>边界线</li>
        <li>右侧</li>
        <li>边界线</li>
        <li>消失</li>
        <li>测试</li>
    </ul>
</div>

2. 反向 margin
<div class="demo2">
    <ul>
        <li>测试</li>
        <li>消失</li>
        <li>边界线</li>
        <li>右侧</li>
        <li>边界线</li>
        <li>消失</li>
        <li>测试</li>
    </ul>
</div>

<style>
    div {
        width: 300px;
        height: 300px;
    }

    div > ul {
        width: 300px;
        padding: 0;
    }

    div > ul > li {
        list-style: none;
        float: left;
        width: 99px;
        text-align: center;
    }

    .demo1 li {
        border-right: 1px solid #999;
    }
    .demo1 li:nth-child(3n) {
        border-right: 0;
    }

    .demo2 {
        overflow: hidden;
    }
    .demo2 li {
        border-left: 1px solid #999;
    }
    .demo2 ul {
        margin-left: -1px;
    }
</style>