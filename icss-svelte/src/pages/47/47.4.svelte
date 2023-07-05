<script lang="ts">
    import { onMount } from "svelte";
    const count = 100;
    const points = 10;
    const pArr = new Array(count);
    const pointArr = new Array(points);

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_47_4";
        document.head.appendChild(style);

        for (let i = 0; i < count; i++) {
            const x = i % 10;
            const y = (i - x) / 10;
            style.appendChild(
                document.createTextNode(`
            #c_47_4 .position:nth-child(${i + 1}) {
                top: ${y * 10}vh;
                left: ${x * 10}vw;
            }
            #c_47_4 .position:nth-child(${i + 1}):hover ~ .ball .point {
                top: ${y * 10 + 5}vh;
                left: ${x * 10 + 5}vw;
            }
            `)
            );
        }
        for (let i = 0; i < points; i++) {
            style.appendChild(
                document.createTextNode(`
            #c_47_4 .point:nth-child(${i + 1}) {
                width: calc(3vmax + 1vmax * ${i});
                height: calc(3vmax + 1vmax * ${i});
                border: 0.9vmax solid #fff;
                border-radius: 50%;
                transition: 1s;
                transition-delay: ${8 * i}ms;
                transition-timing-function: cubic-bezier(0.27, 1.06, 0.82, 1.11);
            }
            `)
            );
        }

        return () => {
            document.head.removeChild(style);
        };
    });
</script>

鼠标跟随动画

<div id="c_47_4" class="container">
    {#each pArr as position}
        <div class="position" />
    {/each}
    <div class="ball">
        {#each pointArr as point}
            <div class="point" />
        {/each}
    </div>
</div>

<style>
    .container {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .position {
        position: absolute;
        width: 10vw;
        height: 10vh;
        box-sizing: border-box;
        cursor: pointer;
    }

    .ball {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        filter: blur(5px) contrast(10) hue-rotate(50deg);
        background: linear-gradient(45deg, #000, #333, #666, #999, #ccc, #fff);
    }

    .point {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
    }
</style>
