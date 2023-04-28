文字渐变效果
<div>background-clip: text</div>

<style>
    div {
        font-size: 54px;
        color: transparent;
        background: linear-gradient(45deg, #ffeb3b, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);
        -webkit-background-clip: text;
        animation: huerotate 3s infinite;
    }

    @keyframes huerotate {
        100% {
            filter: hue-rotate(360deg);
        }
    }
</style>