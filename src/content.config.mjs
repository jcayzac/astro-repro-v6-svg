import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

function article({ image }) {
	return z.object({
		title: z.string(),
		hero: image(),
	})
}

export const collections = {
	articles: defineCollection({
		schema: article,
		loader: glob({
			pattern: '[^_]*.yaml',
			base: `./content/articles`,
		}),
	}),
}
