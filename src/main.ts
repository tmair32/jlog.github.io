import { ViteSSG } from "vite-ssg";
import App from "./App.vue";

import Marzipano from "marzipano";
import routes from "virtual:generated-pages";
import "virtual:windi.css";
import { RouterScrollBehavior } from "vue-router";

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition;
  else return { top: 0, behavior: "smooth" };
};

export const createApp = ViteSSG(App, { routes, scrollBehavior }, (ctx) => {
  Object.values(import.meta.globEager("./module/*.ts")).map((i) =>
    i.install?.(ctx)
  );
});
