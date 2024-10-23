import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import { SITE_URL } from "./src/utils/constants"

export default defineConfig({
  integrations: [sitemap()],
  site: SITE_URL,
  server: ({
    command
  }) => ({
    port: command === 'dev' ? 4000 : 8080
  })
})
