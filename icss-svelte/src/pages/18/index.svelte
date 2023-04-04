<script lang="ts">
    const list = new Array<number>(10).fill(0)
</script>

<div class="container">
    {#each list as item, idx}
        <div class="item">{idx}</div>
    {/each}
</div>

<div class="container container2">
    {#each list as item, idx}
        <div class="item">{idx}</div>
    {/each}
</div>

<style>
    .container {
        height: 300px;
        overflow: auto;
    }

    .container .item {
        height: 100px;
        width: 100%;
        background: linear-gradient(to bottom, deeppink 0, rgba(255, 0, 0, 0) 100%);
        position: sticky;
        top: 0;
    }

    .container2 {
        width: 100px;
        position: fixed;
        right: 0;
    }
</style>