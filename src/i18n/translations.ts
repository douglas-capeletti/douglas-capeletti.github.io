export const defaultLang = 'pt'

export const languages = {
  pt: 'Português',
  en: 'English',
}

export const ui = {
  pt: {
    // Home
    'pages.home': 'Página inicial',
    'home.title': 'Meu bloco de notas compartilhado como engenheiro de software',
    // Guides
    'pages.guides': 'Guias',
    'guides.title': 'Guias sobre alguns tópicos relevantes.',
    // Notes
    'pages.notes': 'Notas',
    'notes.title': 'Pequenos trechos de código e anotações menores.',
    // Projects
    'pages.projects': 'Projetos',
    'projects.title': 'Minha coleção de projetos pessoais (inacabados).',
    'projects.voting': 'Votação',
    // About
    'pages.about': 'Sobre',
    'about.title': 'Sobre mim e este site.',
    // Search
    "pages.search": "Pesquisar",
    "search.title": "Pesquise por qualquer guia ou nota",
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
    'home.title': 'My shared notepad as a software engineer',
    // Guides
    'pages.guides': 'Guides',
    'guides.title': 'Guides on some relevant topics.',
    // Notes
    'pages.notes': 'Notes',
    'notes.title': 'Small code snippets and minor notes.',
    // Projects
    'pages.projects': 'Projects',
    'projects.title': 'My collection of personal (unfinished) projects.',
    'projects.voting': 'Voting',
    // About
    'pages.about': 'About',
    'about.title': 'About me and this website.',
    // Search
    'pages.search': 'Search',
    'search.title': 'Search for any guide or note',
    'search.tip': "TIP: use '#' to search by tag (e.g. #docker)",
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
