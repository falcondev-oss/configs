import type antfu from '@antfu/eslint-config'

declare function eslintConfig(config: {
  nuxt?: boolean
  expo?: boolean
  tsconfigPath?: string
}): ReturnType<typeof antfu>

export default eslintConfig
export { eslintConfig }
