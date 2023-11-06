<div class="page">
    <div class="box" />
    <div class="box bg">示意图</div>
    <div class="lg">linear-gradient 两端为三角形</div>
    <div class="btn">Hello</div>
</div>

<style>
    .page {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .box {
        position: relative;
        margin: auto;
        width: 160px;
        height: 160px;
        line-height: 160px;
        text-align: center;
        font-size: 24px;
    }

    .box::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid gold;
        transition: all 0.5s;
        animation: clippath 3s infinite linear;
    }

    @keyframes clippath {
        0%,
        100% {
            clip-path: inset(0 0 95% 0);
        }

        25% {
            clip-path: inset(0 95% 0 0);
        }
        50% {
            clip-path: inset(95% 0 0 0);
        }
        75% {
            clip-path: inset(0 0 0 95%);
        }
    }

    .bg::before {
        background: rgba(255, 215, 0, 0.5);
    }

    .lg {
        position: relative;
        z-index: 0;
        width: 400px;
        height: 300px;
        border-radius: 10px;
        overflow: hidden;
        padding: 2rem;
    }

    .lg::before {
        content: "";
        position: absolute;
        z-index: -2;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: 50% 50%;
        background-position: 0 0;
        background-image: conic-gradient(#399953, #399953);
        animation: rotate 4s linear infinite;
    }

    .lg::after {
        content: "";
        position: absolute;
        z-index: -1;
        left: 6px;
        top: 6px;
        width: calc(100% - 12px);
        height: calc(100% - 12px);
        background: white;
        border-radius: 5px;
        animation: opacityChange 3s infinite alternate;
    }

    @keyframes rotate {
        100% {
            transform: rotate(1turn);
        }
    }

    @keyframes opacityChange {
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.5;
        }
    }

    .btn {
        position: relative;
        margin: auto;
        width: 120px;
        line-height: 64px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        border: 2px solid gold;
        border-radius: 10px;
        background: gold;
        transition: all 0.3s;
        cursor: pointer;
    }
    .btn:hover {
        filter: contrast(1.1);
    }
    .btn:active {
        filter: contrast(0.9);
    }
    .btn::after,
    .btn::before {
        content: "";
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 2px solid gold;
        transition: all 0.5s;
        animation: clippath 3s infinite linear;
        border-radius: 10px;
    }
    .btn::after {
        animation: clippath 3s infinite -1.5s linear;
    }
</style>
