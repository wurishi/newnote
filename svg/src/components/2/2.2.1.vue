<script lang="ts" setup>
import { ref } from 'vue';

const scale = ref(10)
</script>

<template>
    <svg width="256" height="192">
        <defs>
            <radialGradient id="rg" r=".9">
                <stop offset="0" stop-color="#f00" />
                <stop offset="10%" stop-color="#000" />
                <stop offset="20%" stop-color="#f00" />
                <stop offset="30%" stop-color="#000" />
                <stop offset="40%" stop-color="#f00" />
                <stop offset="50%" stop-color="#000" />
                <stop offset="60%" stop-color="#f00" />
                <stop offset="70%" stop-color="#000" />
                <stop offset="80%" stop-color="#f00" />
                <stop offset="90%" stop-color="#000" />
                <stop offset="100" stop-color="#f00" />
            </radialGradient>
            <rect id="witness" width="256" height="192" fill="url(#rg)" />

            <filter id="filter-ripple">
                <feImage xlink:href="#witness" x="0" y="0" width="256" height="192" result="pict2" />
                <feDisplacementMap
                    xChannelSelector="R"
                    yChannelSelector="R"
                    color-interpolation-filters="sRGB"
                    in="SourceGraphic"
                    in2="pict2"
                    :scale="scale"
                />
                <feComposite operator="in" in2="pict2" />
            </filter>
        </defs>
        <use xlink:href="#witness" />
    </svg>

    <svg width="256" height="192">
        <image xlink:href="/mm1.jpg" width="256" height="192" filter="url(#filter-ripple)" />
    </svg>

    <span>Scale: {{ scale }}</span>
    <input type="range" v-model="scale" min="0" max="200" />
</template>