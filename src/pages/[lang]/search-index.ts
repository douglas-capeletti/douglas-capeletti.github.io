import type { APIRoute } from 'astro'
import { getCollection } from "astro:content"
import type { Lang } from '../../i18n/translations'
import { getCollectionName } from '../../utils'
import { CollectionsEnum, LANG, siteLangParams } from "../../utils/constants"
import type { IEntry } from "../../utils/types"

export function getStaticPaths() {
  return siteLangParams()
}

async function getPosts(lang: Lang) {
  const notes = await getCollection(getCollectionName(CollectionsEnum.GUIDES, lang))
  const shards = await getCollection(getCollectionName(CollectionsEnum.NOTES, lang))
  return [...mapPosts(notes, CollectionsEnum.GUIDES, lang), ...mapPosts(shards, CollectionsEnum.NOTES, lang)]
}

function mapPosts<T extends IEntry>(posts: T[], collectionName: string, lang: Lang) {
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
  const lang = (params.lang ?? LANG.defaultOption) as Lang
  return new Response(JSON.stringify(await getPosts(lang)), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
