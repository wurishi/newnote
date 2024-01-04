使用 clip-path 生成圆形和十边形

<div class="circle"></div>
<div class="polygon"></div>

<style>
    .circle {
        width: 100px;
        height: 100px;
        background: yellowgreen;
        clip-path: circle(50px at 50px 50px);
    }

    .polygon {
        width: 100px;
        height: 100px;
        background: yellowgreen;
        clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);
    }
</style>