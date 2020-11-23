<template>
  <div class="demo">
    <component :is="'Demo_1'" />
    <D1 :value="1010" name="HEHE" enum="C" />
    <Com name="Com" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import main from '../main';
import D1, { Com } from '../demos/1.vue';
export default {
  components: {
    D1,
    Com,
  },
};
</script>
