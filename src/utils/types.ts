import type { CollectionEntry, DataEntryMap, InferEntrySchema, RenderedContent } from "astro:content"

export type IEntryKey = keyof DataEntryMap
export type IEntryCollection = CollectionEntry<IEntryKey>

export interface IEntry {
  id: string;
  body?: string;
  collection: string;
  data: InferEntrySchema<IEntryKey>;
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
  title: string;
  description?: string;
  pubDate?: Date;
  hero?: string;
  tag?: string;
  url: string;
  blank?: boolean;
}

export interface IPaginator {
  prev?: string;
  next?: string;
}

export interface IToggle {
  id: string;
  defaultOption: string;
  alternativeOption: string;
}
