<script lang="ts">
    import { getAssetsUrl } from "../../proxy";
    import { onMount } from "svelte";

    const image = getAssetsUrl("w.webp");

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_61_2";
        document.head.appendChild(style);

        style.appendChild(
            document.createTextNode(`
            .mix {
                background: url("${image}"), cyan;
            }
            .mix::after {
                background: url("${image}"), red;
            }
        `)
        );

        return () => {
            document.head.removeChild(style);
        };
    });
</script>

图片 Glitch Art 风

<div class="mix" />

<style>
    .mix {
        margin: 30px auto 0;
        width: 400px;
        height: 400px;
        z-index: 2;
        background-blend-mode: lighten;
        background-size: center;
    }

    .mix::after {
        content: "";
        position: absolute;
        width: 400px;
        height: 400px;
        z-index: 3;
        background-blend-mode: lighten;
        margin-left: 10px;
        background-size: center;
        mix-blend-mode: darken;
        transform: translate(-450px, 0);
        animation: move 10s linear infinite;
    }

    @keyframes move {
        0% {
            transform: translate(-350px, 0);
        }
        50%,
        100% {
            transform: translate(0, 0);
        }
    }
</style>
