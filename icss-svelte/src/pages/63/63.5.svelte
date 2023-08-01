<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_63_5";
        document.head.appendChild(style);
        const arr = [];
        for (let i = 0; i <= 100; i++) {
            arr.push(`
            ${i}% {
                -webkit-mask: repeating-radial-gradient(circle at 35% 65%, #000, rgba(0, 0, 0, .6), #000 ${
                    i / 3 + 10
                }%);
                filter: hue-rotate(${i * 3.6}deg);
            }
            `);
        }
        style.appendChild(
            document.createTextNode(`
        @keyframes maskMove_63_5 {
            ${arr.join("\n")}
        }
        `)
        );
        return () => {
            document.head.removeChild(style);
        };
    });
</script>

mask 与滤镜和混合模式

<div class="container">
    <div class="div_63_5" />
</div>
<div class="c2">
    <div class="wrap">
        <div class="inner" />
    </div>
</div>

<style>
    .container {
        width: 100vw;
        height: 300px;
        filter: contrast(5);
    }

    .div_63_5 {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
    }

    .div_63_5::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(#0044aa, transparent);
        background-size: 20px 20px;
        mask: repeating-radial-gradient(
            circle at 35% 65%,
            red,
            rgba(255, 0, 0, 0.5),
            #000 25%
        );
        animation: maskMove_63_5 20s infinite ease-in-out alternate;
    }

    .c2 {
        width: 100vw;
        height: 300px;
        margin-top: 20px;
    }

    .wrap {
        position: relative;
        height: 100%;
        background: linear-gradient(
            45deg,
            #f44336,
            #ff9800,
            #ffeb3b,
            #8bc34a,
            #00bcd4,
            #673ab7
        );
    }
    .inner {
        height: 100%;
        background-color: #000;
        filter: contrast(500%);
        mix-blend-mode: multiply;
    }
    .inner::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(#fff, transparent);
        background-size: 12px 12px;
        -webkit-mask: linear-gradient(#000, rgba(0, 0, 0, 0.5));
    }
</style>
