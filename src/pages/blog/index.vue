<script setup lang="ts"></script>
<template>
  <div class="w-full h-full">
    <NavBar />
    <div class="body">
      <Section />
      <div class="content">
        <div class="menu"></div>
        <div class="post"></div>
      </div>
      <div class="chat"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.body {
  @apply w-full h-full grid grid-cols-1 md:grid-cols-[80px,auto,2fr];
}
</style>
