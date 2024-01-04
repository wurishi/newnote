滴水效果

<div class="page">
    <div class="magic">MAGICCSS</div>
</div>

<style>
    .page {
        width: 90vw;
        height: 100vh;
        overflow: hidden;
        background-color: black;
        filter: blur(3px) contrast(10);
    }

    .magic {
        position: relative;
        width: 640px;
        height: 106px;
        color: white;
        font-size: 124px;
        text-align: center;
        margin: 100px auto;
        border-bottom: 10px solid white;
        transform: skewY(5deg);
    }

    .magic::before,
    .magic::after {
        position: absolute;
        content: "";
        bottom: -20px;
        left: 0;
        width: 10px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        transform: translate(0, 0);
        animation: move 7.5s ease-in-out infinite;
    }

    .magic::after {
        animation: move 7.5s ease-in-out 1s infinite;
    }

    @keyframes move {
        80% {
            bottom: -30px;
            transform: translate(623px, 0);
        }
        93% {
            transform: translate(623px, 3px);
            opacity: 1;
        }
        100% {
            transform: translate(623px, 150px);
            opacity: 0;
        }
    }
</style>
