<div class="page">
    <div class="box">Hover Me</div>
    <div class="box">Hover Me</div>
</div>

<style>
    .page {
        display: flex;
        flex-direction: row;
        background: yellowgreen;
        height: 300px;
    }

    .box {
        position: relative;
        margin: auto;
        width: 200px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        overflow: hidden;
    }

    .box::after {
        content: "Hover Me";
        position: absolute;
        top: 4px;
        bottom: 4px;
        right: 4px;
        left: 4px;
        line-height: 92px;
        font-size: 24px;
        background: #fff;
        /* border-radius: 50%; */
        border: 2px solid yellowgreen;
        cursor: pointer;
        color: yellowgreen;
    }

    .box::before {
        content: "";
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: -20px;
        left: 0px;
        background: #fff;
        /* border-radius: 50%; */
        transform: rotateZ(-90deg) translate(-100%, -100%);
        transform-origin: top left;
        transition: transform 0.3s;
        transition-timing-function: linear;
    }

    .box:hover {
        filter: contrast(1.2);
    }
    .box:hover::before {
        transform: rotateZ(0deg) translate(0%, 0%);
    }

    .box:nth-child(2) {
        overflow: unset;
    }
</style>
