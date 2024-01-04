<script>
    import { onMount } from "svelte";

    const list = new Array(15);

    const random = (v) => Math.floor(Math.random() * v);

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_58.2";
        document.head.appendChild(style);
        style.appendChild(
            document.createTextNode(`
        @keyframes moveToTop {
            90% {
                opacity: 1;
            }
            100% {
                opacity: 0.1;
                transform: translate(-50%, -180px);
            }
        }
        `)
        );
        for (let i = 0; i < list.length; i++) {
            const width = 15 + random(15) + "px";
            style.appendChild(
                document.createTextNode(`
            li:nth-child(${i + 1}) {
                left: calc(15px + ${random(70)}px);
                top: 50%;
                transform: translate(-50%, -50%);
                width: ${width};
                height: ${width};
                animation: moveToTop ${random(6) + 3}s ease-in-out -${
                    random(5000) / 1000
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

HuaWei Battery Charging Animation

<div class="page">
    <div class="container">
        <div class="number">98.7%</div>
        <div class="contrast">
            <div class="circle" />
            <div class="bubbles">
                {#each list as item}
                    <li />
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .page {
        background-color: black;
        overflow: hidden;
        padding: 20px;
        position: relative;
        display: flex;
    }

    .container {
        position: relative;
        margin: auto;
        width: 300px;
        height: 400px;
    }

    .number {
        position: absolute;
        width: 300px;
        top: 27%;
        text-align: center;
        font-size: 32px;
        z-index: 10;
        color: #fff;
    }

    .contrast {
        filter: contrast(10) hue-rotate(0);
        width: 300px;
        height: 400px;
        background: #000;
        overflow: hidden;
        animation: hueRotate 10s linear infinite;
    }

    .circle {
        position: relative;
        width: 300px;
        height: 300px;
        box-sizing: border-box;
        filter: blur(8px);
    }

    .circle::after {
        content: "";
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(0);
        width: 200px;
        height: 200px;
        background-color: #00ff6f;
        border-radius: 42% 38% 62% 49% / 45%;
        animation: rotate 10s infinite linear;
    }
    .circle::before {
        content: "";
        position: absolute;
        width: 176px;
        height: 176px;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: #000;
        z-index: 10;
    }

    .bubbles {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 100px;
        height: 40px;
        transform: translate(-50%, 0);
        border-radius: 100px 100px 0 0;
        background-color: #00ff6f;
        filter: blur(5px);
    }

    li {
        position: absolute;
        border-radius: 50%;
        background: #00ff6f;
    }

    @keyframes rotate {
        50% {
            border-radius: 45% / 42% 38% 58% 49%;
        }
        100% {
            transform: translate(-50%, -50%) rotate(720deg);
        }
    }

    @keyframes hueRotate {
        100% {
            filter: contrast(15) hue-rotate(360deg);
        }
    }
</style>
