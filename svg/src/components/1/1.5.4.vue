<script lang="ts" setup>
import { ref } from 'vue'
const saturate = ref(1)
const hueRotate = ref(0)

</script>
<template>
    <span>原图</span>
    <div></div>
    <span>saturate</span>
    <input type="range" min="0" max="1" step="0.01" v-model="saturate" />
    <div class="saturate"></div>

    <span>hueRotate</span>
    <input type="range" min="0" max="360" v-model="hueRotate" />
    <div class="hueRotate"></div>

    <span>luminanceToAlpha</span>
    <div class="luminanceToAlpha"></div>

    <span></span>
    <svg>
        <defs>
            <filter id="saturate" x="0" y="0" width="200" height="150">
                <feColorMatrix type="saturate" in="SourceGraphic" :values="saturate.toString()" />
            </filter>
            <filter id="hueRotate" x="0" y="0" width="200" height="150">
                <feColorMatrix type="hueRotate" in="SourceGraphic" :values="hueRotate.toString()" />
            </filter>
            <filter id="luminanceToAlpha" x="0" y="0" width="200" height="150">
                <feColorMatrix type="luminanceToAlpha" in="SourceGraphic" />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
span {
    display: block;
}
div {
    width: 200px;
    height: 150px;
    background: url("/image1.jpg");
}
.saturate {
    filter: url(#saturate);
}
.hueRotate {
    filter: url(#hueRotate);
}
.luminanceToAlpha {
    filter: url(#luminanceToAlpha);
}
</style>