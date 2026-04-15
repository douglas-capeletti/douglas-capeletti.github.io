import type { TranslationKey } from "../i18n/translations"
import type { IToggle } from "./types"

export const SITE_URL = "https://developingnotes.com"
export const SITE_URI = "DevelopingNotes.com"
export const SITE_NAME = "Developing Notes"
export const PAGE_SIZE = 21

export const SITE_LANGUAGE_PARAMS = [
  { params: { lang: "pt" } },
  { params: { lang: "en" } }
]

export const SITE_PAGES: { name: TranslationKey, path: string }[] = [
  { name: "pages.notes", path: "notes" },
  { name: "pages.shards", path: "shards" },
  { name: "pages.projects", path: "projects" },
  { name: "pages.about", path: "about" },
]

export const THEME: IToggle = {
  id: 'theme',
  defaultOption: 'dark',
  alternativeOption: 'light'
}

export const LANG: IToggle = {
  id: 'lang',
  defaultOption: 'pt',
  alternativeOption: 'en'
}

export enum CollectionsEnum {
  NOTES = "notes",
  SHARDS = "shards",
  VOTING = "voting"
}

export const ActiveProjects = [CollectionsEnum.VOTING]
