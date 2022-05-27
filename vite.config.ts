import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Markdown from "vite-plugin-md";
import WindiCSS from "vite-plugin-windicss";

import { resolve } from "path";
import { readFileSync } from "fs";
import matter from "gray-matter";
import Pages from "vite-plugin-pages";

import anchor from "markdown-it-anchor";
import attr from "markdown-it-link-attributes";
import Prism from "markdown-it-prism";
import toc from "markdown-it-table-of-contents";

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.MODE || process.env.NODE_ENV || "development",
  base: "/jlog.github.io/",
  server: {
    fs: {
      allow: [".."],
    },
    port: 5001,
  },
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  define: {
    "process.env": process.env,
  },
  plugins: [
    AutoImport({
      imports: ["vue", "@vueuse/core", "@vueuse/head"],
      dts: true,
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
    }),
    eslintPlugin(),
    Markdown({
      headEnabled: true,
      wrapperComponent: "post",
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      wrapperClasses: "article-body mb-5",
      markdownItSetup(md) {
        md.use(Prism);
        md.use(anchor, {
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: "#",
          permalinkAttrs: () => ({ "aria-hidden": true }),
        }),
          md.use(attr, {
            pattern: /^https?:/,
            attrs: {
              target: "_blank",
              rel: "noopener",
            },
          }),
          md.use(toc);
      },
    }),
    Pages({
      pagesDir: [
        {
          dir: "src/pages",
          baseRoute: "/jlog.github.io/",
        },
        {
          dir: "posts",
          baseRoute: "posts",
        },
      ],
      extensions: ["vue", "md"],
      extendRoute(route) {
        // Get inspired from anthony fu"s personal website
        // https://github.com/antfu/antfu.me
        const path = resolve(__dirname, route.component.slice(1));
        const md = readFileSync(path, "utf-8");
        const { data } = matter(md);
        if (path.split(".").pop() == "md") {
          route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        }
      },
    }),
    vue(),
    WindiCSS(),
  ],
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
  },
});
