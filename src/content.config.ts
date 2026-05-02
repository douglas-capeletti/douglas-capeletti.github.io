import { glob } from 'astro/loaders'
import { defineCollection } from "astro:content"
import { z } from "astro/zod"

const schema = z.object({
  title: z.string(),
  description: z.string().optional(), // optional description to be shown on search result
  pubDate: z.coerce.date().optional(),
  hero: z.string().optional(),
  tags: z.array(z.string()).optional(),
  video: z.string().optional()
})

const guides_pt = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/guides/pt" }) })
const guides_en = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/guides/en" }) })
const notes_pt = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/notes/pt" }) })
const notes_en = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/notes/en" }) })
const voting_pt = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/voting/pt" }) })
const voting_en = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/voting/en" }) })
const about_pt = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/about/pt" }) })
const about_en = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/about/en" }) })

export const collections = {
  guides_pt,
  guides_en,
  notes_pt,
  notes_en,
  voting_pt,
  voting_en,
  about_pt,
  about_en,
}
