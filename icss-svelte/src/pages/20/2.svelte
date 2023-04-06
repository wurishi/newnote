background-size
<div />

<style>
    div {
        width: 100%;
        height: 100px;
        background: linear-gradient(90deg, var(--color1) 0%, var(--color2) 33%, var(--color3) 66%, #00ff88 100%);
        background-position: 100% 0;
        animation: bgSize 5s infinite ease-in-out alternate;
    }

    @keyframes bgSize {
        0% {
            background-size: 300% 100%;
        }
        100% {
            background-size: 100% 100%;
        }
    }
</style>