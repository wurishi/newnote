mix-blend-mode: difference

<div class="page">
    <div class="container">
        <div class="box box1"></div>
        <div class="box box2"></div>
        <div class="box box3"></div>
        <div class="box box4"></div>
        <div class="box box5"></div>
        <div class="box box6"></div>
    </div>
</div>

<style>
    .page {
        width: 100%;
        height: 400px;
        position: relative;
        background-color: black;
        overflow: hidden;
    }
    .container {
        position: absolute;
        width: 200px;
        height: 200px;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }
    .box {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #fff;
        background: rgb(0, 0, 0);
        box-shadow: inset 0 25px 0 25px white;
        mix-blend-mode: difference;
    }

    .box1 {
        transform: rotate(60deg) translate(0, 50%);
        animation: move1 10s linear infinite alternate;
    }
    @keyframes move1 {
        to {
            transform: rotate(calc(1080deg + 60deg)) translate(100px);
        }
    }

    .box2 {
        transform: rotate(120deg) translate(0, 50%);
        animation: move2 10s linear infinite alternate;
    }
    @keyframes move2 {
        to {
            transform: rotate(calc(1080deg + 120deg)) translate(100px);
        }
    }

    .box3 {
        transform: rotate(180deg) translate(0, 50%);
        animation: move3 10s linear infinite alternate;
    }
    @keyframes move3 {
        to {
            transform: rotate(calc(1080deg + 180deg)) translate(100px);
        }
    }

    .box4 {
        transform: rotate(240deg) translate(0, 50%);
        animation: move4 10s linear infinite alternate;
    }
    @keyframes move4 {
        to {
            transform: rotate(calc(1080deg + 240deg)) translate(100px);
        }
    }

    .box5 {
        transform: rotate(300deg) translate(0, 50%);
        animation: move5 10s linear infinite alternate;
    }
    @keyframes move5 {
        to {
            transform: rotate(calc(1080deg + 300deg)) translate(100px);
        }
    }

    .box6 {
        transform: rotate(360deg) translate(0, 50%);
        animation: move6 10s linear infinite alternate;
    }
    @keyframes move6 {
        to {
            transform: rotate(calc(1080deg + 360deg)) translate(100px);
        }
    }
</style>