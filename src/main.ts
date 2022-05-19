import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import marzipano from "marzipano";
import routes from "virtual:generated-pages";
import { createPinia } from "pinia";
import { RouterScrollBehavior } from "vue-router";
import "~/assets/styles/style.scss";
import "virtual:windi.css";

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition;
  else return { top: 0, behavior: "smooth" };
};

export const createApp = ViteSSG(App, { routes, scrollBehavior }, (ctx) => {
  Object.values(import.meta.globEager("./module/*.ts")).map((i) =>
    i.install?.(ctx)
  );

  const pinia = createPinia();

  ctx.app.use(pinia);
  ctx.app.provide("$marzipano", marzipano);
});
