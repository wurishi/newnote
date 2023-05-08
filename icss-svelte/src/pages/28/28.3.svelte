mix-blend-mode: screen

<div class="page">
    <div class="container">
        <div class="box box1" />
        <div class="box box2" />
        <div class="box box3" />
    </div>
</div>

<style>
    .page {
        background-color: #291f34;
        overflow: hidden;
        height: 200px;
    }

    .container {
        position: relative;
        width: 150px;
        height: 150px;
        transform: translate(50%, calc((200px - 150px) * .5));
    }

    .box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transform-origin: 47% 47%;
        mix-blend-mode: screen;
    }

    .box1 {
        background-color: #0801fb;
        animation: turn .6s linear .6s infinite;
    }
    .box2 {
        background-color: #1ffe27;
        animation: turn .6s linear .8s infinite;
    }
    .box3 {
        background-color: #fd1a20;
        animation: turn .6s linear 1s infinite;
    }

    @keyframes turn {
        to {
            transform: rotate(360deg);
        }
    }
</style>
