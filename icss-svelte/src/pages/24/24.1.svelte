<script lang="ts">
    const queues = new Array(4);
    const items = new Array(8);

    const colorR = () => Math.floor(Math.random() * 255);
</script>

display: flex
<div class="g-container">
    {#each queues as queue, row}
        <div class="g-queue">
            {#each items as item}
                <div
                    class="g-item"
                    style="background-color:rgb({colorR()}, {colorR()}, {colorR()}); height: {Math.floor(
                        Math.random() * 200
                    ) + 50}px;"
                >
                    {row + 1}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .g-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        overflow: hidden;
    }

    .g-queue {
        display: flex;
        flex-direction: column;
        flex-basis: 24%;
    }

    .g-item {
        position: relative;
        width: 100%;
        margin: 2.5% 0;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
