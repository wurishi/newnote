<script lang="ts">
    let list = new Array<string>();
    let style = false;

    const addHandler = () => {
        list.push('Coco');
        list = list;
    }

    const changeStyle = () => {
        const list = document.querySelectorAll('.container-32-2 p');
        list.forEach((el: HTMLElement) => {
            if(el.style.height !== '100px') {
                el.style.height = '100px';
            } else {
                el.style.height = 'auto';
            }
        })
    }
</script>

contain: style
<label for="style">开启 contain: style</label>
<input name="style" type="checkbox" bind:checked={style} />
<button on:click={changeStyle}>change style</button>
<div class="container-32-2" class:style on:click={addHandler}>
    {#each list as item}
        <p>{item}</p>
    {/each}
</div>

<style>
    .container-32-2 {
        width: 300px;
        padding: 10px;
        border: 1px solid red;
    }

    .container-32-2.style {
        contain: style;
    }

    p {
        border: 1px solid blue;
        margin: 5px;
        font-size: 14px;
    }
</style>
