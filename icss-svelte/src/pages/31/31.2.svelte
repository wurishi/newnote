
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    let start = true;
    onMount(() => {
        const canvas = document.querySelector('#canvas-31-2') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const radians = (Math.PI / 180) * 180;
        let startTime = Date.now();
        const time = 2000;
        let clockwise = true;
        let cp1x: number, cp1y: number, cp2x: number, cp2y: number;

        const waveDraw = () => {
            const t = Math.min(1.0, (Date.now() - startTime) / time);
            if(clockwise) {
                cp1x = 90 + (55 * t);
                cp1y = 28 + (72 * t);
                cp2x = 92 - (51 * t);
                cp2y = 179 - (79 * t);
            } else {
                cp1x = 145 - (55 * t);
                cp1y = 100 - (72 * t);
                cp2x = 41 + (51 * t);
                cp2y = 100 + (79 * t);
            }
            ctx.clearRect(0, 0, 200, 200);
            ctx.beginPath();
            ctx.moveTo(0, 100);
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, 200, 100);
            ctx.arc(100, 100, 100, 0, radians, false);
            ctx.fillStyle = 'rgba(154, 205, 50, .8)';
            ctx.fill();
            ctx.save();
            if(t == 1) {
                startTime = Date.now();
                clockwise = !clockwise;
            }

            start && requestAnimationFrame(waveDraw);
        };

        requestAnimationFrame(waveDraw);
    });

    onDestroy(() => {
        start = false;
    });
</script>

使用 canvas 实现波浪效果
<canvas id="canvas-31-2" width="200" height="200"></canvas>

<style>
    * {
        text-align: center;
    }

    #canvas-31-2 {
        display: block;
        box-sizing: content-box;
        padding: 5px;
        background-color: white;
        border-radius: 100%;
        position: relative;
        border: 10px solid rgba(154, 205, 50, .8);
    }
</style>