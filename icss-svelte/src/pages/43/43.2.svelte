多重阴影
<div class="page">
    <div class="shadow" />
    <div class="gradient" />
</div>

<style>
    .page {
        display: flex;
        flex-direction: row;
    }
    .shadow {
        position: relative;
        width: 250px;
        height: 250px;
        border: 1px solid #333;
        overflow: hidden;
    }
    .shadow::before {
        content: "";
        position: absolute;
        width: 50px;
        height: 50px;
        top: -50px;
        left: -50px;
        box-shadow: 50px 50px, 150px 50px, 250px 50px, 50px 100px, 150px 100px,
            250px 100px, 50px 150px, 150px 150px, 250px 150px, 50px 200px,
            150px 200px, 250px 200px, 50px 250px, 150px 250px, 250px 250px;
        animation: move 3s infinite linear;
    }

    @keyframes move {
        25% {
            transform: translate(50px);
            color: coral;
            box-shadow: 50px 50px, 150px 50px, 250px 50px, 50px 100px,
                150px 100px, 250px 100px, 50px 150px, 150px 150px, 250px 150px,
                50px 200px, 150px 200px, 250px 200px, 50px 250px, 150px 250px,
                250px 250px;
        }
        50% {
            transform: translate(0px);
            color: brown;
            border-radius: 0;
            box-shadow: 50px 50px, 150px 50px, 250px 50px, 100px 100px,
                200px 100px, 300px 100px, 50px 150px, 150px 150px, 250px 150px,
                100px 200px, 200px 200px, 300px 200px, 50px 250px, 150px 250px,
                250px 250px;
        }
        75% {
            transform: translate(0px);
            color: teal;
            border-radius: 50%;
            box-shadow: 50px 50px, 150px 50px, 250px 50px, 100px 100px,
                200px 100px, 300px 100px, 50px 150px, 150px 150px, 250px 150px,
                100px 200px, 200px 200px, 300px 200px, 50px 250px, 150px 250px,
                250px 250px;
        }
        100% {
            border-radius: 0%;
            box-shadow: 50px 50px, 150px 50px, 250px 50px, 50px 100px,
                150px 100px, 250px 100px, 50px 150px, 150px 150px, 250px 150px,
                50px 200px, 150px 200px, 250px 200px, 50px 250px, 150px 250px,
                250px 250px;
        }
    }

    .gradient {
        margin-left: 50px;
        width: 250px;
        height: 250px;
        border: 1px solid #333;
        background-image: linear-gradient(
            90deg,
            #000 0%,
            #000 50%,
            #fff 50%,
            #fff 100%
        );
        background-size: 100px 100px;
    }
</style>
