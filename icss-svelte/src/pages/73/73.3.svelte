<div class="box" />

<style>
    .box {
        /* border: 1px solid #333; */
        outline: 1px solid #333;
        outline-offset: -1px;
        width: 200px;
        height: 120px;
    }

    .box:hover {
        /* border: none; */
        outline: none;
        background: linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
            linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
            linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
            linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
        background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
        background-position: 0 0, 0 100%, 0 0, 100% 0;
        animation: linearGradientMove 0.3s infinite linear;
    }

    @keyframes linearGradientMove {
        100% {
            background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
        }
    }
</style>
