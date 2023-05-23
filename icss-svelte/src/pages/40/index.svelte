<div class="g-container">
    <div class="m-btn s-irregularLineMove">Hover Me</div>
    <div class="m-btn s-irregularDoubleLineMove">Hover Me</div>
    <div class="m-btn s-irregularDoubleLineMoveTwo">Hover Me</div>
    <div class="m-btn s-irregularColorMove">Hover Me</div>
    <div class="m-btn s-pesoduSlice" data-content="Hover Me">Hover Me</div>
    <div class="m-btn s-irregularShadowMove">Hover Me</div>
    <div class="m-btn s-irregularShadowScale">Hover Me</div>
    <div class="m-btn s-dash">Hover Me</div>
    <div class="m-btn s-mixblur" data-content="Camera">Camera</div>
    <div class="m-btn s-svgline">
        <svg
            viewBox="0 0 180 64"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect class="shape" height="64" width="180" />
        </svg>
        <div class="g-text">HOVER ME</div>
    </div>

    <div class="m-btn s-svgMutiLine">
        <svg
            viewBox="0 0 180 64"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect class="shape" height="64" width="180" />
        </svg>
        <div class="g-text">HOVER ME</div>
    </div>
</div>

<style>
    * {
        --width: 180px;
        --height: 64px;
    }
    .g-container {
        width: 100vw;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 20px auto;
        background: linear-gradient(90deg, #03a9f4, #03aaaa);
        padding: 20px;
    }

    .m-btn {
        position: relative;
        flex: 0 0 var(--width);
        height: var(--height);
        line-height: var(--height);
        text-align: center;
        cursor: pointer;
        font-size: 24px;
        transition: 0.2s all;
        box-sizing: border-box;
        color: #fff;
        margin-right: 160px;
        margin-bottom: 20px;
    }

    .s-irregularLineMove:hover {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    .s-irregularLineMove::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 1px;
        background-color: #fff;
        transition: 0.2s all;
    }
    .s-irregularLineMove:hover::before {
        left: 0;
        width: 100%;
    }

    .s-irregularDoubleLineMove:hover {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    .s-irregularDoubleLineMove::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 1px;
        background-color: #fff;
        transition: 0.2s all;
    }
    .s-irregularDoubleLineMove:hover::before {
        left: 0;
        width: 100%;
    }
    .s-irregularDoubleLineMove::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 1px;
        background-color: #fff;
        transition: 0.2s width;
    }
    .s-irregularDoubleLineMove:hover::after {
        right: 0;
        width: 100%;
    }

    .s-irregularDoubleLineMoveTwo:hover {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    .s-irregularDoubleLineMoveTwo::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 1px;
        background-color: #fff;
        transition: 0.2s all;
    }
    .s-irregularDoubleLineMoveTwo:hover::before {
        left: 0;
        width: 100%;
    }
    .s-irregularDoubleLineMoveTwo::after {
        content: "";
        position: absolute;
        width: 180px;
        height: 1px;
        top: 0;
        left: 0;
        background-color: #fff;
        transform: scale3d(0, 1, 1);
        transition: 0.2s transform;
        transform-origin: 0 0;
    }
    .s-irregularDoubleLineMoveTwo:hover::after {
        transform: scale3d(1, 1, 1);
        transform-origin: 100% 100%;
    }

    .s-irregularColorMove {
        border: 1px solid #fff;
    }
    .s-irregularColorMove::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 100%;
        background-color: #fff;
        transition: 0.2s all;
        /* z-index: -1; */
    }
    .s-irregularColorMove:hover {
        color: #133;
    }
    .s-irregularColorMove:hover::before {
        left: 0;
        width: 100%;
    }
    /* 没有 after 会导致层级问题 */
    .s-irregularColorMove::after {
        content: "Hover Me";
        position: absolute;
        color: inherit;
        z-index: 1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>
