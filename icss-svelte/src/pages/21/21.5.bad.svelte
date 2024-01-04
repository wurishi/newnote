过多图形层：
<div class="container">
    <div class="swiper">轮播图</div>
    <ul class="list">
        <li>列表li</li>
        <li>列表li</li>
        <li>列表li</li>
        <li>列表li</li>
    </ul>
</div>

<style>
    .swiper {
        position: static;
        animation: 10s move infinite;
    }

    .list {
        position: relative;
    }

    @keyframes move {
        100% {
            transform: translate3d(10px, 0, 0);
        }
    }
</style>
