// @ts-check
import { fileURLToPath, URL } from "node:url";

import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { reviewEnabled, blogEnabled, shopEnabled } from "./src/config/site.ts";

const SITE_URL = process.env.PUBLIC_SITE_URL ?? "https://example.com";

export default defineConfig({
  site: SITE_URL,
  // Fully static (Cloudflare Worker / Static Assets). Add @astrojs/cloudflare +
  // output:"server" only when you introduce on-demand routes (SSR).
  output: "static",
  trailingSlash: "never",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    sitemap({
      filter: (page) =>
        (reviewEnabled || !page.includes("/review")) &&
        (blogEnabled || !page.includes("/blog")) &&
        (shopEnabled || !page.includes("/shop")),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
