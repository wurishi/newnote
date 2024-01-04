立刻开始动画

<div class="container">
    <div class="item" />
    <div class="item" />
    <div class="item" />
</div>

<style>
    .container {
        width: 40px;
        position: relative;
        height: 40px;
        margin: auto;
    }

    .item {
        position: absolute;
        left: 0;
        right: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #000;
        transform: rotate(0) translate(-40px, 0);
    }

    .item:nth-child(1) {
        animation: rotate 3s infinite linear;
    }
    .item:nth-child(2) {
        animation: rotate 3s infinite -1s linear;
    }
    .item:nth-child(3) {
        animation: rotate 3s infinite -2s linear;
    }

    @keyframes rotate {
        to {
            transform: rotate(360deg) translate(-40px, 0);
        }
    }
</style>
