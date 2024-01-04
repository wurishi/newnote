霓虹氖灯

<div class="page">
    <div>
        <p class="pink">PINK</p>
    </div>
    <div>
        <p class="orange">Box-Shadow</p>
    </div>
    <div>
        <p class="yellow">YELLOW</p>
    </div>
    <div class="shadow">
        <span>BOX-SHADOW</span><br />
        <span>LIGHTS</span>
    </div>
</div>

<style>
    .page {
        background: #111;
        text-align: center;
        padding-bottom: 100px;
        position: relative;
    }

    p {
        display: inline;
        font-family: "Lobster";
        text-align: center;
        font-size: 40px;
        line-height: 60px;
        color: #fff;
    }

    p:hover {
        color: #fff;
    }

    .pink {
        filter: brightness(110%);
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff,
            0 0 20px #e91e63, 0 0 35px #e91e63, 0 0 40px #e91e63,
            0 0 50px #e91e63, 0 0 75px #e91e63;
        animation: pink 1.5s ease-in-out infinite alternate;
    }
    @keyframes pink {
        to {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
                0 0 40px #e91e63, 0 0 70px #e91e63, 0 0 80px #e91e63,
                0 0 100px #e91e63, 0 0 150px #e91e63;
        }
    }

    .orange {
        color: #ff5722;
    }
    .orange:hover {
        animation: orange 1.5s ease-in-out infinite alternate;
    }
    @keyframes orange {
        to {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
                0 0 40px #ff5722, 0 0 70px #ff5722, 0 0 80px #ff5722,
                0 0 100px #ff5722, 0 0 150px #ff5722;
        }
        from {
            filter: brightness(110%);
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff,
                0 0 20px #ff5722, 0 0 35px #ff5722, 0 0 40px #ff5722,
                0 0 50px #ff5722, 0 0 75px #ff5722;
        }
    }

    .yellow {
        color: #ffeb3b;
    }
    .yellow:hover {
        animation: yellow 1.5s ease-in-out infinite alternate;
    }
    @keyframes yellow {
        to {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
                0 0 40px #ffeb3b, 0 0 70px #ffeb3b, 0 0 80px #ffeb3b,
                0 0 100px #ffeb3b, 0 0 150px #ffeb3b;
        }
        from {
            filter: brightness(110%);
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff,
                0 0 20px #ffeb3b, 0 0 35px #ffeb3b, 0 0 40px #ffeb3b,
                0 0 50px #ffeb3b, 0 0 75px #ffeb3b;
        }
    }

    .shadow {
        position: absolute;
        left: 50%;
        top: 180px;
        color: #fff;
        font-size: 30px;
        transform: translate(-50vmin) rotateX(25deg) rotateY(20deg)
            rotateZ(-3deg);
        animation: changeColor 3s linear infinite alternate;
    }
    @keyframes changeColor {
        0% {
            text-shadow: -6px 4px 0px #e91e63;
        }
        10% {
            text-shadow: 4px -6px 0px #00ff0a;
        }
        20% {
            text-shadow: -9px 4px 0px #0b3cff;
        }
        30% {
            text-shadow: 4px -6px 0px #ffe926;
        }
        40% {
            text-shadow: -8px 4px 0px #f19000;
        }
        50% {
            text-shadow: 4px 5px 0px #e9a48b;
        }
        60% {
            text-shadow: -6px 4px 0px #e9eced;
        }
        70% {
            text-shadow: 4px 7px 0px #e028ff;
        }
        80% {
            text-shadow: -9px -4px 0px #5af4e5;
        }
        90% {
            text-shadow: 4px -6px 0px #3c59f8;
        }
        100% {
            color: #000;
            transform: translate(-50vmin) rotateX(15deg) rotateY(10deg)
                rotateZ(-5deg);
            text-shadow: -9px 4px 0px #d7d7d7;
        }
    }
</style>
