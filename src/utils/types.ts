export interface IPost {
  collection: string,
  slug: string,
  data: IPostData
}

export interface IPostData {
  title: string;
  description?: string;
  pubDate?: Date;
  hero?: string;
  tags: string[];
}

export interface ICard {
  tag: string | undefined;
  hero: string | undefined;
  title: string;
  description: string | undefined;
  pubDate: Date | undefined;
  url: string;
  blank: boolean | undefined;
}
