import { IPage } from "./types";

export function formatDate(date: string | number | Date): string {
  return date ? new Date(date).toLocaleDateString('pt-BR') : '--/--/----'
}

export function newIPageMock(data: any[]): IPage {
  return {
    data: data.map((item) => ({
      frontmatter: {
        hero: item.hero,
        title: item.title,
        pubDate: item.pubDate,
      },
      url: item.url
    })),
    start: 1,
    end: 1,
    size: data.length,
    total: 1,
    currentPage: 1,
    lastPage: 1,
    url: {
      current: data[0].url,
      prev: undefined,
      next: undefined,
    },
  }
}
