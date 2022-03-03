<template>
    <div class="container demo1">
        <h2>
            <p class="single">单行居中，标题居中</p>
        </h2>
        <h2>
            <p>两行标题，两行标题，两行标题居左</p>
        </h2>
        <h2>
            <p>超过两行，最后省略号。超过两行，最后省略号。超过两行，最后省略号。</p>
        </h2>
    </div>
    <hr />
    <div class="container demo2">
        <h2>
            <p>我是单行标题居中</p>
            <p class="pesudo">我是单行标题居中</p>
        </h2>
        <h2>
            <p>我是单行标题居中我是单行标题居中</p>
        </h2>
    </div>
</template>

<style scoped>
.container {
    width: 300px;
}

.demo1 h2 {
    text-align: center;
}
.demo1 .single {
    display: inline-block;
}
.demo1 p {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.demo2 h2 {
    position: relative;
    text-align: center;
    line-height: 30px;
}
.demo2 p {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.demo2 .pesudo {
    position: absolute;
    width: 100%;
    height: 30px;
    overflow: hidden;
    top: -30px;
    background: #ddd;
    text-align: center;
}
</style>