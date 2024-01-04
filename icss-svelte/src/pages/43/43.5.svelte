长阴影
<div class="page">
    <div class="block" />
</div>

<style>
    .page {
        width: 400px;
        height: 400px;
        background: linear-gradient(
            90deg,
            hsl(199, 98%, 50%),
            hsl(199, 98%, 38%)
        );
        overflow: hidden;
    }

    .block {
        width: 150px;
        height: 150px;
        margin: 100px auto;
        background-color: #fff;
        position: relative;
    }

    .block::after,
    .block::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
    }

    .block::before {
        transform-origin: 0 50%;
        transform: translate(100%, 0) skewY(45deg) scaleX(0.6);
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.3), transparent);
        animation: shadowMoveY 5s infinite linear alternate;
    }

    .block::after {
        transform-origin: 0 0;
        transform: translate(0%, 100%) skewX(45deg) scaleY(0.6);
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3), transparent);
        animation: shadowMoveX 5s infinite linear alternate;
    }

    @keyframes shadowMoveX {
        to {
            transform: translate(0%, 100%) skewX(50deg) scaleY(0.6);
        }
    }

    @keyframes shadowMoveY {
        to {
            transform: translate(100%, 0) skewY(40deg) scaleX(0.6);
        }
    }
</style>
