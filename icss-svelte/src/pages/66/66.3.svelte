<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        const style = document.createElement("style");
        document.head.appendChild(style);

        style.appendChild(
            document.createTextNode(`
        @keyframes move_66_3 {
            30% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(0, 0);
            }
        }
        `)
        );
        return () => {
            document.head.removeChild(style);
        };
    });
</script>

<page>
    <div />
    <div />
    <div />
</page>

<style>
    page {
        display: flex;
        flex-wrap: wrap;

        --colorA: #f7a37b;
        --colorB: #ffdea8;
        --colorC: #d0e4b0;
        --colorD: #7cc5d0;
        --colorE: #00a2e1;
        --colorF: #0085c8;
        --colorG: #c9d549;
    }

    div {
        position: relative;
        width: 240px;
        height: 240px;
        margin: auto;
        border: 2px solid #666;
        box-shadow: 1px 1px 4px 2px #222;
    }

    div:nth-child(1) {
        background: repeating-radial-gradient(
            circle,
            var(--colorA) 0,
            var(--colorA) 15%,
            var(--colorB) 15%,
            var(--colorB) 30%,
            var(--colorC) 30%,
            var(--colorC) 45%,
            var(--colorD) 45%,
            var(--colorD) 60%,
            var(--colorE) 60%,
            var(--colorE) 75%,
            var(--colorF) 75%,
            var(--colorF) 90%,
            transparent 90%,
            transparent 0
        );
    }

    div:nth-child(2) {
        background: repeating-radial-gradient(
            circle,
            var(--colorA) 0,
            var(--colorA) 15%,
            var(--colorB) 15%,
            var(--colorB) 30%,
            var(--colorC) 30%,
            var(--colorC) 45%,
            var(--colorD) 45%,
            var(--colorD) 60%,
            var(--colorE) 60%,
            var(--colorE) 75%,
            var(--colorF) 75%,
            var(--colorF) 90%,
            transparent 90%,
            transparent 0
        );
        background-size: 60px 60px;
    }

    div:nth-child(3) {
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transform: translate(-120%, 0);
            background: repeating-radial-gradient(
                circle,
                var(--colorA) 0,
                var(--colorA) 15%,
                var(--colorB) 15%,
                var(--colorB) 30%,
                var(--colorC) 30%,
                var(--colorC) 45%,
                var(--colorD) 45%,
                var(--colorD) 60%,
                var(--colorE) 60%,
                var(--colorE) 75%,
                var(--colorF) 75%,
                var(--colorF) 90%,
                transparent 90%,
                transparent 0
            );
            background-size: 60px 60px;
            animation: move_66_3 5s infinite linear;
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transform: translate(120%, 0);
            background: repeating-radial-gradient(
                circle,
                var(--colorA) 0,
                var(--colorA) 15%,
                var(--colorB) 15%,
                var(--colorB) 30%,
                var(--colorC) 30%,
                var(--colorC) 45%,
                var(--colorD) 45%,
                var(--colorD) 60%,
                var(--colorE) 60%,
                var(--colorE) 75%,
                var(--colorF) 75%,
                var(--colorF) 90%,
                transparent 90%,
                transparent 0
            );
            background-size: 80px 80px;
            animation: move_66_3 5s infinite linear;
            mix-blend-mode: darken;
        }
    }
</style>
