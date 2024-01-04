<script lang="ts">
    function toggle() {
        const elem = document.querySelector(".animation") as HTMLDivElement;
        const state = elem.style.animationPlayState;
        if (state === "paused") {
            elem.style.animationPlayState = "running";
        } else {
            elem.style.animationPlayState = "paused";
        }
    }
</script>

纯 Javascript 实现
<div class="btn" on:click={toggle}>play/stop</div>
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
</style>
