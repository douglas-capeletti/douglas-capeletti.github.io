import { glob } from 'astro/loaders'
import { defineCollection, z } from "astro:content"

const schema = z.object({
  title: z.string(),
  description: z.string().optional(), // optional description to be shown on search result
  pubDate: z.coerce.date().optional(),
  hero: z.string().optional(),
  tags: z.array(z.string()).optional(),
  video: z.string().optional()
})

const notes_pt = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/notes/pt" }) })
const notes_en = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/notes/en" }) })
const shards_pt = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/shards/pt" }) })
const shards_en = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/shards/en" }) })
const voting_pt = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/voting/pt" }) })
const voting_en = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/voting/en" }) })

export const collections = {
  notes_pt,
  notes_en,
  shards_pt,
  shards_en,
  voting_pt,
  voting_en
}
