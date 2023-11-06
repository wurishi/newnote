<div class="box" />

<style>
    .box {
        width: 200px;
        height: 100px;
        border: 10px solid;
        border-image: linear-gradient(45deg, gold, deeppink) 1;
        clip-path: inset(0px round 10px);
        animation: huerotate 6s infinite linear;
        filter: hue-rotate(360deg);
    }

    @keyframes huerotate {
        0% {
            filter: hue-rotate(0deg);
        }
        100% {
            filter: hue-rotate(360deg);
        }
    }
</style>
