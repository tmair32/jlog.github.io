<script setup lang="ts">
import axios from "axios";

const menuOpen = ref(false);
const catImgList = ref([]);
// 빈 고양이 사진 리스트
for (let i = 0; i < 6; i++) {
  catImgList.value.push({
    url: "",
    loading: false,
  });
}
onMounted(async () => {
  // 고양이 사진 가져오기
  for (let i = 0; i < 6; i++) {
    try {
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
  <div />
  <!-- <div>
    <input id="menu-open" :value="menuOpen" type="checkbox" class="hidden" />
    <header class="header">
      <label for="menu-open" class="menu-button">
        <template v-if="!menuOpen">
          <SvgBase
            svg-class="w-6 h-6 transition duration-200 ease-in-out"
            view-box="0 0 24 24"
            svg-name="mobile-menu-button"
            @click="menuOpen = true"
          >
            <template #svgContent>
              <path
                class="stroke-cap-round stroke-join-round stroke-3"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </template>
          </SvgBase>
        </template>
        <template v-else>
          <SvgBase
            svg-class="w-6 h-6 transition duration-200 ease-in-out"
            view-box="0 0 24 24"
            svg-name="mobile-close-button"
          >
            <template #svgContent>
              <path
                class="stroke-cap-round stroke-join-round stroke-3"
                d="M6 18L18 6M6 6l12 12"
              />
            </template>
          </SvgBase>
        </template>
      </label>
    </header>
    <aside class="sidebar">
      <div class="flex gap-y-4 flex-col items-center">
        <template v-for="(_, idx) in 6" :key="`catBox-${idx}`">
          <div class="menu-item">
            <Skeleton :loading="catImgList[idx]?.loading" />
            <img v-if="catImgList[idx]?.loading" :src="catImgList[idx]?.url" />
          </div>
          <hr v-if="idx === 0" />
        </template>
      </div>
    </aside>
  </div> -->
</template>
<style lang="scss" scoped>
.side-menu {
  @apply w-3/4 fixed transform transition-all fixed duration-700 -translate-x-60 md:(w-full -translate-x-0);
  &__items {
    @apply w-80px h-screen;
  }
  &__button {
    @apply w-30px h-30px text-light-400 md:hidden;
  }

  &__item {
    @apply w-13 h-13 cursor-pointer;

    &:hover {
      @apply transform scale-110 transition-all ease;
    }

    img {
      @apply w-full h-full rounded-xl;
    }
  }
}

// .header {
//   @apply flex justify-between md:hidden;
// }

// .sidebar {
//   @apply w-3/4;
//   @apply transform -translate-x-[100%] md:-translate-x-0;
// }

// #menu-open:checked ~ .sidebar {
//   @apply transform -translate-x-0;
// }

// .menu-button {
//   @apply m-2 p-2 text-light-400 focus:outline-none hover:text-white rounded-md;
// }

// .menu-item {
//   @apply w-13 h-13 cursor-pointer;

//   &:hover {
//     @apply transform scale-110 transition-all ease;
//   }

//   img {
//     @apply w-full h-full rounded-xl;
//   }
// }
// hr {
//   @apply border-1 w-10 border-stone-400;
// }
</style>
