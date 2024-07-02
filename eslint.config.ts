import antfu from '@antfu/eslint-config'

export default antfu({
	astro: true,
	markdown: false,
	typescript: true,
	ignores: [
		'.githooks/**',
	],
	stylistic: {
		indent: 'tab',
	},
	overrides: {
		jsonc: {
			'jsonc/indent': ['error', 2],
		},
	},
	rules: {
		'pnpm/yaml-enforce-settings': 'off',
		'antfu/consistent-chaining': 'off',
		'antfu/no-top-level-await': 'off',
		'import/order': 'off',
		'no-console': 'off',
		'no-unused-vars': 'off',
		'perfectionist/sort-imports': 'off',
		'perfectionist/sort-exports': ['error', { groupKind: 'types-first' }],
		'ts/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'unicorn/consistent-function-scoping': 'off',
		'style/operator-linebreak': 'off',
		'style/jsx-tag-spacing': 'off',
	},
}).renamePlugins({
	ts: '@typescript-eslint',
	yaml: 'yml',
	node: 'n',
})
