文字故障效果

<div class="page">
    <hgroup class="text-magic" data-word="MixBlendMode">
        MixBlendMode
        <div class="white" />
    </hgroup>
</div>

<style>
    .page {
        position: relative;
        width: 100%;
        height: 100px;
    }

    .text-magic {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) skewX(0deg);
        font-size: 64px;
        animation: skewX 5s ease-in infinite;
    }
    @keyframes skewX {
        78% {
            transform: translate(-50%, -50%) skewX(0);
        }
        79% {
            transform: translate(-50%, -50%) skewX(10deg);
        }
        80% {
            transform: translate(-50%, -50%) skewX(-10deg);
        }
        81% {
            transform: translate(-50%, -50%) skewX(0);
        }
    }

    .white {
        position: absolute;
        left: 0;
        top: 15px;
        width: 100%;
        height: 3px;
        background-color: white;
        z-index: 4;
        animation: whiteMove 3s ease-out infinite;
        mix-blend-mode: luminosity;
    }
    @keyframes whiteMove {
        8% {
            top: 38px;
        }
        10% {
            top: 8px;
        }
        12% {
            top: 42px;
        }
        99% {
            top: 36px;
        }
    }

    .text-magic::before {
        content: attr(data-word);
        position: absolute;
        top: 0;
        left: 1px;
        height: 0;
        color: rgba(255, 0, 0, 0.9);
        overflow: hidden;
        z-index: 2;
        filter: contrast(200%);
        text-shadow: 0.1px 0 0 red;
        mix-blend-mode: color-burn;
        animation: redShadow 1.5s ease-in infinite;
    }
    @keyframes redShadow {
        20% {
            left: -1px;
            height: 32px;
        }
        60% {
            left: 2px;
            height: 6px;
        }
        100% {
            left: -2px;
            height: 42px;
        }
    }

    .text-magic::after {
        content: attr(data-word);
        position: absolute;
        top: 0;
        left: -3px;
        height: 64px;
        color: rgba(0, 0, 0, 0.8);
        overflow: hidden;
        z-index: 3;
        background-color: rgba(255, 255, 255, 0.9);
        filter: contrast(200%);
        mix-blend-mode: hard-light;
        animation: redHeight 2s ease-out infinite;
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
