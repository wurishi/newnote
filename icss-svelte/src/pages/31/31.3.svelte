纯 CSS 实现波浪效果
<div class="container">
    <div class="wave"></div>
</div>

<style>
    .container {
        width: 200px;
        height: 200px;
        box-sizing: content-box;
        padding: 5px;
        border: 10px solid rgb(118, 218, 255);
        border-radius: 50%;
    }
    .wave {
        position: relative;
        width: 200px;
        height: 200px;
        background-color: rgb(118, 218, 255);
        border-radius: 50%;
        overflow: hidden;
    }

    .wave::before, .wave::after {
        content: "";
        position: absolute;
        width: 400px;
        height: 400px;
        top: 0;
        left: 50%;
        background-color: rgba(255, 255, 255, .4);
        border-radius: 45%;
        transform: translate(-50%, -70%) rotate(0);
        animation: rotate 6s linear infinite;
        z-index: 10;
    }
    .wave::after {
        border-radius: 47%;
        background-color: rgba(255, 255, 255, .9);
        transform: translate(-50%, -70%) rotate(0);
        animation: rotate 10s linear -5s infinite;
        z-index: 20;
    }

    @keyframes rotate {
        50% {
            transform: translate(-50%, -73%) rotate(180deg);
        }
        100% {
            transform: translate(-50%, -70%) rotate(360deg);
        }
    }
</style>