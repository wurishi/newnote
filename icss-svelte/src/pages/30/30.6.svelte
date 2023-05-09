<script lang="ts">
    import { onDestroy } from "svelte";
    const timer = setInterval(() => {
        const ani = document.querySelector('#div-30-6') as HTMLDivElement;
        let coordinate = ''
        for(let i=0;i<2000;i++) {
            coordinate += parseInt((Math.random() * 10000).toString()) / 100 + '% '
                + parseInt((Math.random() * 10000).toString()) / 100 + '%, '
        }
        coordinate = 'polygon(' + coordinate.slice(0, -2) + ')';
        ani.style.clipPath = coordinate;
        ani.style.backgroundColor = '#' + (~~(Math.random() * (1 << 24))).toString(16);
        
    }, 500);
    onDestroy(() => {
        clearInterval(timer)
    })
</script>

N边形过渡动画
<div class="page">
    <div id="div-30-6" />
</div>

<style>
    .page {
        position: relative;
        width: 300px;
        height: 300px;
    }
    #div-30-6 {
        width: 300px;
        height: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.5s;
        transition-timing-function: cubic-bezier(0.92, -0.5, 1, 0.12);
        border-radius: 50%;
    }
</style>
