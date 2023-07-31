Glitch Art 风格的 404 效果

<div class="page">
    <div class="text-magic" data-word="404">
        404
        <div class="white" />
    </div>
</div>

<div class="page page1">
    <div class="text-magic" data-word="404">
        404
        <div class="white" />
    </div>
</div>

<style>
    .page {
        position: relative;
        width: 100vw;
        height: 150px;
        background: #000;
    }

    .text-magic {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(2.4);
        width: 300px;
        font-size: 36px;
        font-family: Raleway, Verdana, Arial;
        color: #fff;
    }
    .white {
        position: absolute;
        left: -10px;
        width: 100%;
        height: 3px;
        background: #000;
        z-index: 4;
        animation: whiteMove 3s ease-out infinite;
    }

    .text-magic::before {
        content: attr(data-word);
        position: absolute;
        top: 0;
        left: 0.5px;
        height: 0px;
        color: rgba(255, 255, 255, 0.9);
        overflow: hidden;
        z-index: 2;
        animation: redShadow 1s ease-in infinite;
        filter: contrast(200%);
        text-shadow: 1px 0 0 red;
    }

    .text-magic::after {
        content: attr(data-word);
        position: absolute;
        top: 0;
        left: -3px;
        height: 36px;
        color: rgba(255, 255, 255, 0.8);
        overflow: hidden;
        z-index: 3;
        background: rgba(0, 0, 0, 0.9);
        animation: redHeight 1.5s ease-out infinite;
        filter: contrast(200%);
        text-shadow: -1px 0 0 cyan;
        mix-blend-mode: darken;
    }

    @keyframes redShadow {
        20% {
            height: 32px;
        }
        60% {
            height: 6px;
        }
        100% {
            height: 42px;
        }
    }

    @keyframes redHeight {
        20% {
            height: 42px;
        }
        35% {
            height: 12px;
        }
        50% {
            height: 40px;
        }
        60% {
            height: 20px;
        }
        70% {
            height: 34px;
        }
        80% {
            height: 22px;
        }
        100% {
            height: 0px;
        }
    }

    @keyframes whiteMove {
        8% {
            top: 38px;
        }
        14% {
            top: 8px;
        }
        20% {
            top: 42px;
        }
        32% {
            top: 2px;
        }
        99% {
            top: 30px;
        }
    }

    .page1 .text-magic {
        position: absolute;
        top: 40%;
        left: 65%;
        transform: translate(-50%, -50%) scale(2.5);
        width: 300px;
        font-size: 36px;
        font-family: Raleway, Verdana, Arial;
        color: transparent;
    }
    .page1 .white {
        position: absolute;
        left: -10px;
        width: 100%;
        height: 1px;
        background: #000;
        z-index: 4;
        animation: whiteMove1 10s ease-out infinite;
    }

    .page1 .text-magic::before {
        content: attr(data-word);
        position: absolute;
        top: 0;
        left: 0;
        height: 36px;
        color: red;
        overflow: hidden;
        z-index: 2;
        filter: contrast(200%);
        text-shadow: 1px 0 0 red;
        animation: move1 0.95s infinite;
    }

    .page1 .text-magic::after {
        content: attr(data-word);
        position: absolute;
        top: 0;
        left: -1px;
        height: 36px;
        color: rgba(255, 255, 255, 0.8);
        overflow: hidden;
        z-index: 3;
        color: cyan;
        filter: contrast(200%);
        text-shadow: -1px 0 0 cyan;
        mix-blend-mode: lighten;
        animation: move1 1.1s infinite -0.5s;
    }

    @keyframes whiteMove1 {
        9% {
            top: 38px;
        }
        14% {
            top: 8px;
        }
        18% {
            top: 42px;
        }
        22% {
            top: 1px;
        }
        32% {
            top: 32px;
        }
        34% {
            top: 12px;
        }
        40% {
            top: 26px;
        }
        43% {
            top: 7px;
        }
        99% {
            top: 30px;
        }
    }

    @keyframes move1 {
        10% {
            top: -0.4px;
            left: -1.1px;
        }
        20% {
            filter: hue-rotate(-90deg);
            top: 0.4px;
            left: -0.2px;
        }
        30% {
            filter: hue-rotate(0);
            left: 0.5px;
        }
        40% {
            top: -0.3px;
            left: -0.7px;
        }
        50% {
            filter: blur(1px);
            left: 0.2px;
        }
        60% {
            filter: blur(0);
            top: 1.8px;
            left: -1.2px;
        }
        70% {
            top: -1px;
            left: 0.1px;
        }
        80% {
            top: -0.4px;
            left: -0.9px;
        }
        90% {
            left: 1.2px;
        }
        100% {
            left: -1.2px;
        }
    }
</style>
