import type { AnyEntryMap, InferEntrySchema, RenderedContent } from "astro:content"

export interface IEntry<T extends keyof AnyEntryMap> {
  id: string;
  body?: string;
  collection: string;
  data: InferEntrySchema<T>;
  rendered?: RenderedContent;
  filePath?: string;

}

export interface IPost {
  title: string;
  description?: string;
  pubDate?: Date;
  hero?: string;
  tags?: string[];
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

