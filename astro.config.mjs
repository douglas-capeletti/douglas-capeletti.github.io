import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [sitemap()],
  site: "https://techtrektales.com",
  server: ({
    command
  }) => ({
    port: command === 'dev' ? 4000 : 8080
  })
});
