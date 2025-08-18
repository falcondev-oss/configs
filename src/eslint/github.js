import github from 'eslint-plugin-github'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'github',
    plugins: {
      github: github.getFlatConfigs().recommended.plugins.github,
    },
    rules: {
      ...Object.fromEntries(
        Object.entries(github.getFlatConfigs().recommended).filter(([rule]) =>
          rule.startsWith('github/'),
        ),
      ),
    },
  },
  {
    name: 'falcondev/github',
    rules: {
      'i18n-text/no-en': 'off',
      'filenames/match-regex': 'off',

      'github/no-then': 'off',

      // browser
      'github/async-currenttarget': 'error',
      'github/async-preventdefault': 'error',
      'github/get-attribute': 'error',
      // 'github/no-blur': 'error',
      'github/no-dataset': 'error',
      'github/no-innerText': 'error',
      'github/no-inner-html': 'error',
      // 'github/unescaped-html-literal': 'error',
      'github/no-useless-passive': 'error',
      'github/require-passive-events': 'error',
      'github/prefer-observers': 'error',

      // a11y
      'github/a11y-aria-label-is-well-formatted': 'error',
      'github/a11y-no-visually-hidden-interactive-element': 'error',
      'github/a11y-no-title-attribute': 'error',
      'github/a11y-svg-has-accessible-name': 'error',
      'github/a11y-role-supports-aria-props': 'error',
    },
  },
]
