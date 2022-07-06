<script setup lang="ts"></script>
<template>
  <nav class="page-header">
    <div class="menu">
      <MenuButton />
    </div>
    <div class="title">
      <NavTitle />
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.page-header {
  @apply w-full h-64px bg-white dark:bg-dark-100;
  @apply grid items-center px-6 grid-cols-[min-content,max-content,min-content,auto] gap-x-6;
  @apply fixed inset-0;
}
</style>
