<script lang="ts" setup>
const points = [
    [10, 10, 20, 20, 40, 20, 50, 10],
    [70, 10, 70, 20, 120, 20, 120, 10],
    [130, 10, 120, 20, 180, 20, 170, 10],
    [10, 60, 20, 80, 40, 80, 50, 60],
    [70, 60, 70, 80, 110, 80, 110, 60],
    [130, 60, 120, 80, 180, 80, 170, 60],
    [10, 110, 20, 140, 40, 140, 50, 110],
    [70, 110, 70, 140, 110, 140, 110, 110],
    [130, 110, 120, 140, 180, 140, 170, 110]
]
</script>

<template>
    <svg width="380" height="320" viewBox="0 0 190 160">
        <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent" />
        <path d="M70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent" />
        <path d="M130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent" />
        <path d="M10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent" />
        <path d="M70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent" />
        <path d="M130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent" />
        <path d="M10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent" />
        <path d="M70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent" />
        <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent" />

        <g v-for="(pt, idx) of points" :key="idx">
            <circle :cx="pt[0]" :cy="pt[1]" r="1" fill="red" />
            <line :x1="pt[0]" :y1="pt[1]" :x2="pt[2]" :y2="pt[3]" stroke="red" />
            <circle :cx="pt[2]" :cy="pt[3]" r="1" fill="red" />

            <circle :cx="pt[4]" :cy="pt[5]" r="1" fill="red" />
            <line :x1="pt[4]" :y1="pt[5]" :x2="pt[6]" :y2="pt[7]" stroke="red" />
            <circle :cx="pt[6]" :cy="pt[7]" r="1" fill="red" />
        </g>
    </svg>
</template>