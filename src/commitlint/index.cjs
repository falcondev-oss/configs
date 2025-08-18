const emojiRegEx =
  // eslint-disable-next-line regexp/prefer-character-class, regexp/no-dupe-disjunctions
  /[\u2700-\u27BF]|(?:\uD83C[\uDDE6-\uDDFF]){2}|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0023-\u0039]\uFE0F?\u20E3|\u3299|\u3297|\u303D|\u3030|\u24C2|\uD83C[\uDD70\uDD71]|\uD83C[\uDD7E\uDD7F]|\uD83C\uDD8E|\uD83C[\uDD91-\uDD9A]|\uD83C[\uDDE6-\uDDFF]|\uD83C[\uDE01\uDE02]|\uD83C\uDE1A|\uD83C\uDE2F|\uD83C[\uDE32-\uDE3A]|\uD83C[\uDE50\uDE51]|\u203C|\u2049|[\u25AA\u25AB]|\u25B6|\u25C0|[\u25FB-\u25FE]|\u00A9|\u00AE|\u2122|\u2139|\uD83C\uDC04|[\u2600-\u26FF]|\u2B05|\u2B06|\u2B07|\u2B1B|\u2B1C|\u2B50|\u2B55|\u231A|\u231B|\u2328|\u23CF|[\u23E9-\u23F3]|[\u23F8-\u23FA]|\uD83C\uDCCF|\u2934|\u2935|[\u2190-\u21FF]/

// eslint-disable-next-line regexp/no-unused-capturing-group
const colonEmojiRegEx = /:(\w+):/

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'build', // 📦️ Changes to the build system (vite, webpack) or dependencies (npm).
        'chore', // 🔧 Other changes that don't modify src or test files (.gitignore, lint config).
        'ci', // 👷 Changes to CI configuration files and scripts.
        'docs', // 📝 Documentation, README.md, Code Comments.
        'feat', // ✨ A new feature.
        'fix', // 🐛 A bug fix.
        'perf', // ⚡️ A code change that improves performance/memory usage.
        'refactor', // ♻️ Rewrites code without feature, performance or bug changes. Architectural improvements.
        'revert', // ⏪️ Reverts a previous commit.
        'style', // 🎨 Improve structure/format of the code. Apply linting rules.
        'test', // ✅ Adding missing tests or correcting existing tests.
        'wip', // 💩 Unfinished changes that need to be committed. Use sparsely!
      ],
    ],
    'no-emoji': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'no-emoji': ({ header }) => {
          return [
            !emojiRegEx.test(header) && !colonEmojiRegEx.test(header),
            "Don't use emojis in commit messages.",
          ]
        },
      },
    },
  ],
}
