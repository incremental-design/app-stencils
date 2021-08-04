# App Stencils

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

This [monorepo](https://lerna.js.org/) contains all of the templates, components, plugins and utilities that incremental.design uses to make websites, web apps, and prototypes. Essentially, this is how [incremental.design](https://incremental.design) makes great stuff fast 🏎.

## Installation:

This is a monorepo. That means that it contains several packages, each of which is published to [npm](https://www.npmjs.com/org/incremental.design?tab=packages). To use any of these packages, simply run `npm install @incremental.design/<name of package>` or `yarn add @incremental.design/<name of package>`.

## Usage:

How to use App Stencils in your codebase:

[ ] show a quick, 'getting started' example - preferably something that showcases how to use one of the components in the repo

[ ] summarize the amazing new capabilities the reader will unlock when they use this project. Then describe how they can activate these capabilities.

### Packages:

This repository contains the following types of packages:

| Type of Package                                                                      | Where to find it:                             |
| :----------------------------------------------------------------------------------- | :-------------------------------------------- |
| Vue 3 [Single File Component](https://v3.vuejs.org/guide/single-file-component.html) | `packages/vue3/component-<name of component>` |
| Vue 3 [Plugin](https://v3.vuejs.org/guide/plugins.html#plugins)                      | `packages/vue3/plugin-<name of plugin>`       |
| Vue 3 Helper Script                                                                  | `packages/vue3/utility-<name of script>`      |

Each package contains its own `README` with instructions that are specific to it.

The packages that are currently in this repository are:

| Package                                                                               | Type                        | Location                       |
| :------------------------------------------------------------------------------------ | :-------------------------- | :----------------------------- |
| [`@incremental.design/vue3-component-base`](./packages/vue3/component-base/README.md) | Vue 3 Single File Component | `packages/vue3/component-base` |

### How App Stencils works:

App stencils is a monorepo that is managed by [Lerna](https://lerna.js.org/). Unlike most repositories, this repository contains the source code for not one, but several packages. In fact, the packages in this repository import each other. For example, every Vue 3 Single File Component package in this repository imports the `@incremental.design/vue3-component-base` package. Lerna is the tool that takes care of building each package and making it available to import into other packages.

This repository cannot be "run" in the typical sense of the word. It doesn't contain an executable, such as a web server or an app. Instead, it contains pieces of code - libraries - that can be imported into other apps.

## Roadmap:

| Release | Goal:                                                                                                                        | Git Commit |
| ------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1.0     | Set up a monorepo using Lerna. Then, add packages containing typescript and vue snippets for [Panic Nova.](https://nova.app) |            |
| 1.1     | Make a vue component that plays video with an alpha channel.                                                                 |            |
| 1.2     | Make a vue component for tabs.                                                                                               |            |
| 1.3     | Make a vue component that morphs SVGs.                                                                                       |            |

## Contribute to App Stencils:

See: [`CONTRIBUTE.md`](./CONTRIBUTE.md)
