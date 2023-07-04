<script lang="ts">
    import { onMount } from "svelte";
    const x = 10;
    const y = 10;
    const xArr = new Array(x);
    const yArr = new Array(y);

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_46_1";
        for(let i=0;i<x;i++) {
            for(let j=0;j<y;j++) {
                const idx = j * 10 + i + 1
                style.appendChild(document.createTextNode(`
                .position:nth-child(${idx}) {
                    top: ${i * 60}px;
                    left: ${j * 80}px;
                }

                .position:nth-child(${idx}):hover {
                    background: rgba(255, 255, 10, .5);
                }

                .position:nth-child(${idx}):hover ~ .ball {
                    top: ${i * 60}px;
                    left: ${j * 80}px;
                    transform: unset;
                }
                `));
            }
        }

        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    });
</script>

小球跟随
<div class="container">
    {#each xArr as xItem, x}
        {#each yArr as yItem, y}
            <div class="position" />
        {/each}
    {/each}
    <div class="ball"></div>
</div>

<style>
    .container {
        width: 800px;
        height: 600px;
        box-sizing: content-box;
        border: 1px solid black;
        position: relative;
    }

    .position {
        width: 80px;
        height: 60px;
        position: absolute;
    }

    .ball {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        width: 10vmax;
        height: 10vmax;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        pointer-events: none;
        transition: left .1s ease-out, right .1s ease-out;
    }
</style>
