<script lang="ts">
    let paint = false;

</script>

<div>contain: paint</div>
<label for="paint">开启 contain: paint</label>
<input name="paint" type="checkbox" bind:checked={paint} />
<div class="container" class:paint>
    <p>Inner</p>
</div>

<style>
    .container {
        border: 1px solid red;
        position: relative;
    }
    .container.paint {
        contain: paint;
    }

    .container p {
        margin-left: -10px;
        border: 1px solid black;
    }

</style>