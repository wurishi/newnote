<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const background = `background-image: url("${getAssetsUrl("img.jpg")}")`;
</script>

文字背景图

<div class="page">
    <div class="container">
        <div class="pic" style="{background}" />
        <div class="text">IMAGE</div>
    </div>
</div>

<style>
    .page {
        width: 100%;
    }
    .container {
        position: relative;
        width: 200px;
        height: 150px;
    }
    .pic {
        position: relative;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        line-height: 100px;
        font-weight: bold;
        text-align: center;
        width: 100%;
        height: 100%;
        color: black;
        background-color: #fff;
        z-index: 99;
        mix-blend-mode: lighten;
    }
</style>
