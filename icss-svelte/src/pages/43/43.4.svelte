<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_43_4";
        document.head.appendChild(style);
        const textShadow = [];
        const left = [];
        for (let i = 0; i < 50; i++) {
            textShadow.push(
                `${i}px ${i}px rgba(${153 - i}, ${36 + i}, ${i}, ${
                    1 - i * 0.02
                })`
            );
            left.push(
                `${i}px ${i}px rgba(${38 + i}, ${50 + i}, ${114 - i}, ${
                    1 - i * 0.02
                })`
            );
        }
        style.appendChild(
            document.createTextNode(`
            .text-shadow {
                text-shadow: ${textShadow.join(",")};
            }

            .text-shadow.left {
                text-shadow: ${left.join(",")};
            }
        `)
        );
        return () => {
            document.head.removeChild(style);
        };
    });
</script>

文字长阴影
<div class="text-shadow">Long Shadow</div>
<div class="text-shadow left">TxT Long Shadow</div>
<div class="solid" data-name="Solid Shadow Word">Solid Shadow Word</div>

<style>
    .text-shadow {
        text-align: center;
        font-size: 50px;
        color: hsl(14, 100%, 60%);
    }

    .left {
        margin: 50px 0;
        color: hsl(231, 50%, 60%);
    }

    .solid {
        font-family: "Times New Roman", Times, serif;
        position: relative;
        font-size: 80px;
        margin: 50px 0;
        text-align: center;
        text-shadow: 4px 4px 1px #333;
    }
    .solid::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(
            -45deg,
            #fff 0%,
            #fff 25%,
            transparent 25%,
            transparent 50%,
            #fff 50%,
            #fff 75%,
            transparent 75%,
            transparent 100%
        );
        background-size: 6px 6px;
        z-index: 1;
    }
    .solid::after {
        position: absolute;
        content: attr(data-name);
        top: -4px;
        left: -2px;
        right: 6px;
        bottom: 6px;
        color: #333;
        z-index: 2;
        text-shadow: 3px 3px #fff;
    }
</style>
