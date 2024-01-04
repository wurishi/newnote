按钮填充效果
<div class="btn">Btn</div>

<style>
    .btn {
        width: 150px;
        text-align: center;
        position: relative;
        color: deeppink;
        background-color: transparent;
        border: 3px solid deeppink;
    }
    .btn::after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 50%;
        height: 100%;
        width: 0;
        background-color: deeppink;
        transition: width 0.5s, left 0.5s;
    }
    .btn:hover {
        color: white;
    }
    .btn:hover::after {
        top: 0;
        left: 0;
        width: 100%;
        transition: width 0.5s, left 0.5s;
    }

    .btn {
        background-color: deeppink;
        background-image: linear-gradient(white, white);
        background-repeat: no-repeat;
        background-size: 0% 100%;
        background-position: center;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: background-size 0.5s;
    }

    .btn:hover {
        background-size: 100% 100%;
    }
</style>
