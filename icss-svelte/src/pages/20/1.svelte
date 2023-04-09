background-position
<div />

<style>
    div {
        width: 100%;
        height: 100px;
        background: linear-gradient(
            90deg,
            var(--color1) 0%,
            var(--color2) 50%,
            var(--color3) 100%
        );
        background-size: 200% 100%;
        background-position: 0 0;
        animation: bgposition 2s infinite alternate;
    }

    @keyframes bgposition {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }
</style>
