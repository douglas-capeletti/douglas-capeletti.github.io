import { z, defineCollection } from "astro:content"

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date().nullable(),
    description: z.string().nullable(),
    hero: z.string().nullable(),
    tags: z.array(z.string()),
    video: z.string().nullable()
  })
})
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
}