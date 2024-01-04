<script lang="ts">
    const arr = new Array(500).fill(0);
</script>

过渡取消
<div class="page">
    <div class="bg">hover me</div>
    <div class="container">
        {#each arr as item}
            <div class="box" />
        {/each}
    </div>
</div>

<style>
    .page {
        position: relative;
    }
    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 300px;
        line-height: 300px;
        font-size: 120px;
        text-align: center;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(118, 218, 255, 0.8);
        z-index: -1;
    }

    .container {
        width: 100%;
        height: 300px;
        overflow: hidden;
        cursor: pointer;
        z-index: 100;
    }

    .box {
        position: relative;
        float: left;
        width: 30px;
        height: 30px;
        margin: 4px;
    }
    .box::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        transform: scale3d(0.1, 0.1, 1);
        background-color: transparent;
        transition: 0.5s transform ease-in, 0.5s background ease-in;
    }
    .box:hover::before {
        transform: scale3d(1.8, 1.8, 1.8);
        transition: 0s transform;
        background-color: red;
    }
</style>
