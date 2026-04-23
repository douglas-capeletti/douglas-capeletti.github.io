export const defaultLang = 'pt'

export const languages = {
  pt: 'Português',
  en: 'English',
}

export const ui = {
  pt: {
    // Home
    'pages.home': 'Página inicial',
    'home.title': 'Meus códigos e anotações como engenheiro de software.',
    // Guides
    'pages.guides': 'Guias',
    'guides.title': 'Meus guias sobre diversos tópicos de engenharia de software.',
    // Notes
    'pages.notes': 'Notas',
    'notes.title': 'Meus pequenos trechos de código e anotações rápidas.',
    // Projects
    'pages.projects': 'Projetos',
    'projects.title': 'Meus projetos e anotações.',
    'projects.voting': 'Votação',
    // About
    'pages.about': 'Sobre',
    // Search
    "pages.search": "Pesquisar",
    "search.title": "Pesquise por qualquer anotação ou fragmento",
    "search.tip": "Dica: use '#' para pesquisar por tag (ex. #docker)",
    // Not Found
    'pages.not-found': 'Página não encontrada',
    'not-found.title': 'Oops, acho que você se perdeu',
    'not-found.sub-title': 'Não há muito para ver aqui...',
    // UI
    'ui.back-to-page.message': 'Voltar para',
    'ui.previous': 'Anterior',
    'ui.next': 'Próxima',
    'ui.draft': 'Rascunho✏️',
    'ui.change-theme': 'Mudar tema',
    'ui.change-lang': 'Mudar idioma',
  },
  en: {
    // Home
    'pages.home': 'Home Page',
    "home.title": "My codes and notes as a software engineer.",
    // Guides
    "pages.guides": "Guides",
    "guides.title": "My guides on various software engineering topics.",
    // Notes
    "pages.notes": "Notes",
    "notes.title": "My notes on various software engineering topics.",
    // Projects
    "pages.projects": "Projects",
    "projects.title": "My projects and notes.",
    "projects.voting": "Voting",
    // About
    "pages.about": "About",
    // Search
    "pages.search": "Search",
    "search.title": "Search for any Note or Shard",
    "search.tip": "TIP: use '#' to search by tag (e.g. #docker)",
    // Not Found
    'pages.not-found': 'Page not found',
    'not-found.title': "Oops, I think you're lost",
    'not-found.sub-title': 'Not much to see here...',
    // UI
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
