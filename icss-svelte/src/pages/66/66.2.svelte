<page>
    <div>mix-blend-mode: multiply</div>
    <div>mix-blend-mode: color-burn</div>
    <div>mix-blend-mode: difference</div>
    <div>mix-blend-mode: luminosity</div>
    <div>mix-blend-mode: exclusion</div>
    <div>mix-blend-mode: lighten</div>
</page>

<style>
    page {
        display: flex;
        flex-wrap: wrap;
    }
    div {
        position: relative;
        width: 240px;
        height: 240px;
        border: 2px solid #666;
        box-shadow: 1px 1px 4px 2px #aaa;
        margin: 25px auto;
        color: #333;
        text-align: center;
        font-size: 16px;
        line-height: 520px;
    }
    div::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        /*   transform: translate(110%, 0); */
        background: repeating-linear-gradient(
            50deg,
            #f7a37b,
            #f7a37b 1em,
            #ffdea8 1em,
            #ffdea8 2em,
            #d0e4b0 2em,
            #d0e4b0 3em,
            #7cc5d0 3em,
            #7cc5d0 4em,
            #00a2e1 4em,
            #00a2e1 5em,
            #0085c8 5em,
            #0085c8 6em
        );
        animation: move 5s infinite linear;
        mix-blend-mode: multiply;
    }

    div::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        /*   transform: translate(-110%, 0); */
        background: repeating-linear-gradient(
            -50deg,
            #f7a37b,
            #f7a37b 1em,
            #ffdea8 1em,
            #ffdea8 2em,
            #d0e4b0 2em,
            #d0e4b0 3em,
            #7cc5d0 3em,
            #7cc5d0 4em,
            #00a2e1 4em,
            #00a2e1 5em,
            #0085c8 5em,
            #0085c8 6em
        );
        animation: move 5s infinite linear;
    }

    @keyframes moves {
        60% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(0, 0);
        }
    }

    div:nth-child(2)::after {
        mix-blend-mode: color-burn;
    }

    div:nth-child(3)::after {
        mix-blend-mode: difference;
    }

    div:nth-child(4)::after {
        mix-blend-mode: luminosity;
    }

    div:nth-child(5)::after {
        mix-blend-mode: exclusion;
    }

    div:nth-child(6)::after {
        mix-blend-mode: lighten;
    }
</style>
