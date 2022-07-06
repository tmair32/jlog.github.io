<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRootStore } from "~/store/root";

const chartStore = useRootStore();
const { toggleMobileMenu } = chartStore;
const { mobileMenu: isMobileMenuOpen } = storeToRefs(chartStore);
</script>
<template>
  <div class="menu-box">
    <button
      class="w-5 h-5 relative focus:outline-none"
      @click="toggleMobileMenu"
    >
      <span class="sr-only">Open Section Menu</span>
      <div class="menu-box">
        <span
          aria-hidden="true"
          class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
          :class="{
            'rotate-45': isMobileMenuOpen,
            '-translate-y-1.5': !isMobileMenuOpen,
          }"
        />
        <span
          aria-hidden="true"
          class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
          :class="{
            'opacity-0': isMobileMenuOpen,
          }"
        />
        <span
          aria-hidden="true"
          class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
          :class="{
            '-rotate-45': isMobileMenuOpen,
            'translate-y-1.5': !isMobileMenuOpen,
          }"
        />
      </div>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.menu-box {
  @apply block w-5;
}
</style>
