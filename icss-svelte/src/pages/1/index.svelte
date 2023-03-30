<h1>1. 左边框的多种实现方式</h1>
<div />
<div class="border">1.border</div>
<div class="cls-2">2.伪元素</div>
<div class="box-shadow">3.外 box-shadow</div>
<div class="inset-box-shadow">4.内 box-shadow</div>
<div class="drop-shadow">5.drop-shadow</div>
<div class="linear-gradient">6.渐变</div>
7.轮廓: <div class="outline" />
8.滚动条: <div class="scrollbar" />
<div class="text-decoration">9.下划线</div>
<div class="first-letter">10.first-letter</div>
<div class="list-style">11.list-style</div>

<style>
    div {
        position: relative;
        width: 200px;
        height: 60px;
        background: #ddd;
        margin: 20px;
    }

    /* 1 */
    .border {
        border-left: 5px solid deeppink;
    }

    /* 2 */
    .cls-2::before {
        content: '';
        width: 5px;
        height: 60px;
        position: absolute;
        top: 0;
        left: 0;
        background: deeppink;
    }

    /* 3 */
    .box-shadow {
        box-shadow: -5px 0 0 0 deeppink;
    }
    
    /* 4 */
    .inset-box-shadow {
        box-shadow: inset 5px 0 0 0 deeppink;
    }

    /* 5 */
    .drop-shadow {
        filter: drop-shadow(-5px 0 0 deeppink);
    }

    /* 6 */
    .linear-gradient {
        background-image: linear-gradient(90deg, deeppink 0, deeppink 5px, transparent 5px);
    }

    /* 7 */
    .outline {
        outline: 5px solid deeppink;
    }
    .outline::after {
        position: absolute;
        content: '';
        top: -5px;
        bottom: -5px;
        left: 0;
        right: -5px;
        background: #ddd;
    }

    /* 8 */
    .scrollbar {
        width: 205px;
        background: deeppink;
        overflow-y: scroll;
    }
    .scrollbar::-webkit-scrollbar {
        width: 200px;
        background: #ddd;
    }

    /* 9 */
    .text-decoration {
        overflow: hidden;
    }
    .text-decoration::before {
        position: absolute;
        content: '___';
        font-size: 40px;
        bottom: 0;
        text-decoration: underline;
        color: deeppink;
        line-height: 60px;
        transform: rotate(90deg);
        right: 152px;
    }

    /* 10 */
    .first-letter {
        position: relative;
        overflow: hidden;
    }
    .first-letter::first-letter {
        background: deeppink;
        color: transparent;
        width: 5px;
        position: absolute;
        left: 0;
        top: 0;
        padding: 34px 0;
        /* margin-left: -196px; */
    }

    /* 11 */
    .list-style {
        display: list-item;
        list-style-type: square;
        list-style-position: inside;
        font-size: 700px;
        padding-left: 5px;
        background: deeppink;
        color: #ddd;
        line-height: 0;
        overflow: hidden;
    }
</style>
