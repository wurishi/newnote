<script lang="ts">
    let parent = false;
</script>

<label for="parent">parent:</label>
<input id="parent" type="checkbox" bind:checked={parent} />
<div class="container">
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
    <div class:parent>
        <div class="sticky">
            <p>222222</p>
            <p>222222</p>
            <p>222222</p>
            <p>222222</p>
        </div>
    </div>
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
    <p>111111</p>
</div>

<style>
    .container {
        position: relative;
        width: 300px;
        height: 80vh;
        margin: auto;
        border: 1px solid #333;
        overflow: scroll;
        line-height: 42px;
    }

    .parent {
        height: 100vh;
    }

    .sticky {
        background-color: deeppink;
        position: sticky;
        top: 0;
    }
</style>
