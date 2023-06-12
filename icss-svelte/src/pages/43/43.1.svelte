单侧阴影

<div class="left">左</div>
<div class="right">右</div>
<div class="top">上</div>
<div class="bottom">下</div>

<style>
    .left,
    .right,
    .top,
    .bottom {
        margin: 30px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid black;
    }

    .left {
        box-shadow: -7px 0 5px -5px #333;
    }

    .right {
        box-shadow: 7px 0 5px -5px #333;
    }

    .top {
        box-shadow: 0 -7px 5px -5px #333;
    }

    .bottom {
        box-shadow: 0 7px 5px -5px #333;
    }
</style>
