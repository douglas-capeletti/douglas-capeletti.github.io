export interface IPage {
  data: any[];
  start: number;
  end: number;
  size: number;
  total: number;
  currentPage: number;
  lastPage: number;
  url: IPageURL;
}

export interface IPageURL {
  current: string;
  prev: string | undefined;
  next: string | undefined;
}

export interface IPost {
  url: string;
  frontmatter: {
    title: string;
    pubDate: string;
    slug: string;
    hero: string;
    tags: string[];
    layout: string;
  }
}
