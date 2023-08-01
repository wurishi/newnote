<script lang="ts">
    let flag = false;
</script>

display: contents
<div>
    <label for="flag">use display: contents</label>
    <input id="flag" type="checkbox" bind:checked={flag} />
</div>
<div class="container">
    <div class="wrap" style={`display: ${flag ? "contents" : "block"}`}>
        <div class="inner" />
    </div>
</div>

<style>
    .container {
        width: 200px;
        height: 200px;
        background: #bbb;
    }

    .wrap {
        border: 2px solid red;
        padding: 20px;
        box-sizing: border-box;
    }

    .inner {
        border: 2px solid green;
        padding: 20px;
        box-sizing: border-box;
    }
</style>
