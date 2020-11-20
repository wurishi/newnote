<template>
  <div>{{ count }} {{ object.foo }}</div>
</template>

<script lang="ts">
import Vue, { reactive, ref } from 'vue';
export default {
  setup() {
    const count = ref(0);
    const object = reactive({ foo: 'bar' });

    return {
      count,
      object,
    };
  },
};
</script>
