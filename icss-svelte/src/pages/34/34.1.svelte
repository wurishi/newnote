<div class="reverseRotate">
    <div class="rotate">
        <div class="content">正负旋转相消3D动画</div>
    </div>
</div>

<style>
    div {
        transform-style: preserve-3d;
        perspective: 500px;
    }
    .reverseRotate {
        margin: 20px auto;
    }

    .rotate, .reverseRotate {
        width: 250px;
        height: 250px;
    }

    .content {
        width: 100%;
        height: 100%;
        line-height: 250px;
        text-align: center;
        background-color: rgba(255, 100, 100, .8);
        font-size: 24px;
        color: white;
        box-shadow: 0 0 8px 2px rgba(100, 100, 100, .6);
    }

    .rotate {
        animation: rotate 5s linear infinite;
    }
    @keyframes rotate {
        0% {
            transform: rotateX(0deg) rotateZ(0deg);
        }
        50% {
            transform: rotateX(40deg) rotateZ(180deg);
        }
        100% {
            transform: rotateX(0deg) rotateZ(360deg);
        }
    }

    .reverseRotate {
        animation: reverseRotate 5s linear infinite;
    }
    @keyframes reverseRotate {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(-360deg);
        }
    }
</style>