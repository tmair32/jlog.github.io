<script setup lang="ts">
import SolidColorSource from "~/utils/SolidColorSource";

const marzipano = inject("$marzipano");
const panoRef: HTMLDivElement | undefined = ref();

// Show stats about the current view and cubemap size.
const facePixelsRef: HTMLSpanElement | undefined = ref();
const faceTilesRef: HTMLSpanElement | undefined = ref();
const totalPixelsRef: HTMLSpanElement | undefined = ref();
const totalTilesRef: HTMLSpanElement | undefined = ref();
const fovRef: HTMLSpanElement | undefined = ref();

// Create viewer.
const viewerOpts = {
  controls: {
    mouseViewMode: "drag",
  },
};

onMounted(() => {
  const viewer = new marzipano.Viewer(panoRef.value, viewerOpts);

  // Create procedurally-generated single-color tile source.
  const source = new SolidColorSource(512, 512);

  // Create geometry with a very large number of levels.
  const levels = [];
  for (let i = 0; i < 32; i++) {
    levels.push({ tileSize: 512, size: 512 * Math.pow(2, i) });
  }
  const geometry = new marzipano.CubeGeometry(levels);

  // Create Initial View
  const initialView = ref({
    yaw: 0,
    pitch: 0,
    fov: (52 * Math.PI) / 180,
  });

  // Create Limiter
  const limitResolution = marzipano.RectilinearView.limit.resolution(2048);
  const limitYaw = marzipano.RectilinearView.limit.yaw(
    -Math.PI / 2,
    Math.PI / 2
  );
  const limitPitch = marzipano.RectilinearView.limit.pitch(0, 0);
  const limitVFov = marzipano.RectilinearView.limit.vfov(
    0,
    (75 * Math.PI) / 180
  );
  const limiter = marzipano.util.compose(
    limitResolution,
    limitYaw,
    limitPitch,
    limitVFov
  );

  // Create View
  const view = new marzipano.RectilinearView(initialView, limiter);

  // Create Scene
  const scene = viewer.createScene({
    source,
    geometry,
    view,
    pinFirstLevel: true,
  });

  // Display Scene
  scene.switchTo();

  // Format Mega Pixels
  const formatMegaPixels = (num: number) => {
    const suffixes = ["Mega", "Giga", "Tera", "Peta", "Exa", "Zetta"];
    let i = 0;
    while (i < suffixes.length) {
      // for (let i = 0; i < suffixes.length; i++) {
      const divider = Math.pow(1000, i);
      if (num < divider) {
        break;
      }
      i++;
    }
    const divided = num / Math.pow(1000, i);
    const formatted = divided.toFixed(2) + " " + suffixes[i];
    return formatted;
  };
  // Format Tile Num
  const formatTileNum = (num: number) => {
    const suffixes = ["", "K", "M", "G", "T", "P", "E", "Z"];
    if (num < 999999) {
      return num;
    }
    let i = 0;
    while (i < suffixes.length) {
      // for (let i = 0; i < suffixes.length; i++) {
      const divider = Math.pow(1000, i);
      if (num < divider) {
        break;
      }
      i++;
    }
    i -= 1;
    const divided = num / Math.pow(1000, i);
    const formatted = divided.toFixed(2) + suffixes[i];
    return formatted;
  };

  view.addEventListener("change", () => {
    const level = view.selectLevel(geometry.levelList);

    const faceTiles = level.numHorizontalTiles() * level.numVerticalTiles();
    const totalTiles = faceTiles * 6;
    const faceMegaPixels = (level.width() / 1000) * (level.height() / 1000);
    const totalMegaPixels = faceMegaPixels * 6;

    const fovDeg = (view.fov() * 180) / Math.PI;
    const fovFormatted = fovDeg.toFixed(10) + "°";

    const faceTilesFormatted = formatTileNum(faceTiles);
    const totalTilesFormatted = formatTileNum(totalTiles);
    const facePixelsFormatted = formatMegaPixels(faceMegaPixels) + "pixel";
    const totalPixelsFormatted = formatMegaPixels(totalMegaPixels) + "pixel";

    faceTilesRef.value.innerHTML = faceTilesFormatted;
    totalTilesRef.value.innerHTML = totalTilesFormatted;
    facePixelsRef.value.innerHTML = facePixelsFormatted;
    totalPixelsRef.value.innerHTML = totalPixelsFormatted;
    fovRef.value.innerHTML = fovFormatted;
  });
});
</script>

<template>
  <div class="main">
    <div ref="panoRef" class="marzipano" />

    <div class="info">
      <div>Fov: <span ref="fovRef" /></div>
      <div>Face tiles: <span ref="faceTilesRef" /></div>
      <div>Face size: <span ref="facePixelsRef" /></div>
      <div>Total tiles: <span ref="totalTilesRef" /></div>
      <div>Total Size: <span ref="totalPixelsRef" /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply w-full h-full p-0 m-0 overflow-hidden bg-light-900;
}

.marzipano {
  @apply absolute w-full h-full top-0 left-0;
}

.info {
  @apply absolute top-0 right-0 bg-color-[rgba(103,115,131,0.9)] text-light-900;

  > div {
    @apply my-0.5em py-0.2em px-0.5em;
  }
}
</style>
