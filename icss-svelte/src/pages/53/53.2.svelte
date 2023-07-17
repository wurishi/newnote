单侧投影
<div class="left">左</div>
<div class="right">右</div>
<div class="top">上</div>
<div class="bottom">下</div>

<style>
    div {
        padding: 20px;
        width: 50px;
        height: 50px;
        box-sizing: content-box;
    }

    .left {
        box-shadow: -7px 0 5px -5px black;
    }

    .right {
        box-shadow: 7px 0 5px -5px black;
    }

    .top {
        box-shadow: 0 -7px 5px -5px black;
    }

    .bottom {
        box-shadow: 0 7px 5px -5px black;
    }
</style>
