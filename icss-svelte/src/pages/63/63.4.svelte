<script lang="ts">
    import { onMount } from "svelte";
    import { getAssetsUrl } from "../../proxy";

    const img1 = getAssetsUrl("img.jpg");
    const img2 = getAssetsUrl("galaxy.jpg");

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_63_4";
        document.head.appendChild(style);

        const maskRotate = [];
        const maskRotate2 = [];
        for (let i = 0; i <= 100; i++) {
            maskRotate.push(`
            ${i}% {
                -webkit-mask: linear-gradient(45deg, #000 ${i}%, transparent ${
                i + 5
            }%, transparent 1%);
            }
            `);
            maskRotate2.push(`
            ${i}% {
                -webkit-mask: conic-gradient(#000 ${
                    i - 8
                }%, transparent ${i}%, transparent);
            }
            `);
        }
        style.appendChild(
            document.createTextNode(`
            .div_63_4_1::before {
                animation: maskMove1 4s ease-in-out infinite;
                background: url(${img2});
            }
            @keyframes maskMove1 {
                ${maskRotate.join("\n")}
            }
            .div_63_4_2::before {
                animation: maskMove2 4s ease-in-out infinite;
                background: url(${img2});
            }
            @keyframes maskMove2 {
                ${maskRotate2.join("\n")}
            }
        `)
        );

        return () => {
            document.head.removeChild(style);
        };
    });
</script>

使用 MASK 进行转场动画

<div class="div_63_4_1" style={`background: url(${img1})`} />

<div class="div_63_4_2" style={`background: url(${img1})`} />

<style>
    .div_63_4_1 {
        width: 200px;
        height: 150px;
        position: relative;
        background-size: cover;
    }
    .div_63_4_1::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
    }

    .div_63_4_2 {
        margin-top: 30px;
        width: 200px;
        height: 150px;
        position: relative;
        background-size: cover;
    }
    .div_63_4_2::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
    }
</style>
