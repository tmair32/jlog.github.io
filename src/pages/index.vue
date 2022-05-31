<script setup lang="ts"></script>
<template>
  <div class="w-full h-full">
    <NavBar />
    <div class="body">
      <Section />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.body {
  @apply w-full h-full bg-[#36393F] flex gap-x-2 transform relative transition-all duration-1000;
}
</style>
