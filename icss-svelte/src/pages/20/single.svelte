单色背景：
<div />

<style>
    div {
        width: 100%;
        height: 100px;
        background: var(--color1);
        animation: gradientChange 3s infinite alternate;
    }

    @keyframes gradientChange {
        100% {
            background: var(--color2);
        }
    }
</style>
