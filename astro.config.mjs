import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"
import { defaultLang } from "./src/i18n/translations"
import { SITE_URL } from "./src/utils/constants"

export default defineConfig({
  integrations: [sitemap()],
  site: SITE_URL,
  i18n: {
    defaultLocale: defaultLang,
    locales: ["pt", "en"],
    routing: {
      prefixDefaultLocale: true
    }
  },
  server: ({
    command
  }) => ({
    port: command === 'dev' ? 4000 : 8080
  })
})
