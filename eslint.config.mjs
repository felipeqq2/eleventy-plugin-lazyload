import eslintConfigPrettier from 'eslint-config-prettier'

import js from '@eslint/js'

export default [
	{
		files: ['**/*.js'],
		languageOptions: { sourceType: 'commonjs', ecmaVersion: 2021 },
	},
	js.configs.recommended,
	eslintConfigPrettier,
]
