翻转

<p class="r">CSS Nagative Scale(-1)</p>
<p class="s">CSS Nagative Scale(-1)</p>

<style>
    p {
        font-size: 36px;
        text-align: center;
        line-height: 72px;
    }

    .r {
        animation: rotate 8s infinite linear;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(180deg);
        }
    }

    .s {
        animation: scale 8s infinite linear;
    }
    @keyframes scale {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(-1);
        }
        100% {
            transform: scale(-1);
        }
    }
</style>
