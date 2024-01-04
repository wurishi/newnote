<script lang="ts">
    const list = new Array<number>(10).fill(0);
</script>

<div class="page">
    <div class="box">
        <h1>纯 CSS 滚动进度条</h1>
        {#each list as item}
            <p>
                在继续阅读下文之前，你可以先缓一缓。尝试思考一下上面的效果或者动手尝试一下，不借助
                JS ，能否巧妙的实现上述效果。
            </p>
            <p>
                OK，继续。这个效果是我在业务开发的过程中遇到的一个类似的小问题。其实即便让我借助
                Javascript
                ，我的第一反应也是，感觉很麻烦啊。所以我一直在想，有没有可能只使用
                CSS 完成这个效果呢？
            </p>
        {/each}
    </div>
</div>

<style>
    .box {
        position: relative;
        padding: 50px;
        font-size: 24px;
        line-height: 30px;
        background-image: linear-gradient(to right top, #ffcc00 50%, #eee 50%);
        background-size: 100% calc(100% - 100vh + 5px);
        background-repeat: no-repeat;
        z-index: 1;
    }

    .box::after {
        content: "";
        position: fixed;
        top: 5px;
        left: 0;
        bottom: 0;
        right: 25px;
        background: #fff;
        z-index: -1;
    }
</style>
