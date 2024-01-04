contain: paint

<div class="container">
    <div class="box"></div>
</div>

<style>
    .container {
        width: 200px;
        height: 200px;
        background-color: yellow;
        position: relative;
        contain: paint;
    }

    .box {
        width: 50px;
        height: 50px;
        position: absolute;
        top: -25px;
        left: -25px;
        border: 1px solid grey;
    }
</style>