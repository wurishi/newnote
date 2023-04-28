<script lang="ts">
    const list = new Array(32);

    const random = () => Math.floor(Math.random() * 255);
    const randomColor = () => `rgb(${random()}, ${random()}, ${random()})`;
    const style = () =>
        `background-color: ${randomColor()}; height: ${
            Math.floor(Math.random() * 200) + 50
        }px;`;
</script>

column-count
<div class="g-container">
    {#each list as item, idx}
        <div class="g-item" style={style()}>
            {idx + 1}
        </div>
    {/each}
</div>

<style>
    .g-container {
        column-count: 4;
        column-gap: 0.5vw;
        padding-top: 0.5vw;
    }

    .g-item {
        position: relative;
        width: 24vw;
        margin-bottom: 1vw;
        break-inside: avoid;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
