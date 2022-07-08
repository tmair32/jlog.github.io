<script setup lang="ts">
import {
  ArcRotateCamera,
  Color4,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  SceneLoader,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders";
const canvasRef: HTMLCanvasElement = ref(null);

const drawMonsterBall = (scene) => {
  const MonsterBallButton1 = SceneLoader.ImportMesh(
    "Button1",
    "/src/assets/image/MonsterBall/",
    "Button1.stl",
    scene,
    (meshes) => {
      for (let mesh of meshes) {
        mesh.scaling = new Vector3(0.01, 0.01, 0.01);
        mesh.position = new Vector3(2, 0, 0.465);
        mesh.rotation = new Vector3(Math.PI / 2, 0, 0);

        const material = new StandardMaterial("material", scene);
        material.specularColor = new Color4.FromHexString("#A6A8AB");
        mesh.material = material;
      }
    }
  );
  const MonsterBallButton2 = SceneLoader.ImportMesh(
    "Button2",
    "/src/assets/image/MonsterBall/",
    "Button2.stl",
    scene,
    (meshes) => {
      for (let mesh of meshes) {
        mesh.scaling = new Vector3(0.0148, 0.01, 0.0148);
        mesh.position = new Vector3(2, 0, 0.42);
        mesh.rotation = new Vector3(Math.PI / 2, 0, 0);

        const material = new StandardMaterial("material", scene);
        material.diffuseColor = new Color4.FromHexString("#0B290B");
        mesh.material = material;
      }
    }
  );
  const MonsterBallDown = SceneLoader.ImportMesh(
    "down",
    "/src/assets/image/MonsterBall/",
    "down.stl",
    scene,
    (meshes) => {
      for (let mesh of meshes) {
        mesh.scaling = new Vector3(0.01, 0.01, 0.01);
        mesh.position = new Vector3(2, 0, 0);
        mesh.rotation = new Vector3(Math.PI / 2, 0, 0);

        const material = new StandardMaterial("material", scene);
        material.emissiveColor = new Color4.FromHexString("#8F0505");
        mesh.material = material;
      }
    }
  );
  const MonsterBallMiddle = SceneLoader.ImportMesh(
    "middle",
    "/src/assets/image/MonsterBall/",
    "middle.stl",
    scene,
    (meshes) => {
      for (let mesh of meshes) {
        mesh.scaling = new Vector3(0.01, 0.01, 0.01);
        mesh.position = new Vector3(2, 0, 0);
        mesh.rotation = new Vector3(Math.PI / 2, 0, 0);

        const material = new StandardMaterial("material", scene);
        material.diffuseColor = new Color4.FromHexString("#0B090B");
        mesh.material = material;
      }
    }
  );
  const MonsterBallTop = SceneLoader.ImportMesh(
    "top",
    "/src/assets/image/MonsterBall/",
    "top.stl",
    scene,
    (meshes) => {
      for (let mesh of meshes) {
        mesh.scaling = new Vector3(0.01, 0.01, 0.01);
        mesh.position = new Vector3(2, 0, 0);
        mesh.rotation = new Vector3(Math.PI / 2, 0, 0);

        const material = new StandardMaterial("material", scene);
        material.emissiveColor = new Color4.FromHexString("#7F8185");
        mesh.material = material;
      }
    }
  );
};

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

  const Emolga = SceneLoader.ImportMesh(
    "",
    "/src/assets/image/emolga/",
    "scene.gltf",
    scene,
    (meshes) => {
      for (let mesh of meshes) {
        mesh.position = new Vector3(0, -0.5, 0);
      }
    }
  );

  drawMonsterBall(scene);

  const Camera = new ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3,
    3,
    new Vector3(0, 0, 0),
    scene
  );

  Camera.attachControl(canvasRef.value, true); // Set Camera

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.5;

  // const earth = MeshBuilder.CreateSphere("earth", {}, scene);
  // const earthMaterial = new StandardMaterial("ground", scene);
  // earthMaterial.diffuseTexture = new Texture("textures/earth.jpg", scene);
  // earthMaterial.diffuseTexture.vScale = -1;
  // earth.material = earthMaterial;

  // scene.registerBeforeRender(() => {
  //   const axis = new Vector3(
  //     Math.sin((23 * Math.PI) / 180),
  //     Math.cos((23 * Math.PI) / 180),
  //     0
  //   );
  //   earth.rotate(axis, 0.01);
  // });
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
