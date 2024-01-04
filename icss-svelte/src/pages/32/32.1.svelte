<script lang="ts">
    let list = new Array<string>();
    let sizeFlag = false;

    const addHandler = () => {
        list.push('Coco');
        list = list;
    }
</script>

contain: size
<br />
<label for="size">开启 contain: size</label>
<input name="size" type="checkbox" bind:checked={sizeFlag} />
<div class="container-32-1" class:size={sizeFlag} on:click={addHandler}>
    {#each list as item}
        <p>{item}</p>
    {/each}
</div>
<div class="box"></div>

<style>
    .container-32-1 {
        width: 300px;
        padding: 10px;
        border: 1px solid red;
    }

    .container-32-1.size {
        contain: size;
    }

    p {
        border: 1px solid blue;
        margin: 5px;
        font-size: 14px;
    }

    .box {
        width: 200px;
        height: 20px;
        border: 1px solid green;
    }
</style>
