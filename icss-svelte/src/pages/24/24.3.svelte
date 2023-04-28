<script lang="ts">
    import { each } from "svelte/internal";

    const list = new Array(8);

    const random = () => Math.floor(Math.random() * 255);
    const randomColor = () => `rgb(${random()}, ${random()}, ${random()})`;
    const style = () =>
        `background-color: ${randomColor()};`;
</script>

display: grid
<div class="g-container">
    {#each list as item, idx}
        <div class="g-item" style={style()}>{idx + 1}</div>
    {/each}
</div>

<style>
    .g-container {
        display: grid;
        height: 100vh;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(8, 1fr);
    }

    .g-item {
        margin: 0.5vw;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .g-item:nth-child(1) {
        grid-column: 1;
        grid-row: 1 / 3;
    }
    .g-item:nth-child(2) {
        grid-column: 2;
        grid-row: 1 / 4;
    }
    .g-item:nth-child(3) {
        grid-column: 3;
        grid-row: 1 / 5;
    }
    .g-item:nth-child(4) {
        grid-column: 4;
        grid-row: 1 / 6;
    }
    .g-item:nth-child(5) {
        grid-column: 1;
        grid-row: 3 / 9;
    }
    .g-item:nth-child(6) {
        grid-column: 2;
        grid-row: 4 / 9;
    }
    .g-item:nth-child(7) {
        grid-column: 3;
        grid-row: 5 / 9;
    }
    .g-item:nth-child(8) {
        grid-column: 4;
        grid-row: 6 / 9;
    }
</style>
