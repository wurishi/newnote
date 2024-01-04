配合 background-size 使用
<div class="c1"></div>
加上 background-size:
<div class="c2"></div>

<style>
    div {
        width: 250px;
        height: 250px;
        margin: 50px auto;
        background: conic-gradient(#000 12.5%, #fff 0 37.5%, #000 0 62.5%, #fff 0 87.5%, #000 0);
    }
    .c2 {
        background-size: 50px 50px;
    }
</style>