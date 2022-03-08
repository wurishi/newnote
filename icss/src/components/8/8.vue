<template>
    <div class="demo1">
        <div id="content1">列表1内容：123456</div>
        <div id="content2">列表2内容：abcdefghijkl</div>
        <ul class="nav">
            <li>
                <a href="#content1">列表1</a>
            </li>
            <li>
                <a href="#content2">列表2</a>
            </li>
        </ul>
    </div>

    <div class="demo2">
        <input class="nav1" id="li1" type="radio" name="nav" hidden />
        <input class="nav2" id="li2" type="radio" name="nav" hidden />
        <ul class="nav">
            <li>
                <label for="li1">列表1</label>
            </li>
            <li>
                <label for="li2">列表2</label>
            </li>
        </ul>
        <div class="content">
            <div class="content1">列表1内容：123456</div>
            <div class="content2">列表2内容：abcdefghijkl</div>
        </div>
    </div>

    <div class="demo3">
        <div class="container">
            <div id="content31">列表1内容：123456</div>
            <div id="content32">列表2内容：abcdefghijkl</div>
        </div>
        <ul class="nav">
            <li>
                <a href="#content31">列表1</a>
            </li>
            <li>
                <a href="#content32">列表2</a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.demo1 {
    height: 300px;
}
.nav {
    width: 100%;
}
.nav li {
    width: 50%;
    float: left;
    list-style: none;
}
.nav li a {
    display: block;
}
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

.demo2 .nav1:checked ~ .nav li:first-child {
    background: #ff7300;
    color: #fff;
}
.demo2 .nav2:checked ~ .nav li:last-child {
    background: #ff7300;
    color: #fff;
}
.demo2 .nav1:checked ~ .content > div {
    display: none;
}
.demo2 .nav1:checked ~ .content > div:first-child {
    display: block;
}
.demo2 .nav2:checked ~ .content > div {
    display: none;
}
.demo2 .nav2:checked ~ .content > div:last-child {
    display: block;
}
.demo2 .content > div {
    display: none;
}

.demo3 .container {
    width: 300px;
    height: 300px;
    overflow: hidden;
}
.demo3 .container div {
    width: 300px;
    height: 300px;
    background: green;
}
</style>