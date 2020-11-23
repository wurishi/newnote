<template>
  <div ref="root">55555</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup: () => {
    const root = ref<HTMLElement>(null);

    onMounted(() => {
      console.log(root.value.textContent);
    });

    return {
      root,
    };
  },
});
</script>
