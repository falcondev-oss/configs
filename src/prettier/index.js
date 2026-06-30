/** @type import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions */
export default {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  htmlWhitespaceSensitivity: 'ignore',
  quoteProps: 'consistent',
  plugins: [import.meta.resolve('prettier-plugin-tailwindcss')],
}
