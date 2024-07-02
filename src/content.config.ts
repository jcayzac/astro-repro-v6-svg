import type { SchemaContext } from 'astro:content'
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

function article({ image }: SchemaContext) {
	return z.object({
		title: z.string(),
		hero: z.object({
			image: image(),
		}),
	})
}

export const collections = {
	articles: defineCollection({
		schema: article,
		loader: glob({
			pattern: '**/[^_]*.{md,mdx}',
			base: `./content/articles`,
		}),
	}),
}
