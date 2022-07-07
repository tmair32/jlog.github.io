<script setup lang="ts">
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
const canvasRef: HTMLCanvasElement = ref(null);

onMounted(() => {
  const engine = new Engine(canvasRef.value, true);

  const createScene = () => {
    const scene = new Scene(engine);
    return scene;
  };

  const scene = createScene();
  engine.runRenderLoop(() => {
    scene.render();
  });

  const Camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 4,
    3,
    new Vector3(0, 0, 0),
    scene
  );
  Camera.attachControl(canvasRef.value, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.5;

  const earth = MeshBuilder.CreateSphere("earth", {}, scene);
  const earthMaterial = new StandardMaterial("ground", scene);
  earthMaterial.diffuseTexture = new Texture("textures/earth.jpg", scene);
  earthMaterial.diffuseTexture.vScale = -1;
  earth.material = earthMaterial;

  scene.registerBeforeRender(() => {
    const axis = new Vector3(
      Math.sin((23 * Math.PI) / 180),
      Math.cos((23 * Math.PI) / 180),
      0
    );
    earth.rotate(axis, 0.01);
  });
});
</script>
<template>
  <canvas ref="canvasRef" class="babylon-background" />
</template>
<style lang="scss" scoped>
.babylon-background {
  @apply w-full h-60 lg:h-100 mt-64px fixed;
}
</style>
