<script lang="ts" setup>
import { ref, watch } from 'vue'
import { dataImg2, flow } from './ripple'

const page = ref()

watch([page], () => {
    flow('#feMap')
})


</script>

<template>
    <svg height="0">
        <defs>
            <filter id="filter">
                <feImage
                    x="0"
                    y="0"
                    width="600"
                    height="300"
                    result="ripple"
                    :xlink:href="dataImg2"
                />
                <feDisplacementMap
                    id="feMap"
                    xChannelSelector="G"
                    yChannelSelector="B"
                    in="SourceGraphic"
                    in2="ripple"
                    scale="0"
                />
                <feComposite operator="in" in2="ripple" />
            </filter>
        </defs>
    </svg>
    <div ref="page" class="page">
        <svg width="600" height="300">
            <image xlink:href="/fish.svg" width="600" height="300" filter="url(#filter)" />
        </svg>
    </div>
</template>

<style scoped>
.page {
    width: 100vw;
    height: 100vh;
    background-color: darkblue;
}
</style>