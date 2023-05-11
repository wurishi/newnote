<script lang="ts">
    const arr = new Array<string>();
    const randomNum = (max: number, min = 0, size= 1) => {
        return Math.floor(min + Math.random() * max * size);
    };
    for (let i = 0; i < 40; i++) {
        const style = [
            `bottom: -${randomNum(120, 240)}px`,
            `left: ${randomNum(300, -160)}px`,
            `animation-duration: ${randomNum(2 * 13, 7, .1)}s`,
            `animation-delay: ${randomNum(3 * 20, 0, .1)}s`
        ];
        arr.push(style.join(";"));
    }
</script>

燃烧的火焰

<div class="container">
    <div class="fire">
        {#each arr as item}
            <div class="dot" style={item} />
        {/each}
    </div>
</div>

<style>
    :root {
        --fireWidth: 115px;
        --fireHeight: 200px;
        --dotSize: 24px;
        --fireColor: #b5932f;
    }

    .container {
        position: relative;
        width: 384px;
        height: 300px;
        margin: 0 auto;
        background-color: black;
        overflow: hidden;
    }

    .fire {
        position: absolute;
        width: 0;
        height: 0;
        bottom: 100px;
        left: 50%;
        border-radius: 45%;
        box-sizing: border-box;
        border: 200px solid black;
        border-bottom: 200px solid transparent;
        transform: translate(-50%, 0) scaleX(0.4);
        background-color: var(--fireColor);
        filter: blur(20px) contrast(30);
    }

    .dot {
        position: absolute;
        bottom: -210px;
        left: 0;
        width: var(--dotSize);
        height: var(--dotSize);
        background: black;
        border-radius: 50%;
        animation-name: move;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    @keyframes move {
        100% {
            transform: translate3d(0, -350px, 0);
        }
    }
</style>
