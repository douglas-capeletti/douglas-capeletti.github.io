import { getCollection } from "astro:content"
import type { IPost } from "../../utils/types"

async function getPosts() {
  const notes = await getCollection("notes")
  const shards = await getCollection("shards")
  return [...mapPosts(notes, "notes"), ...mapPosts(shards, "shards")]
}

function mapPosts<T extends IPost>(posts: T[], type: string) {
  return posts
    .sort((a: T, b: T) => (a.data.pubDate?.valueOf() ?? 0) - (b.data.pubDate?.valueOf() ?? 0))
    .map((post: T) => ({
      slug: `${type}/${post.slug}`,
      title: post.data.title,
      description: post.data.description,
      date: post.data.pubDate,
      tags: post.data.tags,
      body: post.body
    }))
}

export async function GET({ }) {
  return new Response(JSON.stringify(await getPosts()), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
