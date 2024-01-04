`border-image` + `clip-path`

<div class="border-image-clip-path" />

<style>
    .border-image-clip-path {
        width: 200px;
        height: 100px;
        border-image-width: 10px;
        border-radius: 10px;
        border-image-source: linear-gradient(45deg, gold, deeppink);
        border-image-slice: 1;
        border-image-repeat: stretch;
        clip-path: inset(0 round 10px);
        filter: hue-rotate(360deg);
        animation: huerotate 6s linear infinite;
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
