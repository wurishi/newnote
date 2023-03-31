<script lang="ts">
    const list = new Array(5);
</script>

<h1>6. 全兼容的多列均匀布局问题</h1>

1. flex

<div class="container demo1">
    {#each list as item, index}
        <i>{index}</i>
    {/each}
</div>

2. `text-align: justify`

<div class="container demo2">
    {#each list as item, index}
        <i>{index}</i>&nbsp;
    {/each}
</div>

3. `text-align: justify`和伪元素

<div class="container demo3">
    {#each list as item, index}
        <i>{index}</i>&nbsp;
    {/each}
</div>

<style>
    .container {
        width: 300px;
        background: #f8f9fa;
        border: 1px solid black;
    }

    .container i {
        width: 24px;
        line-height: 24px;
        display: inline-block;
        text-align: center;
        border-radius: 50%;
        background: black;
        color: white;
    }

    .demo1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .demo2 {
        text-align: justify;
        text-align-last: justify;
    }

    .demo3 {
        text-align: justify;
    }
    .demo3::after {
        content: "";
        display: inline-block;
        position: relative;
        width: 100%;
    }
</style>
