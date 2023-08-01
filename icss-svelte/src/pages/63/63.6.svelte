<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const img1 = getAssetsUrl("img.jpg");
    const img2 = getAssetsUrl("galaxy.jpg");
    const mask = getAssetsUrl("mask.png");
</script>

mask 与图片

<div class="container">
    <div class="img1" style="background: url({img1})" />
    <div
        class="img2"
        style="background: url({img2}); -webkit-mask-image: url({mask});"
    />
</div>

<style>
    .container {
        position: relative;
        width: 200px;
        height: 150px;
    }

    .img1 {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-size: cover;
    }

    .img2 {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-size: cover;
        -webkit-mask-size: 3000% 100%;
        animation: maskMove 2s steps(5) infinite;
    }

    @keyframes maskMove {
        from {
            -webkit-mask-position: 0 0;
        }
        to {
            -webkit-mask-position: 100% 0;
        }
    }
</style>
