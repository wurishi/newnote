<template>
    <div class="container demo1">
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
    <hr />
    <div class="container demo2">
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
</template>

<style scoped>
.container {
    width: 300px;
    height: 300px;
}
.container ul {
    width: 300px;
    padding: 0;
}

.container li {
    list-style: none;
    float: left;
    width: 99px;
}

.demo1 li {
    border-right: 1px solid #999;
}
.demo1 li:nth-child(3n) {
    border-right: 0;
}

.demo2.container {
    overflow: hidden;
}
.demo2 li {
    border-left: 1px solid #999;
}
.demo2 ul {
    margin-left: -1px;
}
</style>