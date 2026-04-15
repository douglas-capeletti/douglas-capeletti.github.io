import { getCollection } from "astro:content"
import { languages, type Lang } from "../i18n/translations"
import type { CollectionsEnum } from "./constants"
import type { IEntryKey } from "./types"

export async function getLocalizedCollection<T>(
  collections: (CollectionsEnum | string)[],
  mapFn: (collection: string, lang: Lang, entries: any[]) => T | T[]
): Promise<T[]> {
  const langs = Object.keys(languages) as Lang[]
  const results = await Promise.all(
    collections.flatMap((collection) => langs.map(async (lang) => {
      const collectionLang = `${collection}_${lang}` as IEntryKey
      const entries = await getCollection(collectionLang)
      return mapFn(collection as string, lang, entries)
    }))
  )
  return results.flat() as T[]
}
