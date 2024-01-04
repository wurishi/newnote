<script lang="ts">
    import { onMount } from "svelte";
    const arr = new Array(60);

    onMount(() => {
        const style = document.createElement("style");
        style.id = "Style_49_3";
        document.head.appendChild(style);

        style.appendChild(
            document.createTextNode(`
        @keyframes movetop {
            0% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(0, -180px);
                opacity: .4;
            }
        }
        `)
        );

        for (let i = 1; i <= 60; i++) {
            const width = Math.floor(Math.random() * 60);
            style.appendChild(
                document.createTextNode(`
                .ball:nth-child(${i}) {
                    width: ${width}px;
                    height: ${width}px;
                    left: calc(${Math.floor(Math.random() * 100)}px + 30px);
                    animation: movetop .6s linear ${
                        (Math.random() * 2000) / 1000
                    }s infinite;
                    animation-play-state: running;
                }
                .btn:hover .ball:nth-child(${i}) {
                    animation-play-state: paused;
                }
                `)
            );
        }

        return () => {
            document.head.removeChild(style);
        };
    });
</script>

CSS 控制动画
<div class="page">
    <div class="container">
        <div class="btn">
            {#each arr as item}
                <div class="ball" />
            {/each}
        </div>
    </div>
    <div class="word">Hover以停止动画</div>
</div>

<style>
    .page {
        width: 90vw;
        height: 90vh;
        position: relative;
    }

    .word {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        top: 350px;
        font-size: 24px;
        color: white;
        z-index: 10;
    }

    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        filter: contrast(10);
        background: #000;
    }

    .btn {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 130px auto;
        cursor: pointer;
        filter: blur(2px) contrast(10);
    }
    .btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #dc8165;
        border-radius: 48% 45% 48% 46%;
        animation: rotate 3s infinite linear;
        animation-play-state: running;
        z-index: 0;
    }
    .btn:hover::before {
        animation-play-state: paused;
    }
    .ball {
        position: absolute;
        top: 50px;
        transform: translate(0, 0);
        background: #fa8763;
        border-radius: 50%;
        z-index: -1;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
