/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'falcondev/unicorn/overrides',
    files: ['app/**/*'],
    rules: { 'unicorn/filename-case': 'off' },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // used for asset imports
      'ts/no-require-imports': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
]
