import type { Lang, TranslationKey } from "../i18n/translations"
import type { IToggle } from "./types"

export const SITE_URL = "https://thecodecodex.com"
export const SITE_URI = "TheCodeCodex.com"
export const SITE_NAME = "The Code Codex"
export const PAGE_SIZE = 21

export const LANGS: Lang[] = ["pt", "en"]

export function siteLangParams() {
  return [
    { params: { lang: "pt" } },
    { params: { lang: "en" } }
  ]
}

export const SITE_PAGES: { title: TranslationKey, path: string }[] = [
  { title: "pages.guides", path: "guides" },
  { title: "pages.notes", path: "notes" },
  { title: "pages.projects", path: "projects" },
  { title: "pages.about", path: "about" },
]

export const SITE_PROJECTS: { title: TranslationKey, path: string }[] = [
  { title: "projects.voting", path: "voting" },
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
  GUIDES = "guides",
  NOTES = "notes",
  VOTING = "voting"
}

export const ActiveProjects = [CollectionsEnum.VOTING]
