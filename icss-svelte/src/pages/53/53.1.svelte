使用负值 `outline-offset` 实现加号
<br />
在新版本的 Chrome 中已经无法实现

<div class="block" />

<style>
    .block {
        width: 200px;
        height: 200px;
        background-color: #fc3;
        box-sizing: border-box;
        margin: auto;

        outline: 20px solid #000;
        outline-offset: 10px;
        animation: move 8s infinite linear;
    }

    @keyframes move {
        50% {
            outline-offset: -118px;
        }
        100% {
            outline-offset: -118px;
        }
    }
</style>
