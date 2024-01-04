<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    let sides = 500;
    const reactive = {
        stats: new Array<number>(sides).fill(100),
    };

    let minRadius = 50;

    const newRandomValue = () =>
        Math.ceil(minRadius + Math.random() * (100 - minRadius));

    $: {
        const diff = sides - reactive.stats.length;
        if (diff > 0) {
            for (let i = 1; i <= diff; i++) {
                reactive.stats.push(newRandomValue());
            }
            reactive.stats = reactive.stats.concat();
        } else {
            const absoluteDiff = Math.abs(diff);
            for (let i = 1; i <= absoluteDiff; i++) {
                reactive.stats.shift();
            }
            reactive.stats = reactive.stats.concat();
        }
    }

    const valueToPoint = (value: number, index: number, total: number) => {
        let x = 0,
            y = value * -0.9;
        const angle = ((Math.PI * 2) / total) * index;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const tx = x * cos - y * sin + 100;
        const ty = x * sin + y * cos + 100;
        return { x: tx, y: ty };
    };

    const generatePoints = (stats: number[]) => {
        const total = stats.length;
        let points = stats
            .map((stat, index) => {
                const point = valueToPoint(stat, index, total);
                return point.x + "px " + point.y + "px,";
            })
            .join(" ");
        points = points.slice(0, -1);

        return points;
    };

    let style = "";
    $: {
        style = `background: #41B883; clip-path: polygon(${generatePoints(
            reactive.stats
        )});`;
    }

    const randomizeStats = () => {
        reactive.stats = reactive.stats.map(() => newRandomValue());
    };

    let timer = null;
    onMount(() => {
        randomizeStats();
        timer && clearInterval(timer);
        timer = setInterval(() => {
            randomizeStats();
        }, 1000);
    });
    onDestroy(() => {
        timer && clearInterval(timer);
    });
</script>

N polygon

<div id="svgpolygon" {style} />

<label for="sides">Sides: {sides}</label>
<input name="sides" type="range" min="3" max="500" bind:value={sides} />
<label for="minRadius">Minimum Radius: {minRadius}</label>
<input name="minRadius" type="range" min="0" max="90" bind:value={minRadius} />

<style>
    #svgpolygon {
        display: block;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        border: 1px solid #333;
        transition: all .8s;
    }

    input[type="range"] {
        display: block;
        width: 100%;
        margin-bottom: 15px;
    }
</style>
