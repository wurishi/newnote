<script lang="ts">
    import { onMount } from "svelte";
    import { getAssetsUrl } from "../../proxy";

    const img1 = getAssetsUrl("img.jpg");
    const img2 = getAssetsUrl("galaxy.jpg");

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_63_3";
        document.head.appendChild(style);

        style.appendChild(
            document.createTextNode(`
        .div_63_3::before {
            background: url(${img2});
        }
        `)
        );

        return () => {
            document.head.removeChild(style);
        };
    });
</script>

多张图片下使用 mask

<div class="div_63_3" style={`background: url(${img1})`} />

<style>
    div {
        width: 200px;
        height: 150px;
        position: relative;
        background-size: cover;
    }

    div::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-size: cover;
        z-index: 1;
        -webkit-mask: linear-gradient(45deg, #000 40%, transparent 60%);
    }
</style>
