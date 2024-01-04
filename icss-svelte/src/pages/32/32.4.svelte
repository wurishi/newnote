<script lang="ts">
    let list = new Array<string>();
    let layout = false;

    const addHandler = () => {
        list.push('Coco');
        list = list;
    }

    const changeStyle = () => {
        const list = document.querySelectorAll('.container-32-4 p');
        list.forEach((el: HTMLElement) => {
            if(el.style.height !== '100px') {
                el.style.height = '100px';
            } else {
                el.style.height = 'auto';
            }
        })
    }
</script>

contain: layout
<br />
<label for="layout">开启 contain: layout</label>
<input name="layout" type="checkbox" bind:checked={layout} />
<button on:click={changeStyle}>change style</button>
<div class="page">
    <div class="container-32-4" class:layout on:click={addHandler}>
        {#each list as item}
            <p>{item}</p>
        {/each}
    </div>
    <div class="box"></div>
</div>

<style>
    .container-32-4 {
        width: 300px;
        padding: 10px;
        border: 1px solid red;
        float: top;
    }

    .container-32-4.layout {
        contain: layout;
    }

    p {
        border: 1px solid blue;
        margin: 5px;
        font-size: 14px;
    }

    .box {
        width: 100px;
        height: 10px;
        border: 1px solid green;
    }
</style>
