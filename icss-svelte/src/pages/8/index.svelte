<script lang="ts">
    const navs = ['列表1', '列表2'];
    const contents = ['列表内容1: 123456', '列表内容2: abcdefghijklmnopqrstuvwxyz'];
</script>

<h1>8. 纯 CSS 的导航栏 Tab 切换方案</h1>

1. ':target'+锚点。兄弟选择符"~"只能找到元素后面的
<div class="demo1">
    <div id="content1">{contents[0]}</div>
    <div id="content2">{contents[1]}</div>
    <ul class="nav">
        <li>
            <a href="#content1">{navs[0]}</a>
        </li>
        <li>
            <a href="#content2">{navs[1]}</a>
        </li>
    </ul>
</div>

2. input 与 label
<div class="demo2">
    <input id="li1" class="nav1" type="radio" name="nav" hidden />
    <input id="li2" class="nav2" type="radio" name="nav" hidden />
    <ul class="nav">
        <li>
            <label for="li1">{navs[0]}</label>
        </li>
        <li>
            <label for="li2">{navs[1]}</label>
        </li>
    </ul>
    <div class="content">
        <div class="content1">{contents[0]}</div>
        <div class="content2">{contents[1]}</div>
    </div>
</div>

3. 锚点与 "overflow: hidden"
<div class="demo3">
    <ul class="nav">
        <li>
            <a href="#content31">{navs[0]}</a>
        </li>
        <li>
            <a href="#content32">{navs[1]}</a>
        </li>
    </ul>
    <div class="container">
        <div id="content31">{contents[0]}</div>
        <div id="content32">{contents[1]}</div>
    </div>
</div>

<style>
    .nav li {
        width: 50%;
        float: left;
        list-style: none;
    }
    .nav li a {
        display: block;
    }

    /* demo1 */
    .demo1 #content1,
    .demo1 #content2 {
        display: none;
    }
    .demo1 #content1:target,
    .demo1 #content2:target {
        display: block;
    }

    .demo1 #content1:target ~ .nav li:first-child {
        background: #ff7300;
        color: #fff;
    }
    .demo1 #content2:target ~ .nav li:last-child {
        background: #ff7300;
        color: #fff;
    }

    /* demo2 */

    .demo2 .nav1:checked ~ .nav li:first-child {
        background: #ff7300;
        color: #fff;
    }
    .demo2 .nav2:checked ~ .nav li:last-child {
        background: #ff7300;
        color: #fff;
    }
    .demo2 .nav1:checked ~ .content > div:first-child {
        display: block;
    }
    .demo2 .nav2:checked ~ .content > div:last-child {
        display: block;
    }
    .demo2 .content > div {
        display: none;
    }

    /* demo3 */

    .demo3 .container {
        width: 300px;
        height: 300px;
        overflow: hidden;
    }

    .demo3 .container div {
        width: 300px;
        height: 300px;
    }
</style>