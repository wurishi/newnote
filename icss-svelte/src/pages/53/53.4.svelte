使用负 `letter-spacing` 倒序排列文字

<p>倒序排列文字</p>

<style>
    p {
        font-size: 36px;
        text-align: center;
        animation: letter 8s linear infinite;
    }

    @keyframes letter {
        40% {
            letter-spacing: 36px;
        }
        80% {
            letter-spacing: -72px;
        }
        100% {
            letter-spacing: -72px;
        }
    }
</style>
