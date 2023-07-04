<script lang="ts">
    import { onMount } from "svelte";
    const arr = new Array(100);

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_47_3";
        document.head.appendChild(style);

        for (let i = 0; i < 100; i++) {
            const x = i % 10;
            const y = (i - x) / 10;
            style.appendChild(
                document.createTextNode(`
                .position:nth-child(${i}) {
                    top: ${y * 20}px;
                    left: ${x * 20}px;
                }

                .position:nth-child(${i}):hover ~ .ball {
                    top: ${y * 20 + 10}px;
                    left: ${x * 20 + 10}px;
                }
            `)
            );
        }

        return () => {
            document.head.removeChild(style);
        };
    });
</script>

鼠标跟随按钮

<div class="page">
    <div class="container">
        {#each arr as item}
            <div class="position" />
        {/each}
        <div class="ball" />
        <button class="btn">Button</button>
    </div>
</div>

<style>
    .page {
        background-color: black;
        width: 100vw;
        height: 100vh;
        filter: blur(1px) contrast(5);
        overflow: hidden;
    }

    .container {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 50%;
        left: 50%;
        background-color: black;
        transform: translate(-50%, -50%);
    }

    .btn {
        position: absolute;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #69a6d8;
        opacity: 0.8;
        border-radius: 50%;
        z-index: 1;
        color: #000;
        font-size: 36px;
        transition: color 1s;
    }

    .ball {
        position: absolute;
        width: 130px;
        height: 130px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #00869a;
        border-radius: 50%;
        opacity: 0;
        z-index: 0;
        transition: left 0.1s ease-in, top 0.1s ease-out, opacity 0s;
        mix-blend-mode: lighten;
    }

    .position {
        position: absolute;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        cursor: pointer;
        z-index: 2;
    }

    .container:hover .ball {
        opacity: 0.78;
    }
</style>
