import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [sitemap()],
  site: "https://douglas-capeletti.github.io",
});
