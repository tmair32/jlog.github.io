<script setup lang="ts">
import axios from "axios";

const catImgList = ref([]);
onMounted(async () => {
  for (let i = 0; i < 6; i++) {
    const catData = await axios.get(
      "https://api.thecatapi.com/v1/images/search"
    );
    const data = catData?.data[0] ?? undefined;
    if (data) {
      catImgList.value.push(data.url);
    }
  }
});
</script>
<template>
  <div class="section">
    <template v-for="(_, idx) in 6" :key="`catBox-${idx}`">
      <div class="section__button">
        <img :src="catImgList[idx]" alt="고양양이" />
      </div>
      <hr v-if="idx === 0" />
    </template>
  </div>
</template>
<style lang="scss" scoped>
.section {
  @apply h-full bg-[#1F2226] flex gap-y-4 flex-col items-center py-15;
  &__button {
    @apply w-13 h-13 cursor-pointer;

    &:hover {
      @apply transform scale-110 transition-all ease;
    }

    img {
      @apply w-full h-full rounded-xl;
    }
  }
  hr {
    @apply border-1 w-10 border-light-400;
  }
}
</style>
