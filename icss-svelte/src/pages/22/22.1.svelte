hover
<div class="btn">play/stop</div>
<div class="animation" />

<style>
    .animation {
        width: 100px;
        height: 100px;
        background: red;
        animation: move 2s linear infinite alternate;
    }

    @keyframes move {
        0% {
            transform: translate(-100px, 0);
        }
        100% {
            transform: translate(100px, 0);
        }
    }

    .btn:hover ~ .animation {
        animation-play-state: paused;
    }
</style>