declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"notes": {
"golang-tips.md": {
	id: "golang-tips.md";
  slug: "golang-tips";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"golang.md": {
	id: "golang.md";
  slug: "golang";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"how-docker-works.md": {
	id: "how-docker-works.md";
  slug: "how-docker-works";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"how-use-docker.md": {
	id: "how-use-docker.md";
  slug: "how-use-docker";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"setup-linux-wsl.md": {
	id: "setup-linux-wsl.md";
  slug: "setup-linux-wsl";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"software-architecture-fundamentals.md": {
	id: "software-architecture-fundamentals.md";
  slug: "software-architecture-fundamentals";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
};
"posts": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">;
  render(): Render[".md"];
}>;
"shards": {
"bitwise-operation.md": {
	id: "bitwise-operation.md";
  slug: "bitwise-operation";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"c4-diagrams.md": {
	id: "c4-diagrams.md";
  slug: "c4-diagrams";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"concurrency-is-not-parallelism.md": {
	id: "concurrency-is-not-parallelism.md";
  slug: "concurrency-is-not-parallelism";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"conways-law.md": {
	id: "conways-law.md";
  slug: "conways-law";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"data-types.md": {
	id: "data-types.md";
  slug: "data-types";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"function-or-method.md": {
	id: "function-or-method.md";
  slug: "function-or-method";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"interfaces.md": {
	id: "interfaces.md";
  slug: "interfaces";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"paradigms.md": {
	id: "paradigms.md";
  slug: "paradigms";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"pointers.md": {
	id: "pointers.md";
  slug: "pointers";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"strings.md": {
	id: "strings.md";
  slug: "strings";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"twelve-factors.md": {
	id: "twelve-factors.md";
  slug: "twelve-factors";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
"variables.md": {
	id: "variables.md";
  slug: "variables";
  body: string;
  collection: "shards";
  data: any
} & { render(): Render[".md"] };
};
"voting": {
"01-site.md": {
	id: "01-site.md";
  slug: "01-site";
  body: string;
  collection: "voting";
  data: any
} & { render(): Render[".md"] };
"02-mobile.md": {
	id: "02-mobile.md";
  slug: "02-mobile";
  body: string;
  collection: "voting";
  data: any
} & { render(): Render[".md"] };
"03-version1.md": {
	id: "03-version1.md";
  slug: "03-version1";
  body: string;
  collection: "voting";
  data: any
} & { render(): Render[".md"] };
"04-version2.md": {
	id: "04-version2.md";
  slug: "04-version2";
  body: string;
  collection: "voting";
  data: any
} & { render(): Render[".md"] };
"05-version3.md": {
	id: "05-version3.md";
  slug: "05-version3";
  body: string;
  collection: "voting";
  data: any
} & { render(): Render[".md"] };
"06-tools.md": {
	id: "06-tools.md";
  slug: "06-tools";
  body: string;
  collection: "voting";
  data: any
} & { render(): Render[".md"] };
"about.md": {
	id: "about.md";
  slug: "about";
  body: string;
  collection: "voting";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
