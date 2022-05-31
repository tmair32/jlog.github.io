<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRootStore } from "~/store/root";

const chartStore = useRootStore();
const { mobileMenu: isMobileMenuOpen } = storeToRefs(chartStore);
</script>
<template>
  <div
    class="section <md:(transform transition-all duration-500)"
    :class="{
      '<md:(-translate-x-0)': isMobileMenuOpen,
      '<md:(-translate-x-100)': !isMobileMenuOpen,
    }"
  ></div>
</template>
<style lang="scss" scoped>
.section {
  @apply h-screen rounded-r-t-xl w-3/4 sm:(w-400px rounded-none) bg-[#1F2226] fixed;
  @apply;
}
</style>
