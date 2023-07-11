<script lang="ts">
    import { onMount } from "svelte";
    import C1 from './48.1.svelte';
    const arr = new Array(200);
    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_48";
        document.head.appendChild(style);
        style.appendChild(
            document.createTextNode(`
        @keyframes movetop {
            0% {
                transform: translate(0, 0);
            }
            20% {
                transform: translate(0, 0);
            }
            87.7% {
                transform: translate(0, -170px);
                opacity: 0;
            }
            100% {
                transform: translate(0, -170px);
                opacity: 0;
            }
        }
        `)
        );

        for (let i = 1; i <= 200; i++) {
            const width = Math.floor(Math.random() * 50);
            style.appendChild(
                document.createTextNode(`
            .ball:nth-child(${i}) {
                width: ${width}px;
                height: ${width}px;
                left: calc(${Math.floor(Math.random() * 70)}px - 55px);
                animation: movetop 1s linear ${
                    (Math.random() * 3000) / 1000
                }s infinite;
            }

            `)
            );
        }
        return () => {
            document.head.removeChild(style);
        };
    });
</script>

<div class="page">
    <div class="candle">
        <div class="body" />
        <div class="fire-box">
            <div class="fire">
                {#each arr as item}
                    <div class="ball" />
                {/each}
            </div>
        </div>
    </div>
</div>
<hr />
<C1 />

<style>
    .page {
        background-color: black;
        width: 90vw;
        height: 90vh;
        overflow: hidden;
    }

    .candle {
        position: absolute;
        width: 400px;
        height: 400px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .body {
        position: relative;
        width: 100px;
        height: 300px;
        margin: 280px auto;
        background: linear-gradient(230deg, #ca9800, #573903, black 70%);
        z-index: 1;
    }

    .body::before {
        position: absolute;
        content: "";
        width: 100px;
        height: 40px;
        border-radius: 50%;
        box-sizing: border-box;
        top: -20px;
        background: radial-gradient(#a46800, #5c3104 45%, #905602 100%);
    }

    .body::after {
        position: absolute;
        content: "";
        width: 4px;
        height: 48px;
        background-color: #fff;
        left: 50%;
        top: -22px;
        transform: translate(-50%, -50%);
        border-radius: 50% 50% 0 0;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.8) 60%,
            #fff
        );
        opacity: 0.7;
        filter: blur(1px);
    }

    .fire-box {
        position: absolute;
        top: 97px;
        left: 50%;
        width: 80px;
        height: 200px;
        transform: translate(-50%, -50%);
        filter: blur(2px) contrast(20);
    }

    .fire {
        position: absolute;
        top: 30px;
        left: 50%;
        border-radius: 45%;
        box-sizing: border-box;
        border: 120px solid #000;
        border-bottom: 120px solid transparent;
        transform: translate(-50%, 0) scaleX(0.45);
        background-color: #761b00;
    }

    .ball {
        position: absolute;
        top: 60px;
        transform: translate(0, 0);
        background: #fa8763;
        border-radius: 50%;
        z-index: -1;
        mix-blend-mode: screen;
    }
</style>
