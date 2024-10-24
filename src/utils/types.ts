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
  video?: string;
}

export interface ICard {
  tag?: string;
  hero?: string;
  title: string;
  description?: string;
  pubDate?: Date;
  url: string;
  blank?: boolean;
}

export interface IPaginator {
  prev?: string;
  next?: string;
}
