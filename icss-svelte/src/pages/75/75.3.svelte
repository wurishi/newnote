<script lang="ts">
    const box = [];
    for (let i = 1; i <= 10; i++) {
        box.push(i);
    }
</script>

<div class="container">
    {#each box as item}
        <div
            class="box"
            style="--width: {item * 30}px; --hsla: hsla({item *
                25}, 50%, 65%, 1); --index: {10 - item}; --deg: {item * 7}deg;"
        />
    {/each}
</div>

<style>
    .container {
        position: relative;
        width: 300px;
        height: 300px;
    }

    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -150px;
        margin-top: -150px;
        width: 100%;
        height: 100%;
        border: 1px solid #000;
    }

    .box {
        width: var(--width);
        height: var(--width);
        margin-left: calc(var(--width) * -0.5);
        margin-top: calc(var(--width) * -0.5);

        border-color: var(--hsla);
        background: var(--hsla);
        z-index: var(--index);
    }

    .box {
        transform: rotate(var(--deg));
    }
</style>
