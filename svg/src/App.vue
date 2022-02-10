<script setup lang="ts">
import { getAllLinks } from './route'
</script>

<template>
  <div id="route">
    <template v-for="link in getAllLinks()" :key="link">
      <router-link :to="link">{{ link }}</router-link>
      <span style="width: 10px;display: inline-block;"></span>
    </template>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#route {
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-bottom: 1px dashed grey;
}
</style>
