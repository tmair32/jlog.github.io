<script setup lang="ts"></script>
<template>
  <nav class="nav">
    <div class="nav__title">
      <NavTitle />
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.nav {
  @apply w-full h-40px bg-[#1F2226] grid items-center;
  &__title {
    @apply w-20;
  }
}
</style>
