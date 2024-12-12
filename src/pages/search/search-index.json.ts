import { getCollection, type AnyEntryMap } from "astro:content"
import type { IEntry } from "../../utils/types"

async function getPosts() {
  const notes = await getCollection("notes")
  const shards = await getCollection("shards")
  return [...mapPosts(notes), ...mapPosts(shards)]
}

function mapPosts<T extends IEntry<keyof AnyEntryMap>>(posts: T[]) {
  return posts
    .sort((a: T, b: T) => (a.data.pubDate?.valueOf() ?? 0) - (b.data.pubDate?.valueOf() ?? 0))
    .map((post: T) => ({
      collection: post.collection,
      urn: `/${post.collection}/${post.id}`,
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
