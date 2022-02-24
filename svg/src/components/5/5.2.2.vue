<script lang="ts" setup>
const click = () => {
    const filter = document.querySelector('#feDis')
    if (filter) {
        const startTime = Date.now();
        const duration = 1000;
        const target = 200;

        requestAnimationFrame(function aniMove() {
            const t = Math.min(1, (Date.now() - startTime) / duration);
            const nextTarget = target - (t * target) + 1;
            filter.setAttribute('scale', String(nextTarget))

            if (t < 1) {
                requestAnimationFrame(aniMove)
            }
        })
    }
}
</script>

<template>
    <div class="fractal" @click="click"></div>

    <svg>
        <defs>
            <filter id="fractal" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="150">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.0995"
                    numOctaves="1"
                    result="img"
                />
                <feDisplacementMap id="feDis" in="SourceGraphic" in2="img" scale="200" />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    width: 200px;
    height: 150px;
    background: url("/image1.jpg");
}
.fractal {
    filter: url(#fractal);
}
</style>