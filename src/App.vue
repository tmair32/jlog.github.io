<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <NavBar />
  <div class="page-content">
    <router-view :key="$route.path" />
  </div>
  <footer class="page-footer"></footer>
</template>

<style>
#app {
  font-size: 62.5%;
  @apply w-full h-full overflow-hidden;
}

.page-header {
  @apply w-screen;
}

.page-content {
  @apply w-full h-full overflow-hidden bg-sky-50;
}
</style>
