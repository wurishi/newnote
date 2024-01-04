使用 border-image 实现渐变边框

<div class="border-image"></div>

<style>
    .border-image {
        width: 200px;
        height: 100px;
        /* 规范要求使用 border-image 时边框样式必须存在，但有一些浏览器可能没有实现这点 */
        /* border: 1px solid deeppink; */
        /* Chrome 下如果没有设置 border 或者 border-image-width 边框将不会正常显示*/
        border-image-width: 10px;
        border-radius: 10px;
        border-image-source: linear-gradient(45deg, gold, deeppink);
        border-image-slice: 1;
        border-image-repeat: stretch;
        background-color: aqua;
    }
</style>