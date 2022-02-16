<script lang="ts" setup>
import { ref } from 'vue'

const baseFrequency = ref(0.00025)
const numOctaves = ref(1)
</script>

<template>
    <span>Fractal</span>
    <div class="fractal"></div>
    <span>Turbulence</span>
    <div class="turbulence"></div>

    <span>baseFrequency: {{ baseFrequency }}</span>
    <input type="range" min="0.00025" max="1" step="0.01" v-model="baseFrequency" />
    <span>numOctaves: {{ numOctaves }}</span>
    <input type="range" min="1" max="10" step="1" v-model="numOctaves" />

    <svg>
        <defs>
            <filter id="fractal">
                <feTurbulence
                    type="fractalNoise"
                    :baseFrequency="baseFrequency"
                    :numOctaves="numOctaves"
                />
            </filter>
            <filter id="turbu">
                <feTurbulence
                    type="turbulence"
                    :baseFrequency="baseFrequency"
                    :numOctaves="numOctaves"
                />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    width: 200px;
    height: 150px;
    background-color: rgba(255, 255, 255, 0.3);
}
.fractal {
    filter: url(#fractal);
}
.turbulence {
    filter: url(#turbu);
}
</style>