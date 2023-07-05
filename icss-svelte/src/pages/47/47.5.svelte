<script lang="ts">
    import { onMount } from "svelte";
    const triggerCount = 200;
    const ballCount = 10;
    const tArr = new Array(triggerCount);
    const bArr = new Array(ballCount);

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_47_5";
        document.head.appendChild(style);
        style.appendChild(
            document.createTextNode(`
        @keyframes rotate {
            0% {
                transform: translate(-50%, -50%) rotateZ(0deg);
            }
            
            100% {
                transform: translate(-50%, -50%) rotateZ(360deg);
            }
        }

        @keyframes slide {
            0% {
                transform: translateX(-150px);
            }
            
            100% {
                transform: translateX(300px);
            }
        }

        @keyframes attention {
            0% {
                letter-spacing: 10px;
            }
            
            100% {
                letter-spacing: 40px;
            }
        }

        @keyframes fade {
            0% {
                opacity: 0;
            }
            
            30% {
                opacity: 1;
            }
            
            100% {    
                opacity: 0;
            }
        }
        `)
        );
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 20; j++) {
                const key = (i - 1) * 20 + j;
                style.appendChild(
                    document.createTextNode(`
                #c_47_5 .trigger:nth-child(${key}):hover ~ .monitor .ball {
                    top: calc(${i - 1} * 10% + 5%);
                    left: calc(${j - 1} * 5% + 2.5%);
                }
                `)
                );
            }
        }

        for (let i = 1; i <= 10; i++) {
            style.appendChild(
                document.createTextNode(`
            #c_47_5 .ball:nth-child(${i}) {
                width: ${i * 50 + 20}px;
                height: ${i * 50 + 20}px;
                transition-duration: ${300 + 200 * i}ms;
                animation: rotate ${
                    Math.floor(Math.random() * 600000) + 600000 - 1200000
                }ms linear infinite;
                border-color: rgba(${
                    Math.floor(Math.random() * 100) + 200
                }, 255, 255, 1);
                border-top-width: ${Math.floor(Math.random() * 6) + 5}px;
                border-right-width: ${Math.floor(Math.random() * 6) + 5}px;
                border-bottom-width: ${Math.floor(Math.random() * 6) + 5}px;
                border-left-width: ${Math.floor(Math.random() * 6) + 5}px;
            }
            #c_47_5 .ball:nth-child(${i})::before {
                width: ${Math.floor(Math.random() * 20) + 10}px;
                height: ${Math.floor(Math.random() * 20) + 10}px;
                animation: slide ${
                    Math.floor(Math.random() * 10000) + 10000 - 20000
                }ms ease-in-out infinite alternate;
            }
            `)
            );
        }

        return () => {
            document.head.removeChild(style);
        };
    });
</script>

<div id="c_47_5" class="page">
    <attention> Please take touch </attention>
    <div class="container">
        {#each tArr as t}
            <div class="trigger" />
        {/each}
        <div class="monitor">
            {#each bArr as b}
                <div class="ball" />
            {/each}
        </div>
    </div>
</div>

<style>
    .page {
        background-color: black;
        height: 100vh;
        overflow: hidden;
        cursor: pointer;
        position: relative;
    }

    attention {
        position: absolute;
        z-index: 999;
        top: 50%;
        left: 50%;
        color: #fff;
        font-size: 20px;
        font-weight: light;
        font-family: "Quicksand", sans-serif;
        letter-spacing: 10px;
        white-space: nowrap;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: attention 8000ms linear forwards, fade 8000ms linear forwards;
    }

    .container {
        position: relative;
        display: grid;
        grid-template-rows: repeat(10, 10vh);
        grid-template-columns: repeat(20, 5vw);
    }

    .monitor {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        pointer-events: none;
        filter: blur(10px) contrast(30);
    }

    .ball {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 300px;
        border-radius: 100%;
        transform: translate(-50%, -50%);
        transition-timing-function: cubic-bezier(0.33, 1.7, 0.51, 0.82);
        mix-blend-mode: screen;

        border: 10px solid #fff;
    }

    .ball::before {
        content: "";
        position: absolute;
        background: #fff;
        border-radius: 100%;
    }
</style>
