<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const src = getAssetsUrl('img.jpg');
    const style = `background-image: url("${src}")`;
</script>

blur 混合 contrast 产生融合效果

<div class="g-container">
    <div class="ball-a"></div>
    <div class="ball-b"></div>
</div>

<div class="g-container">
    <div class="img1" {style}></div>
    <div class="img2" {style}></div>
</div>

<style>
    .g-container {
        position: relative;
        width: 300px;
        height: 200px;
        filter: blur(6px) contrast(20);
        background: white;
    }

    .ball-a {
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: #333;
        top: 40px;
        left: 40px;
        box-sizing: border-box;
        animation: filterBallMove 4s ease-out infinite;
    }

    .ball-b {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #3F51B5;
        top: 60px;
        right: 40px;
        animation: filterBallMove2 4s ease-out infinite;
    }

    .img1, .img2 {
        width: 100px;
        height: 100px;
        background-repeat: no-repeat;
        position: absolute;
        border-radius: 20%;
    }

    .img1 {
        left: 40px;
        animation: filterBallMove 4s ease-out infinite;
    }

    .img2 {
        right: 40px;
        animation: filterBallMove2 4s ease-out infinite;
    }
    

    @keyframes filterBallMove {
        50% {
            left: 140px;
        }
    }

    @keyframes filterBallMove2 {
        50% {
            right: 140px;
        }
    }
</style>