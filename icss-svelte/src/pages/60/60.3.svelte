`background-clip` 实现

<div class="background-clip" />

<style>
    .background-clip {
        width: 200px;
        height: 100px;
        border: solid 10px transparent;
        border-radius: 10px;
        background-image: linear-gradient(#fee, #fee),
            linear-gradient(to right, green, gold);
        background-origin: border-box;
        background-clip: content-box, border-box;
    }
</style>
