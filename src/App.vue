<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <router-view :key="$route.path" />
</template>

<style>
#app {
  font-size: 62.5%;
  @apply w-screen h-screen overflow-hidden;
}
</style>
