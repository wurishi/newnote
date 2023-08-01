<script lang="ts">
    let flag = false;
</script>

display: contents 穿透

<div>
    <label for="flag2">使用 display: contents</label>
    <input id="flag2" type="checkbox" bind:checked={flag} />
</div>
<div class="container">
    <div class="box">1</div>
    <div style={`display: ${flag ? "contents" : "block"}`}>
        <div class="box">2</div>
        <div class="box">3</div>
    </div>
    <div class="box">4</div>
    <div class="box">5</div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100vw;
        background-color: black;
    }

    .box {
        width: 45vw;
        height: 50px;
        border: 1px solid white;
        background-color: aquamarine;
        text-align: center;
    }
</style>
