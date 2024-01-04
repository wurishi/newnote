<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    const list = new Array(10).fill(0);

    onMount(() => {
        const style = document.createElement('style')
        style.id = 'style_42_3'
        document.head.appendChild(style)
        for(let i=1;i<=10;i++) {
            style.appendChild(document.createTextNode(`
            .section:nth-child(${i}) {
                transform: translateZ(-${i}px) scale(${i * 0.1 + 1});
                color: hsla(${i * 35}deg, 100%, 60%, 0.8);
                z-index: ${i};
            }
            `))
        }
    })
    onDestroy(() => {
        const style = document.head.querySelector('#style_42_3')
        document.head.removeChild(style)
    })
</script>

transform: translate3d

<div class="container">
    {#each list as item}
        <div class="section">CSS Parallax</div>
    {/each}
</div>

<style>
    .container {
        height: 200px;
        overflow-x: hidden;
        overflow-y: scroll;
        transform-style: preserve-3d;
        perspective: 10px;
        filter: blur(5px) contrast(5px);
    }

    .section {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        text-align: center;
        line-height: 200px;
        padding: 100px 0;
        font-size: 35px;
    }
</style>
