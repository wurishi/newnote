<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const src = getAssetsUrl("galaxy.jpg");

    const list = [
        "grayscale",
        "invert",
        "brightness",
        "saturation",
        "sepia",
        "blur",
        "contrast",
        "hue-rotate",
        "drop-shadow",
        "opacity",
    ];
</script>
基本用法
<div class="page">
    <div>
        <img {src} />
        <div>normal</div>
    </div>
    {#each list as item}
        <div>
            <img {src} class={item} />
            <div>{item}</div>
        </div>
    {/each}
</div>

<style>
    .page {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }
    img {
        width: 200px;
        height: 150px;
    }

    .grayscale {
        filter: grayscale(1);
    }

    .invert {
        filter: invert(0.9);
    }

    .brightness {
        filter: brightness(0.5);
    }

    .saturation {
        filter: saturate(6);
    }

    .sepia {
        filter: sepia(1);
    }

    .blur {
        filter: blur(5px);
    }

    .contrast {
        filter: contrast(200%);
    }

    .hue-rotate {
        filter: hue-rotate(45deg);
    }

    .drop-shadow {
        filter: drop-shadow(16px 16px 20px blue);
    }

    .opacity {
        filter: opacity(0.5);
    }

    img:hover {
        cursor: pointer;
        transition: filter 0.5s;
        filter: none !important;
    }
</style>
