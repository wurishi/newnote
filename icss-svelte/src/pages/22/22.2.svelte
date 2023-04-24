radio
<input type="radio" id="stop" name="A" />
<input type="radio" id="play" name="A" />

<div class="box">
    <label for="stop">
        <div class="btn">stop</div>
    </label>
    <label for="play">
        <div class="btn">play</div>
    </label>
</div>

<div class="animation" />

<style>
    #stop,
    #play {
        visibility: hidden;
    }

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

    #stop:checked ~ .animation {
        animation-play-state: paused;
    }

    #play:checked ~ .animation {
        animation-play-state: running;
    }
</style>
