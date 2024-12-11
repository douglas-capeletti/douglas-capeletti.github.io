import { z, defineCollection } from "astro:content"
import { glob } from 'astro/loaders'

const schema = z.object({
  title: z.string(),
  description: z.string().optional(), // optional description to be shown on search result
  pubDate: z.coerce.date().optional(),
  hero: z.string().optional(),
  tags: z.array(z.string()).optional(),
  video: z.string().optional()
})

const notes = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }) })
const shards = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/shards" }) })
const voting = defineCollection({ schema, loader: glob({ pattern: "**/*.md", base: "./src/content/voting" }) })

export const collections = { notes, shards, voting }