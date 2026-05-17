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
  { title: "pages.tools", path: "tools" },
  { title: "pages.projects", path: "projects" },
  { title: "pages.about", path: "about" },
]

export const SITE_PROJECTS: { title: TranslationKey, path: string }[] = [
  { title: "projects.voting", path: "voting" },
]

export const SITE_TOOLS: { title: TranslationKey, path: string }[] = [
  { title: "tools.compensation_comparator", path: "compensation-comparator" },
]

export const THEME: IToggle = {
  id: 'theme',
  defaultOption: 'dark',
  alternativeOption: 'light',
}

export const LANG: IToggle = {
  id: 'lang',
  defaultOption: 'pt',
  alternativeOption: 'en',
}

export enum CollectionsEnum {
  GUIDES = "guides",
  NOTES = "notes",
  ABOUT = "about",
  VOTING = "voting",
}

export const Collections = {
  [CollectionsEnum.GUIDES]: {
    name: CollectionsEnum.GUIDES,
    config: {}
  },
  [CollectionsEnum.NOTES]: {
    name: CollectionsEnum.NOTES,
    config: {}
  },
  [CollectionsEnum.ABOUT]: {
    name: CollectionsEnum.ABOUT,
    config: { wideCards: true, printSuggestion: true }
  },
  [CollectionsEnum.VOTING]: {
    name: CollectionsEnum.VOTING,
    config: {}
  }
}

export interface ICollection {
  name: CollectionsEnum,
  config: {
    wideCards?: boolean,
    printSuggestion?: boolean,
  },
}

export interface SiteContentItem {
  category: string;
  collections: CollectionsEnum[];
}

export const ActiveProjects = [Collections[CollectionsEnum.VOTING]]
