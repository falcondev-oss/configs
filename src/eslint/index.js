// @ts-check
import antfu, { GLOB_MARKDOWN, GLOB_SRC, GLOB_TSX } from '@antfu/eslint-config'
// @ts-ignore
import shopifyEslintPlugin from '@shopify/eslint-plugin'
// @ts-ignore
import eslintConfigPrettier from 'eslint-config-prettier'
// @ts-ignore
import eslintPluginCompat from 'eslint-plugin-compat'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import { loadPackageJSON } from 'local-pkg'

import expoRules from './expo.js'
import github from './github.js'
import nuxtRules from './nuxt.js'

// eslint-disable-next-line unicorn/no-top-level-side-effects
delete eslintConfigPrettier.rules['vue/html-self-closing']

/** @type {import('./index.js').eslintConfig} */
export function eslintConfig({ nuxt = false, tsconfigPath, expo = false }) {
  return antfu({
    stylistic: false,

    typescript: {
      tsconfigPath,
    },

    react: expo,

    vue: {
      sfcBlocks: {
        blocks: {
          styles: false,
        },
      },
      overrides: {
        // force <script lang="ts">
        'vue/block-lang': ['error', { script: { lang: ['ts', 'tsx'] } }],
        // force @click="handler()"
        'vue/v-on-handler-style': ['error', 'inline-function'],

        'vue/html-self-closing': [
          'warn',
          {
            html: { void: 'always', normal: 'always', component: 'always' },
            svg: 'always',
            math: 'always',
          },
        ],
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/require-typed-ref': 'error',
        'vue/require-macro-variable-name': 'error',
        'vue/require-explicit-slots': 'error',
        'vue/no-root-v-if': 'warn',
        'vue/no-ref-object-reactivity-loss': 'warn',
        'vue/no-duplicate-attr-inheritance': 'error',
        'vue/define-emits-declaration': ['error', 'type-literal'],
        'vue/define-props-declaration': ['error', 'type-based'],
      },
    },
  })
    .prepend(github)
    .append(nuxt ? nuxtRules : [])
    .override('antfu/unicorn/setup', (config) => {
      delete config.plugins
      return config
    })
    .insertBefore('antfu/unicorn/rules', {
      ...eslintPluginUnicorn.configs.recommended,
      files: [GLOB_SRC],
    })
    .append([
      {
        name: 'falcondev/unicorn/rules',
        files: [GLOB_SRC],
        rules: {
          'unicorn/filename-case': 'off',
          'unicorn/prevent-abbreviations': 'off',
          'unicorn/no-null': 'off',
          'unicorn/no-array-callback-reference': 'off',
          'unicorn/prefer-ternary': 'off',
          'unicorn/catch-error-name': ['error', { name: 'err' }],
          'unicorn/no-abusive-eslint-disable': 'off',
          'unicorn/no-useless-undefined': [
            'error',
            { checkArrowFunctionBody: false, checkArguments: false },
          ],
          'unicorn/prefer-global-this': 'off',
          'unicorn/prefer-math-min-max': 'off',
          'unicorn/require-module-specifiers': 'off',
          'unicorn/prefer-dom-node-dataset': 'off',
          'unicorn/name-replacements': 'off',
          'unicorn/max-nested-calls': 'off',
          'unicorn/prefer-uint8array-base64': 'off', // Node.js 26+ is needed (es2025)
          'unicorn/prefer-iterator-to-array': 'off', // es2025
          'unicorn/consistent-boolean-name': 'off',
          'unicorn/prefer-await': 'off',
          'unicorn/no-top-level-side-effects': 'off',
          'unicorn/no-top-level-assignment-in-function': 'warn',
          'unicorn/no-break-in-nested-loop': 'off',
          'unicorn/consistent-compound-words': 'off',
          'unicorn/no-non-function-verb-prefix': 'off',
          'unicorn/no-computed-property-existence-check': 'off', // should only check when key is unknown `string`
        },
      },
    ])
    .append({
      name: 'falcondev/rules',
      rules: {
        'no-shadow': 'off',

        'no-console': ['warn', { allow: ['warn', 'error', 'debug', 'trace'] }],

        'node/prefer-global/process': 'off',

        'yaml/no-empty-mapping-value': 'off',
        'yaml/quotes': 'off',

        'ts/consistent-type-definitions': 'off',
        'ts/strict-boolean-expressions': 'off',

        'jsonc/indent': 'off',

        'antfu/top-level-function': 'error',
        'antfu/no-top-level-await': 'off',
        'pnpm/json-enforce-catalog': 'off',
        'pnpm/yaml-enforce-settings': 'off',

        'yoda': ['error', 'never', { exceptRange: true }],
        'no-sequences': 'off',

        'test/consistent-test-it': ['error', { fn: 'test' }],
      },
    })
    .append({
      name: 'falcondev/tsx/rules',
      files: [GLOB_TSX],
      rules: {
        'ts/promise-function-async': 'off',
      },
    })
    .append({
      name: 'falcondev/markdown/rules',
      files: [GLOB_MARKDOWN],
      rules: {
        'markdown/heading-increment': 'off',
      },
    })
    .append({
      name: 'falcondev/shopify',
      plugins: { '@shopify': shopifyEslintPlugin },
      rules: {
        '@shopify/prefer-early-return': 'error',
        '@shopify/typescript-prefer-pascal-case-enums': 'error',
        '@shopify/typescript-prefer-singular-enums': 'error',
      },
    })
    .append(
      {
        name: 'falcondev/cjs',
        files: ['*.cjs', '*.cts'],
        rules: { 'import/no-commonjs': 'off' },
      },
      {
        name: 'falcondev/yaml',
        files: ['docker-compose.yml', 'docker-compose.*.yml'],
        rules: { 'yaml/no-empty-mapping-value': 'off' },
      },
    )
    .append({
      name: 'falcondev/react-native',
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'react-native',
                importNames: ['SafeAreaView'],
                message: 'Please use `react-native-safe-area-context` instead.',
              },
              {
                name: 'react-native-safe-area-context',
                importNames: ['SafeAreaView'],
                message:
                  'Please use `useSafeAreaInsets` instead. See https://github.com/react-navigation/react-navigation/issues/11285',
              },
              {
                name: 'react-native',
                importNames: ['KeyboardAvoidingView'],
                message: 'Please use `react-native-keyboard-controller` instead.',
              },
            ],
          },
        ],
      },
    })
    .append(
      (async () => {
        const packageJSON = await loadPackageJSON()
        if (!packageJSON || !('browserslist' in packageJSON)) return

        return eslintPluginCompat.configs['flat/recommended']
      })(),
    )
    .append({
      name: 'prettier/disables',
      ...eslintConfigPrettier,
    })
    .append(expo ? expoRules : [])
    .append({
      ignores: ['node_modules/', 'dist/', '.nuxt/', '.output/', '.types/', 'pnpm-lock.yaml'],
    })
}

export default eslintConfig
