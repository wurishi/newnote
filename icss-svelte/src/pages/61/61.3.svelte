动态 Glitch 效果

<div class="page">
    <div class="text-magic" data-word="CSSTextGlitch">
        <div class="white" />
    </div>
</div>

<div class="page page1">
    <div class="text-magic" data-word="CSSTextGlitch">
        <div class="white" />
    </div>
</div>

<style>
    .page {
        position: relative;
        width: 100vw;
        height: 150px;
        background-color: black;
    }

    .text-magic {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        font-size: 36px;
        color: transparent;
    }

    .white {
        position: absolute;
        left: -10px;
        width: 100%;
        height: 1px;
        background-color: #000;
        z-index: 4;
        animation: whiteMove 10s ease-out infinite;
    }

    .text-magic::before {
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
        animation: move 0.95s infinite;
    }

    .text-magic::after {
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
        animation: move 1.1s infinite 0.2s;
    }

    @keyframes whiteMove {
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

    @keyframes move {
        10% {
            top: -0.4px;
            left: -1.1px;
        }
        20% {
            top: 0.4px;
            left: -0.2px;
        }
        30% {
            left: 0.5px;
        }
        40% {
            top: -0.3px;
            left: -0.7px;
        }
        50% {
            left: 0.2px;
        }
        60% {
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

    .page1 .white {
        height: 3px;
        z-index: 4;
        animation: whiteMove 3s ease-out infinite;
    }

    .page1 .text-magic::before {
        left: 0.5px;
        height: 0;
        color: rgba(255, 255, 255, 0.9);
        animation: redShadow 1s ease-in infinite;
    }

    .page1 .text-magic::after {
        left: -3px;
        color: rgba(255, 255, 255, 0.8);
        background: rgba(0, 0, 0, 0.9);
        mix-blend-mode: darken;
        animation: redHeight 1.5s ease-out infinite;
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
</style>
