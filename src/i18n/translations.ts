export const defaultLang = 'pt'

export const languages = {
  pt: 'Português',
  en: 'English',
}

export const ui = {
  pt: {
    'pages.home': 'Página inicial',
    'home.title': 'Meus códigos e anotações como engenheiro de software.',
    'pages.notes': 'Anotações',
    'notes.title': 'Minhas anotações sobre diversos tópicos de engenharia de software.',
    'pages.shards': 'Fragmentos',
    'shards.title': 'Meus pequenos trechos de código e anotações rápidas.',
    'pages.projects': 'Projetos',
    'projects.title': 'Meus projetos e anotações.',
    'pages.about': 'Sobre',
    "search.title": "Pesquisar",
    "search.sub-title": "Pesquise por qualquer anotação ou fragmento",
    "search.tip": "Dica: use '#' para pesquisar por tag (ex. #docker)",
    'not-found.title': '',
    'not-found.header.title': '',
    'not-found.header.sub-title': '',
    'ui.back-to-page.message': 'Voltar para',
    'ui.previous': 'Anterior',
    'ui.next': 'Próxima',
    'ui.draft': 'Rascunho✏️',
    'ui.change-theme': 'Mudar tema',
    'ui.change-lang': 'Mudar idioma',
  },
  en: {
    'pages.home': 'Home Page',
    "home.title": "My codes and notes as a software engineer.",
    "pages.notes": "Notes",
    "notes.title": "My notes on various software engineering topics.",
    "pages.shards": "Shards",
    "shards.title": "My small code snippets and quick notes.",
    "pages.projects": "Projects",
    "projects.title": "My projects and notes.",
    "pages.about": "About",
    "search.title": "Search",
    "search.sub-title": "Search for any Note or Shard",
    "search.tip": "TIP: use '#' to search by tag (e.g. #docker)",
    'not-found.title': 'Page not found',
    'not-found.header.title': "Oops, I think you're lost",
    'not-found.header.sub-title': 'Not much to see here...',
    'ui.back-to-page.message': 'Back to',
    'ui.previous': 'Previous',
    'ui.next': 'Next',
    'ui.draft': 'Draft✏️',
    'ui.change-theme': 'Change theme',
    'ui.change-lang': 'Change language',
  },
} as const

export type Lang = keyof typeof languages
export type TranslationKey = keyof typeof ui[typeof defaultLang]

export function useTranslations(lang: Lang) {
  return function strings(key: TranslationKey) {
    return ui[lang][key] || ui[defaultLang][key] || key
  }
}
