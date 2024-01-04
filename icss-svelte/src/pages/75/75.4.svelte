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
            style="--width: {item}%; --deg: {item * 30}deg; --hsla: hsla({(100 -
                item) *
                2.55}, {item}%, 50%, {item / 100});"
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
        border-color: var(--hsla);
    }
</style>
