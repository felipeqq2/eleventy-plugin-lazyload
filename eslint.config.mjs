import eslintConfigPrettier from 'eslint-config-prettier'
import ava from 'eslint-plugin-ava'

import js from '@eslint/js'

export default [
	{
		files: ['**/*.js'],
		languageOptions: { sourceType: 'commonjs', ecmaVersion: 2021 },
		plugins: { ava },
		rules: ava.configs['flat/recommended'].rules,
	},
	js.configs.recommended,
	eslintConfigPrettier,
]
