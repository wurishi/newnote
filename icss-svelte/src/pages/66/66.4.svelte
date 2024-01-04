<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        const style = document.createElement("style");
        document.head.appendChild(style);
        style.appendChild(document.createTextNode(`
        @keyframes move_66_4 {
            0% {
                filter: unset;
            }

            100% {
                filter: hue-rotate(360deg);
            }
        }
        `))
        return () => {
            document.head.removeChild(style);
        };
    });
</script>

<page>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
</page>

<style>
    page {
        position: relative;
        display: flex;
        width: 100vw;
        height: 300px;
    }
    div {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    div:nth-child(1) {
        background: linear-gradient(
            238deg,
            rgb(130, 255, 0) 0%,
            rgb(0, 84, 166) 100%
        );
        animation: move_66_4_66_4 20s infinite linear;
    }

    div:nth-child(2) {
        background: linear-gradient(
            238deg,
            rgb(33, 200, 69) 0%,
            rgb(0, 0, 100) 100%
        );
        mix-blend-mode: overlay;
        animation: move_66_4 30s infinite linear;
    }

    div:nth-child(3) {
        background: linear-gradient(
            238deg,
            rgb(200, 255, 255) 48%,
            rgb(3, 0, 151) 100%
        );
        mix-blend-mode: multiply;
        animation: move_66_4 40s infinite linear;
    }

    div:nth-child(4) {
        background: radial-gradient(
            100% 85% at 0% 100%,
            rgb(0, 0, 0) 0%,
            rgb(0, 131, 255) 50%,
            rgb(255, 0, 0) 100%
        );
        mix-blend-mode: difference;
        animation: move_66_4 50s infinite linear;
    }

    div:nth-child(5) {
        background: radial-gradient(
            100% 225% at 0% 100%,
            rgb(255, 0, 0) 0%,
            rgb(66, 255, 0) 100%
        );
        mix-blend-mode: difference;
        animation: move_66_4 60s infinite linear;
    }

    div:nth-child(6) {
        background: radial-gradient(
            100% 140% at 100% 0%,
            rgb(0, 134, 62) 0%,
            rgb(0, 239, 255) 50%,
            rgb(0, 113, 186) 100%
        );
        mix-blend-mode: overlay;
        animation: move_66_4 70s infinite linear;
    }
</style>
