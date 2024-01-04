hue-rotate
<div />

<style>
    div {
        width: 100%;
        height: 100px;
        background: linear-gradient(45deg, var(--color1), var(--color2), var(--color3));
        animation: hueRotate 10s infinite alternate;
    }

    @keyframes hueRotate {
        0% {
            filter: hue-rotate(0);
        }
        100% {
            filter: hue-rotate(360deg);
        }
    }
</style>
