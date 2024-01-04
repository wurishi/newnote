动画相同，缓动不同
<div class="container">
    <div class="ball ball1"></div>
    <div class="ball ball2"></div>
    <div class="ball ball3"></div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        gap: 10px;
        padding: 20px;
    }

    .ball {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: black;
    }

    .ball1 {
        animation: move 1s ease-in infinite alternate;
    }

    .ball2 {
        animation: move 1s linear infinite alternate;
    }

    .ball3 {
        animation: move 1s ease-out infinite alternate;
    }

    @keyframes move {
        100% {
            transform: translateY(25px);
        }
    }
</style>