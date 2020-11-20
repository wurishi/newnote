<template>
  <div class="demo">
    <component :is="'Demo_1'" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import main from '../main';
export default {
  setup() {
    const h = ref(100);
    console.log(main);
    return {
      h,
    };
  },
};
</script>
