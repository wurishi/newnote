<script lang="ts" setup>
const toggleRadius = () => {
    const circle = document.getElementById('circle') as any
    if (circle) {
        // circle.r = {baseVal, animVal}
        circle.r.baseVal.value = 0.4 - circle.r.baseVal.value
    }
}
</script>
<template>
    大部分浏览器仅支持内嵌的 SVG 作为 clip-path
    <p class="target" style="background:lime;">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam.
    </p>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing
        <b class="target">
            elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
        </b>
        Ut enim ad minim veniam.
    </p>

    <button @click="toggleRadius">Toggle radius</button>

    <svg height="0">
        <clipPath id="clipping-path-1" clipPathUnits="objectBoundingBox">
            <circle cx="0.25" cy="0.25" r="0.25" id="circle" />
            <rect x="0.5" y="0.2" width="0.5" height="0.8" />
        </clipPath>
    </svg>
</template>

<style scoped>
.target {
    clip-path: url(#clipping-path-1);
}
p {
    width: 300px;
    border: 1px solid #000;
    display: inline-block;
}
</style>