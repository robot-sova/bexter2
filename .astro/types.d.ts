declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
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
		"about": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".md"] };
};
"authors": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"english/john-doe.md": {
	id: "english/john-doe.md";
  slug: "english/john-doe";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"english/sam-wilson.md": {
	id: "english/sam-wilson.md";
  slug: "english/sam-wilson";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"english/william-jacob.md": {
	id: "english/william-jacob.md";
  slug: "english/william-jacob";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"french/john-doe.md": {
	id: "french/john-doe.md";
  slug: "french/john-doe";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"french/sam-wilson.md": {
	id: "french/sam-wilson.md";
  slug: "french/sam-wilson";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"french/william-jacob.md": {
	id: "french/william-jacob.md";
  slug: "french/william-jacob";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
};
"blog": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-1.md": {
	id: "english/post-1.md";
  slug: "english/post-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-2.md": {
	id: "english/post-2.md";
  slug: "english/post-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-3.md": {
	id: "english/post-3.md";
  slug: "english/post-3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-4.md": {
	id: "english/post-4.md";
  slug: "english/post-4";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-5.md": {
	id: "english/post-5.md";
  slug: "english/post-5";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-6.md": {
	id: "english/post-6.md";
  slug: "english/post-6";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-7.md": {
	id: "english/post-7.md";
  slug: "english/post-7";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-8.md": {
	id: "english/post-8.md";
  slug: "english/post-8";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-1.md": {
	id: "french/post-1.md";
  slug: "french/post-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-2.md": {
	id: "french/post-2.md";
  slug: "french/post-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-3.md": {
	id: "french/post-3.md";
  slug: "french/post-3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-4.md": {
	id: "french/post-4.md";
  slug: "french/post-4";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-5.md": {
	id: "french/post-5.md";
  slug: "french/post-5";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-6.md": {
	id: "french/post-6.md";
  slug: "french/post-6";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-7.md": {
	id: "french/post-7.md";
  slug: "french/post-7";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-8.md": {
	id: "french/post-8.md";
  slug: "french/post-8";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"callToAction": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "callToAction";
  data: any;
  render(): Render[".md"];
}>;
"contact": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "contact";
  data: InferEntrySchema<"contact">
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "contact";
  data: InferEntrySchema<"contact">
} & { render(): Render[".md"] };
};
"content": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "content";
  data: InferEntrySchema<"content">;
  render(): Render[".md"];
}>;
"homepage": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "homepage";
  data: any
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "homepage";
  data: any
} & { render(): Render[".md"] };
};
"pages": {
"english/elements.mdx": {
	id: "english/elements.mdx";
  slug: "english/elements";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
"english/privacy-policy.md": {
	id: "english/privacy-policy.md";
  slug: "english/privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"english/terms.md": {
	id: "english/terms.md";
  slug: "english/terms";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"french/elements.mdx": {
	id: "french/elements.mdx";
  slug: "french/elements";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
"french/privacy-policy.md": {
	id: "french/privacy-policy.md";
  slug: "french/privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"french/terms.md": {
	id: "french/terms.md";
  slug: "french/terms";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
};
"projects": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"english/Carpe-Diem.md": {
	id: "english/Carpe-Diem.md";
  slug: "english/carpe-diem";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"english/Celebrate-with.md": {
	id: "english/Celebrate-with.md";
  slug: "english/celebrate-with";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"english/Essential-Looks.1.md": {
	id: "english/Essential-Looks.1.md";
  slug: "english/essential-looks1";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"english/Essential-Looks.md": {
	id: "english/Essential-Looks.md";
  slug: "english/essential-looks";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"english/art-institute.1.md": {
	id: "english/art-institute.1.md";
  slug: "english/art-institute1";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"english/art-institute.md": {
	id: "english/art-institute.md";
  slug: "english/art-institute";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"french/Carpe-Diem.md": {
	id: "french/Carpe-Diem.md";
  slug: "french/carpe-diem";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"french/Celebrate-with.md": {
	id: "french/Celebrate-with.md";
  slug: "french/celebrate-with";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"french/Essential-Looks.1.md": {
	id: "french/Essential-Looks.1.md";
  slug: "french/essential-looks1";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"french/Essential-Looks.md": {
	id: "french/Essential-Looks.md";
  slug: "french/essential-looks";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"french/art-institute.1.md": {
	id: "french/art-institute.1.md";
  slug: "french/art-institute1";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"french/art-institute.md": {
	id: "french/art-institute.md";
  slug: "french/art-institute";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
};
"sections": {
"english/call-to-action.md": {
	id: "english/call-to-action.md";
  slug: "english/call-to-action";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"english/testimonial.md": {
	id: "english/testimonial.md";
  slug: "english/testimonial";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"french/call-to-action.md": {
	id: "french/call-to-action.md";
  slug: "french/call-to-action";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"french/testimonial.md": {
	id: "french/testimonial.md";
  slug: "french/testimonial";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
};
"services": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"english/Business-Consulting-copy.mdx": {
	id: "english/Business-Consulting-copy.mdx";
  slug: "english/business-consulting-copy";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".mdx"] };
"english/Business-Consulting.md": {
	id: "english/Business-Consulting.md";
  slug: "english/business-consulting";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"english/Invesment-Planning-copy.md": {
	id: "english/Invesment-Planning-copy.md";
  slug: "english/invesment-planning-copy";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"english/Invesment-Planning.md": {
	id: "english/Invesment-Planning.md";
  slug: "english/invesment-planning";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"english/market-analysis-copy.md": {
	id: "english/market-analysis-copy.md";
  slug: "english/market-analysis-copy";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"english/market-analysis.md": {
	id: "english/market-analysis.md";
  slug: "english/market-analysis";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"french/Business-Consulting-copy.mdx": {
	id: "french/Business-Consulting-copy.mdx";
  slug: "french/business-consulting-copy";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".mdx"] };
"french/Business-Consulting.md": {
	id: "french/Business-Consulting.md";
  slug: "french/business-consulting";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"french/Invesment-Planning-copy.md": {
	id: "french/Invesment-Planning-copy.md";
  slug: "french/invesment-planning-copy";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"french/Invesment-Planning.md": {
	id: "french/Invesment-Planning.md";
  slug: "french/invesment-planning";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"french/market-analysis-copy.md": {
	id: "french/market-analysis-copy.md";
  slug: "french/market-analysis-copy";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"french/market-analysis.md": {
	id: "french/market-analysis.md";
  slug: "french/market-analysis";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
};
"team": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"english/Alex-Monatinmo.md": {
	id: "english/Alex-Monatinmo.md";
  slug: "english/alex-monatinmo";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"english/Brendan-Alestico.md": {
	id: "english/Brendan-Alestico.md";
  slug: "english/brendan-alestico";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"english/Jennifer-Garner.md": {
	id: "english/Jennifer-Garner.md";
  slug: "english/jennifer-garner";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"english/Kobert-Wonkomoli.md": {
	id: "english/Kobert-Wonkomoli.md";
  slug: "english/kobert-wonkomoli";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"english/Mollie-Ross.md": {
	id: "english/Mollie-Ross.md";
  slug: "english/mollie-ross";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"english/Monica-Helleona.md": {
	id: "english/Monica-Helleona.md";
  slug: "english/monica-helleona";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"french/Alex-Monatinmo.md": {
	id: "french/Alex-Monatinmo.md";
  slug: "french/alex-monatinmo";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"french/Brendan-Alestico.md": {
	id: "french/Brendan-Alestico.md";
  slug: "french/brendan-alestico";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"french/Jennifer-Garner.md": {
	id: "french/Jennifer-Garner.md";
  slug: "french/jennifer-garner";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"french/Kobert-Wonkomoli.md": {
	id: "french/Kobert-Wonkomoli.md";
  slug: "french/kobert-wonkomoli";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"french/Mollie-Ross.md": {
	id: "french/Mollie-Ross.md";
  slug: "french/mollie-ross";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"french/Monica-Helleona.md": {
	id: "french/Monica-Helleona.md";
  slug: "french/monica-helleona";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
};
"testimonials": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "testimonials";
  data: any;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
