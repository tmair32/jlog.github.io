<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div v-if="!loading" class="skeleton" />
</template>
<style lang="scss" scoped>
.skeleton {
  @apply inline-block w-full h-full relative align-middle rounded-xl overflow-hidden bg-teal-300;
  &:after {
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 5s infinite;
    content: "";
    @apply absolute inset-0 transform -translate-x-[100%];
  }
  @keyframes shimmer {
    100% {
      @apply transform translate-x-[100%];
    }
  }
}
</style>
