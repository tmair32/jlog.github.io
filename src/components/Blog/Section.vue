<script setup lang="ts">
import axios from "axios";

const catImgList = ref([]);
for (let i = 0; i < 6; i++) {
  catImgList.value.push({
    url: "",
    loading: false,
  });
}
onMounted(async () => {
  for (let i = 0; i < 6; i++) {
    try {
      await setTimeout(() => {}, 3000);
      const catData = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      const data = catData?.data[0] ?? undefined;
      if (data) {
        catImgList.value[i].url = data.url;
        catImgList.value[i].loading = true;
      }
    } catch (err) {
      console.error(err);
    }
  }
});
</script>
<template>
  <div class="section">
    <template v-for="(_, idx) in 6" :key="`catBox-${idx}`">
      <div class="section__button">
        <span v-if="!catImgList[idx]?.loading" class="skeleton" />
        <img v-else :src="catImgList[idx]?.url" />
      </div>
      <hr v-if="idx === 0" />
    </template>
  </div>
</template>
<style lang="scss" scoped>
.section {
  @apply h-full bg-[#1F2226] flex gap-y-4 flex-col items-center py-5;
  &__button {
    @apply w-13 h-13 cursor-pointer;

    &:hover {
      @apply transform scale-110 transition-all ease;
    }

    img {
      @apply w-full h-full rounded-xl;
    }

    .skeleton {
      @apply inline-block relative align-middle overflow-hidden bg-teal-300;
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
  }
  hr {
    @apply border-1 w-10 border-stone-400;
  }
}
</style>
