图片窥探效果

<div>
    <div class="mask" />
    <p>·</p>
</div>

<style>
    div {
        position: relative;
        margin: 0 auto;
        width: 200px;
        height: 150px;

        margin-bottom: 100vh;
    }

    .mask {
        width: 100%;
        height: 100%;
        background: url("/img.jpg");
        background-size: cover;
        filter: blur(10px);
        transition: 0.3s;
    }

    p {
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        z-index: 1;
        line-height: 100px;
        font-size: 100px;
        font-weight: bold;
        background: url("/img.jpg") no-repeat center center;
        -webkit-background-clip: text;
        color: transparent;
        animation: move 4s ease-in infinite alternate;
    }

    @keyframes move {
        0% {
            line-height: 100px;
            font-size: 100px;
        }
        100% {
            line-height: 200px;
            font-size: 400px;
        }
    }
</style>
