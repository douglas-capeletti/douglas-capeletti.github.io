import { getCollection } from "astro:content"
import { languages, type Lang } from "../i18n/translations"
import type { CollectionsEnum } from "./constants"
import type { IEntryCollection, IEntryKey } from "./types"

export async function getLocalizedCollection<T>(
  collections: CollectionsEnum[],
  mapFn: (collection: CollectionsEnum, lang: Lang, entries: IEntryCollection[]) => T | T[]
): Promise<T[]> {
  const langs = Object.keys(languages) as Lang[]
  const results = await Promise.all(
    collections.flatMap((collection) => langs.map(async (lang) => {
      const collectionLang = getCollectionName(collection, lang)
      const entries = await getCollection(collectionLang)
      return mapFn(collection, lang, entries)
    }))
  )
  return results.flat() as T[]
}

export function getCollectionName(collection: CollectionsEnum, lang: Lang) {
  return `${collection}_${lang}` as IEntryKey
}


export function formatDate(date: string | number | Date): string {
  return date ? new Date(date).toLocaleDateString('pt-BR') : '--/--/----'
}
