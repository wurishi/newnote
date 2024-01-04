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

    /* irregularLineMove start */
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
    /* irregularLineMove end */

    /* irregularDoubleLineMove start */
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
    /* irregularDoubleLineMove end */

    /* irregularDoubleLineMoveTwo start */
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
    /* irregularDoubleLineMoveTwo end */

    /* irregularColorMove start */
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
    /* irregularColorMove end */

    /* irregularShadowMove start */
    .s-irregularShadowMove {
        color: #fff;
        border: 1px solid white;
        overflow: hidden;
    }
    .s-irregularShadowMove:hover {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.2);
    }
    .s-irregularShadowMove::before {
        content: "";
        position: absolute;
        height: 200px;
        width: 20px;
        background-color: rgba(255, 255, 255, 0.8);
        transform: translate(-50%, -30%) rotate(45deg);
        transition: 0.5s all cubic-bezier(0.2, 1, 0.25, 1);
        left: -35%;
    }
    .s-irregularShadowMove:hover::before {
        left: 135%;
    }
    /* irregularShadowMove end */

    /* irregularShadowScale start */
    .s-irregularShadowScale {
        color: #fff;
        border: 1px solid #fff;
    }
    .s-irregularShadowScale:hover {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.2);
    }
    .s-irregularShadowScale::after {
        content: "";
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        transition: 0.5s outline-color, 0.5s outline, 0.5s transform;
        transition-timing-function: cubic-bezier(0.2, 0.8, 0.25, 0.8);
        transform: scale3d(1.1, 1.3, 0);
        outline: 0 solid;
        outline-color: rgba(255, 255, 255, 0.05);
        outline-offset: -10px;
    }
    .s-irregularShadowScale:hover::after {
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        transform: scale(1);
        outline: 1px solid;
        outline-color: rgba(255, 255, 255, 0.6);
        outline-offset: 10px;
        transition: 0.5s outline-offset cubic-bezier(0.2, 0.8, 0.25, 0.8),
            0.5s outline-color cubic-bezier(0.2, 0.8, 0.25, 0.8),
            0.5s outline cubic-bezier(0.2, 0.8, 0.25, 0.8);
    }
    /* irregularShadowScale end */

    /* dash start */
    .s-dash {
        color: #fff;
        outline: 1px solid #fff;
        outline-offset: -1px;
        transform: outline 0.5s;
    }
    .s-dash:hover {
        box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.2);
        outline: none;
        background: linear-gradient(90deg, white 50%, transparent 0) repeat-x,
            linear-gradient(90deg, white 50%, transparent 0) repeat-x,
            linear-gradient(0deg, white 50%, transparent 0) repeat-y,
            linear-gradient(0deg, white 50%, transparent 0) repeat-y;
        background-size: 8px 1px, 8px 1px, 1px 8px, 1px 8px;
        background-position: 0 0, 0 100%, 0 0, 100% 0;
        animation: linearGradientMove 0.5s infinite linear;
    }
    @keyframes linearGradientMove {
        100% {
            background-position: 12.5% 0, -12.5% 100%, 0 -12.5%, 100% 12.5%;
        }
    }
    /* dash end */

    /* pesoduSlice start */
    .s-pesoduSlice {
        animation: all 0.5s;
        color: #fff;
        filter: contrast(10);
        border: 1px solid #fff;
        overflow: hidden;
    }
    .s-pesoduSlice::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(
            19deg,
            #fff 50%,
            transparent 50%,
            transparent 100%
        );
        transform-origin: 100% 100%;
        transition: transform 0.5s cubic-bezier(0.86, 0.34, 0.87, 0.49);
        mix-blend-mode: difference;
        transform: translate(-100%, 0) scale3d(2, 2, 1);
    }
    .s-pesoduSlice:hover::before {
        transform: translate(100%, 0) scale3d(2, 2, 1);
    }
    /* pesoduSlice end */

    /* mixblur start */
    .s-mixblur {
        transition: all 0.2s;
        color: #fff;
        border: 1px solid #fff;
        filter: contrast(10);
    }
    .s-mixblur::before {
        content: attr(data-content);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 0.5s;
        z-index: -1;
        color: red;
        border: 1px solid rgba(255, 255, 255, 0.8);
    }
    .s-mixblur::after {
        content: attr(data-content);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 0.2s;
        z-index: -2;
        color: blue;
        border: 1px solid rgba(255, 255, 255, 0.8);
    }
    .s-mixblur:hover::after {
        transform: translate(-5px, 0);
        filter: contrast(16) blur(10px);
    }
    .s-mixblur:hover::before {
        transform: translate(5px, 0);
        filter: contrast(16) blur(10px);
    }
    /* mixblur end */

    /* svgline start */
    .s-svgline .shape {
        fill: transparent;
        stroke-width: 4px;
        stroke: #fff;
        stroke-dasharray: 140 488;
        stroke-dashoffset: 365;
        transition: all 0.5s;
    }
    .s-svgline .g-text {
        position: absolute;
        line-height: 64px;
        width: 180px;
        top: 0;
        left: 0;
        transition: all 0.5s;
    }
    .s-svgline:hover .g-text {
        color: #333;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    .s-svgline:hover .shape {
        stroke: #333;
        stroke-dasharray: 488;
        stroke-dashoffset: 0;
        stroke-width: 2px;
    }
    /* svgline end */

    /* svgMutiLine start */
    .s-svgMutiLine .shape {
        fill: transparent;
        stroke-width: 4px;
        stroke: #fff;
        stroke-dasharray: 140 400;
        stroke-dashoffset: -265;
        transition: all 1s;
    }
    .s-svgMutiLine .g-text {
        position: absolute;
        line-height: 64px;
        width: 180px;
        top: 0;
        left: 0;
        transition: all 0.5s;
    }
    .s-svgMutiLine:hover .g-text {
        color: #333;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    .s-svgMutiLine:hover .shape {
        stroke: #333;
        stroke-dasharray: 50 0;
        stroke-dashoffset: 0;
        stroke-width: 2px;
    }
    /* svgMutiLine end */
</style>
