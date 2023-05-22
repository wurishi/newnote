transform: scale()

<div>Hover Me</div>

<style>
    div {
        width: 200px;
        height: 60px;
        line-height: 60px;
        font-size: 32px;
        cursor: pointer;
        color: #333;
        text-align: center;
        position: relative;
    }

    div::before {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        width: 200px;
        height: 2px;
        background-color: deeppink;
        transform: scaleX(0);
        transition: all .5s;
    }

    div:hover::before {
        transform: scaleX(1);
    }
</style>
