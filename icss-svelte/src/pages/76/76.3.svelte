<script lang="ts">
    const list = [];
    for (let i = 0; i < 100; i++) {
        list.push(i);
    }
</script>

<div class="container">
    <div class="wrap" />
    <div class="box">
        {#each list as itemI}
            <div class="row">
                {#each list as itemJ}
                    <div class="item" />
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .container {
        width: 500px;
        height: 500px;
        position: relative;
        margin: auto;
        border: 2px solid #333;
    }

    .box {
        position: relative;
        height: 500px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        z-index: 1;
    }

    .wrap {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
    }
    .wrap:active {
        display: none;
    }

    .row {
        width: 500px;
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    .item {
        flex-grow: 1;
        transition: 999999s;
    }
    .item:hover {
        background: #000;
        transition: 0s;
    }
</style>
