<script lang="ts" setup>
import { ref } from 'vue';

const scale = ref(0)
</script>

<template>
    <svg>
        <defs>
            <filter id="filter-ripple">
                <feImage
                    xlink:href="/map.png"
                    x="0"
                    y="0"
                    width="256"
                    height="256"
                    result="ripple"
                />
                <feDisplacementMap
                    xChannelSelector="R"
                    yChannelSelector="G"
                    color-interpolation-filters="sRGB"
                    :scale="scale"
                    in="SourceGraphic"
                    in2="ripple"
                />
                <feComposite operator="in" in2="ripple" />
            </filter>
        </defs>
    </svg>
    <svg width="256" height="192" style="outline:1px dotted;">
        <image xlink:href="/mm1.jpg" width="256" height="192" filter="url(#filter-ripple)" />
    </svg>

    <span>Scale: {{ scale }}</span>
    <input type="range" v-model="scale" min="0" max="200" />
</template>