import globals from "globals"
import tseslint from "typescript-eslint"
import stylistic from '@stylistic/eslint-plugin'


export default [
  { ignores: ["dist/*", ".astro/", "postcss.config.cjs", "src/env.d.ts"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.browser } },
  { plugins: { '@stylistic': stylistic } },
  {
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ["error", "never"],
    }
  },
  ...tseslint.configs.recommended,
]