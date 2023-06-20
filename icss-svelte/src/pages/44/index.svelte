<script lang="ts">
    import { onMount } from "svelte";
    const count = 100;

    onMount(() => {
        const style = document.createElement("style");
        style.id = "style_44";
        document.head.appendChild(style);

        const random = () => Math.floor(Math.random() * 255);
        const randomColor = () => `rgb(${random()}, ${random()}, ${random()})`;

        for (let i = 0; i < count; i++) {
            const x = Math.random() * 360 + "deg";
            const y = Math.random() * 360 + "deg";
            const r = 100;
            const radius = r + "px";

            style.appendChild(
                document.createTextNode(`
            .point${i} {
                transform: rotateY(${y}) rotateX(${x}) translateZ(${radius});
                background: ${randomColor()} !important;
                filter: blur(0px);
                animation: expand${i} 10s linear infinite,
                    sparkle 0.25s linear infinite;
                animation-delay: ${i * 2}ms;
            }
            @keyframes expand${i} {
                0% { 
                    transform: rotateY(${y}) rotateX(${x}) translateZ(${radius});
                    filter: blur(0px);
                    width: 20px;
                    height: 20px;
                }
                20%, 40% { 
                    transform: rotateY(${y}) rotateX(${x}) translateZ(${
                    r * (i / 10)
                }px);
                    filter: blur(10px);
                    width: 20px;
                    height: 20px;
                }
                40%, 60% {
                    transform: rotateY(${y}) rotateX(${x}) translateZ(${
                    r * 4
                }px);
                    filter: blur(0px);
                    width: 40px;
                    height: 40px;
                }
                65%, 80% {
                    transform: rotateY(${y}) rotateX(${x}) translateZ(${
                    r * (i / 10)
                }px);
                    filter: blur(10px);
                    width: 20px;
                    height: 20px;
                }
                85%, 100% {
                    transform: rotateY(${y}) rotateX(${x}) translateZ(${radius});
                    filter: blur(0px);
                    width: 20px;
                    height: 20px;
                }
            }
            @keyframes sparkle {
                50% {
                    background: lemonchiffon !important;
                }
            }
            `)
            );
        }

        return () => {
            document.head.removeChild(style);
        };
    });

    const list = new Array<number>(count).fill(0);

    let mix = false;
    let blur = false;
    let c_mix = false;
    let c_blur = false;
    let c_f_blur = false;
</script>

CSS 滤镜导致 CSS 3D 失效
<h2>point:</h2>
<div>
    <label for="mix">mix-blend-mode: lighten;</label>
    <input id="mix" type="checkbox" bind:checked={mix} />
</div>
<div>
    <label for="blur">filter: blur(1px);</label>
    <input id="blur" type="checkbox" bind:checked={blur} />
</div>
<hr />
<h2>container:</h2>
<div>
    <label for="c_mix">mix-blend-mode: overlay;</label>
    <input id="c_mix" type="checkbox" bind:checked={c_mix} />
</div>
<div>
    <label for="c_blur">backdrop-filter: blur(1px);</label>
    <input id="c_blur" type="checkbox" bind:checked={c_blur} />
</div>
<div>
    <label for="c_f_blur">filter: blur(1px);</label>
    <input id="c_f_blur" type="checkbox" bind:checked={c_f_blur} />
</div>
<div class="page">
    <div
        class="container"
        style={[
            c_mix ? "mix-blend-mode: overlay;" : "",
            c_blur ? "backdrop-filter: blur(1px);" : "",
            c_f_blur ? "filter: blur(1px);" : "",
        ].join(" ")}
    >
        {#each list as _, idx}
            <div
                class="point point{idx}"
                style={[
                    mix ? "mix-blend-mode: lighten;" : "",
                    blur ? "filter: blur(1px);" : "",
                ].join(" ")}
            />
        {/each}
    </div>
</div>

<style>
    .page {
        width: 90vw;
        height: 80vh;
        background: black;
        overflow: hidden;
    }

    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        transform: translate3d(-50%, -50%, 0) rotateY(0deg) rotateZ(0deg);
        transform-style: preserve-3d;
        perspective: 1000;
        animation: fullrotate 10s linear infinite;
    }

    .point {
        position: absolute;
        top: 95px;
        left: 49%;
        background: black;
        border-radius: 50%;
        width: 20px;
        height: 20px;
    }

    @keyframes fullrotate {
        to {
            transform: translate3d(-50%, -50%, 0) rotateY(360deg)
                rotateZ(360deg);
        }
    }
</style>
