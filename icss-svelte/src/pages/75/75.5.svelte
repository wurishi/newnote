<script lang="ts">
    const box = [];
    for (let i = 1; i <= 100; i++) {
        box.push(i);
    }
</script>

<div class="container">
    {#each box as item}
        <div
            class="box"
            style="--width: {item}%; --deg: {item * 60}deg; --index: {100 -
                item}; --rgba: {item % 2 === 0
                ? 'rgba(0, 0, 0, ' + item * 0.01 + ')'
                : 'rgba(255, 255, 255, ' + item * 0.01 + ')'};"
        />
    {/each}
</div>

<style>
    .container {
        position: relative;
        width: 300px;
        height: 300px;
        background: black;
        margin: 100px;
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

        transform: rotate(var(--deg));
        background: var(--rgba);
        z-index: var(--index);
    }
</style>
