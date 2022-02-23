<script lang="ts" setup>
import { ref, watch } from 'vue';
import { rippleEffect } from './ripple'

const btn = ref()
const img = ref()

watch([btn, img], () => {
    btn.value && rippleEffect(btn.value)
    img.value && rippleEffect(img.value)
})

</script>

<template>
    <button ref="btn">Click Me</button>
    <img ref="img" src="/image1.jpg" width="200" height="150" />
</template>