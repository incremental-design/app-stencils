module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true,
  },
  projects: [
    {
      root: "./packages/vue3/component-base",
      package: './package.json',
      tsconfig: './tsconfig.json',
    },
    {
      root: "./packages/vue3/component-tabs",
      package: './package.json',
      tsconfig: './tsconfig.json',
    }
  ]
}