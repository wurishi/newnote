<h1>4. 从倒影说起，谈谈 CSS 继承 `inherit`</h1>

1. `-webkit-box-reflect`

<div class="reflect" />

<div style="height: 200px;" />

2. `inherit`使用继承    

<div class="inherit" />

<style>
    .reflect {
        -webkit-box-reflect: below;
        background-image: url("/img.jpg");
        width: 200px;
        height: 150px;
    }

    .inherit {
        position: relative;
        background-image: url("/img.jpg");
        width: 200px;
        height: 150px;
    }
    .inherit::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        bottom: -100%;
        background-image: inherit;
        transform: rotateX(180deg);
        background-repeat: no-repeat;
    }
</style>
