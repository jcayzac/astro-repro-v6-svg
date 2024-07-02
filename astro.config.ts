import { defineConfig } from 'astro/config'

// integrations
import mdx from '@astrojs/mdx'

export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx()],
	markdown: {
		// I style code using an MDX component, so disabling it here.
		syntaxHighlight: false,

		// Fuck smartypants
		smartypants: false,
	},
	image: {
		domains: [
			'img.youtube.com',
			'placehold.co',
		],
	},
	vite: {
		build: {
			target: ['esnext', 'chrome127', 'firefox129', 'safari18'],
			cssTarget: ['chrome127'],
		},
		worker: {
			format: 'es',
		},
	},
	scopedStyleStrategy: 'where',
	build: {
		format: 'file',
		assets: 'immutable',
	},
	trailingSlash: 'never',
	// Generate an error if two routes generate the same path
	prerenderConflictBehavior: 'error',
	experimental: {
		contentIntellisense: true,
	},
})
