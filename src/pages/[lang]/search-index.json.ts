import type { APIRoute } from 'astro'
import { getCollection, type AnyEntryMap } from "astro:content"
import { CollectionsEnum, LANG, SITE_LANGUAGE_PARAMS } from "../../utils/constants"
import type { IEntry, IEntryKey } from "../../utils/types"

export function getStaticPaths() {
  return SITE_LANGUAGE_PARAMS
}

async function getPosts(lang: string) {
  const notes = await getCollection(`${CollectionsEnum.NOTES}_${lang}` as IEntryKey)
  const shards = await getCollection(`${CollectionsEnum.SHARDS}_${lang}` as IEntryKey)
  return [...mapPosts(notes, CollectionsEnum.NOTES, lang), ...mapPosts(shards, CollectionsEnum.SHARDS, lang)]
}

function mapPosts<T extends IEntry<keyof AnyEntryMap>>(posts: T[], collectionName: string, lang: string) {
  if (!posts) return []
  
  return posts
    .sort((a: T, b: T) => (a.data.pubDate?.valueOf() ?? 0) - (b.data.pubDate?.valueOf() ?? 0))
    .map((post: T) => ({
      collection: collectionName,
      urn: `/${lang}/${collectionName}/${post.id}`,
      title: post.data.title,
      description: post.data.description,
      date: post.data.pubDate,
      tags: post.data.tags,
      body: post.body
    }))
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang ?? LANG.defaultOption
  return new Response(JSON.stringify(await getPosts(lang)), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
