module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  projects: ['packages/shared/*', 'packages/vue3/*', 'packages/storybook'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
}
