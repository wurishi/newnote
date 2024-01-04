定位实现

<div>Hover Me</div>

<style>
    div {
        position: relative;
        width: 200px;
        height: 60px;
        font-size: 32px;
        line-height: 60px;
        cursor: pointer;
    }

    div::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        background-color: deeppink;
        transition: width 0.5s;
    }

    div:hover::before {
        width: 200px;
        left: 0;
        right: unset;
    }
</style>
