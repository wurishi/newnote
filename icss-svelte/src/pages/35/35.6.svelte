文字融合动画

<div class="container">
    <h1>Blur word Animation.</h1>
</div>

<style>
    * {
        box-sizing: border-box;
    }

    .container {
        position: relative;
        height: 300px;
        width: 100%;
        filter: contrast(20);
        background-color: black;
        overflow: hidden;
    }

    h1 {
        font-family: Righteous;
        color: white;
        font-size: 4rem;
        text-transform: uppercase;
        line-height: 1;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        letter-spacing: -2.2rem;
        animation: letterspacing 5s ease-in-out infinite alternate;
    }

    @keyframes letterspacing {
        0% {
            letter-spacing: -2.2rem;
            filter: blur(.3rem);
        }

        50% {
            filter: blur(.5rem);
        }

        100% {
            letter-spacing: .5rem;
            filter: blur(0rem);
        }
    }
</style>