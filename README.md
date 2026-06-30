# Configs for various tools and packages

[![npm](https://img.shields.io/npm/v/%40falcondev-oss/configs)](https://npmjs.com/package/@falcondev-oss/configs)

## Cool people and projects

- [antfu's eslint config](https://github.com/antfu/eslint-config)
- [DrJume](https://github.com/DrJume)

## Install

```bash
pnpm i -D prettier eslint lint-staged @commitlint/cli @falcondev-oss/configs
```

## Config

### ESLint

**`eslint.config.js`:**

```js
// @ts-check
import eslintConfig from '@falcondev-oss/configs/eslint'

export default eslintConfig({
  nuxt: true,
  tsconfigPath: './tsconfig.json',
}).append({
  ignores: [],
})
```

#### `eslint-plugin-compat` Target Browsers

Browser targets are configured using [browserslist](https://github.com/browserslist/browserslist). You can configure browser targets in your `package.json`:

##### `package.json`

```jsonc
{
  // ...
  "browserslist": [
    "> 0.5% in DE, last 3 versions, Firefox ESR, not dead and fully supports es6-module",
    "maintained node versions",
  ],
}
```

If no configuration is found, browserslist [defaults to](https://github.com/browserslist/browserslist#queries) `"> 0.5%, last 2 versions, Firefox ESR, not dead"`.

See [browserslist/browserslist](https://github.com/browserslist/browserslist) for more details.

### Prettier

**`prettier.config.js`:**

```js
export { default } from '@falcondev-oss/configs/prettier'
```

### commitlint

**`commitlint.config.js`:**

```js
export default {
  extends: ['@falcondev-oss/configs/commitlint'],
}
```

### VSCode settings

**`.vscode/settings.json`:**

```json
{
  "prettier.enable": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "dockercompose"
  ]
}
```

### lint-staged

**`lint-staged.config.js`:**

```js
const NO_COLOR = process.env.VSCODE_GIT_COMMAND ? ' --no-color' : ''

// eslint-disable-next-line no-console, unicorn/no-top-level-side-effects
console.log('[lint-staged]')

export function lintstagedConfig() {
  return {
    '*': [
      'eslint --cache --cache-location node_modules/.cache/eslint/ --cache-strategy content --no-warn-ignored --fix',
      'prettier --cache --cache-strategy content --log-level warn --ignore-unknown --no-error-on-unmatched-pattern --write',
    ],
    '**': () => `pnpm${NO_COLOR} type-check`,
  }
}

export default lintstagedConfig()
```

### Ignore files

**`.prettierignore`:**

```ignore
dist/
.nuxt/
.output/
.temp/

pnpm-lock.yaml
```

### Package scripts

**`package.json`:**

```json
{
  "scripts": {
    "prepare": "[ -z \"$CI\" ] && husky || true",
    "eslint:cmd": "_ () { cd \"$1\" && eslint --cache --cache-location node_modules/.cache/eslint/ --cache-strategy content  $(shift; echo \"$@\") . ; }; _",
    "prettier:cmd": "_ () { cd \"$1\" && prettier --cache --cache-strategy content --log-level warn  $(shift; echo \"$@\") . ; }; _",
    "prettier:cmd:root": "_ () { pnpm prettier:cmd \"$1\" --ignore-path=.gitignore --ignore-path=.prettierignore --ignore-path=.prettierignore.root  $(shift; echo \"$@\") ; }; _",
    "lint:root": "pnpm eslint:cmd \"$PWD\" && pnpm prettier:cmd:root \"$PWD\" --check",
    "lint:fix:root": "pnpm eslint:cmd \"$PWD\" --fix && pnpm prettier:cmd:root \"$PWD\" --write"
  }
}
```

**Inside a package:**

```json
{
  "scripts": {
    "lint": "pnpm -w eslint:cmd \"$PWD\" && pnpm -w prettier:cmd \"$PWD\" --check",
    "lint:fix": "pnpm -w eslint:cmd \"$PWD\" --fix && pnpm -w prettier:cmd \"$PWD\" --write"
  }
}
```
