小球从左到右

<div class="ball-1" />

<style>
    .ball-1 {
        margin: 50px auto;
        width: 100px;
        height: 100px;
        background: black;
        animation: ball-move 1s linear;
        animation-fill-mode: forwards;
        animation-play-state: paused;
    }

    .ball-1:active {
        animation-play-state: running;
    }

    @keyframes ball-move {
        100% {
            transform: translate(200px, 0) rotate(180deg);
        }
    }
</style>
