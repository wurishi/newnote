<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const src = getAssetsUrl('galaxy.jpg');
    const background = `url("${src}") no-repeat center center;`
</script>

生成图像阴影
{background}
<div class="img" style={'background:' + background}></div>

<style>
    .img {
        width: 200px;
        height: 150px;
        position: relative;
    }
    .img::after {
        content: "";
        position: absolute;
        top: 0;
        left: 25px;
        width: 100%;
        height: 100%;
        background: inherit;
        transform: scale(.95);
        z-index: -1;
        animation: filterChange 10s infinite linear;
    }

    @keyframes filterChange {
        0% {
            top: 0;
            filter: blur(0) brightness(101%) opacity(1);
        }
        40% {
            top: 10%;
            filter: blur(0) brightness(101%) opacity(1);
        }
        50% {
            top: 10%;
            filter: blur(10px) brightness(80%) opacity(.8);
        }
        100% {
            top: 10%;
            filter: blur(10px) brightness(80%) opacity(.8);
        }
    }
</style>