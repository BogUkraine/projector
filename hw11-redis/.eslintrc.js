module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		quotes: ['error', 'single'],
		'max-len': ['error', { code: 120, tabWidth: 4, ignoreComments: true }],
	},
}
