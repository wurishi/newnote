<script lang="ts">
    import { getAssetsUrl } from "../../proxy";
    import { onMount } from "svelte";

    onMount(() => {
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(`
        @keyframes move {
            100% {
                transform: translate(calc(85vw), 0);
            }
        }
    `));
        style.id = "Style_77_2";
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    });

    const bg = getAssetsUrl("bubbles.png");
    const img1 = getAssetsUrl("hearts-border-image.png");

    const arr = new Array(30).fill("message");
</script>

<div class="page" style={`background-image: url('${bg}');`}>
    <div class="item" style={`background-image: url('${img1}');`}></div>
    <div class="bg">
        {#each arr as item, index}
            <div
                class="barrage"
                style={`color: rgb(255, 255, ${index * 10});
            top: ${(index % 10) * 18}px;
            animation: move ${index * 0.2 + 10}s infinite ${
                index * 0.2 - 1
            }s linear;`}
            >
                {item}
            </div>
        {/each}
    </div>
</div>


<style>
    .page {
        width: 100vw;
        height: 100vh;
        position: relative;
        background-color: black;   
    }

    .item {
        width: 100px;
        height: 100px;
        top: 50px;
        left: 50px;
        position: absolute;
        animation: move 10s infinite alternate;
    }

    @keyframes move {
        100% {
            transform: translate(calc(85vw), 0);
        }
    }

    .bg {
        width: 100vw;
        height: 100vh;
        mask: radial-gradient(circle at 100px 100px, transparent 60px, #fff 80px, #fff 100%);
        animation: mask 10s infinite alternate;
    }

    @keyframes mask {
        100% {
            mask-position: 85vw 0;
        }
    }

    .barrage {
        position: absolute;
        color: #fff;
        font-size: 24px;
        opacity: 0.8;
    }

</style>
