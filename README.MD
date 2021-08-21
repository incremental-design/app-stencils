# App Stencils

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Use Vue to make user interfaces that look and feel native on iOS, Android, MacOS and Windows.

Native user interfaces (UIs) use platform-specific code to respond to all of the inputs that their respective device has to offer. Even better, they follow device-specific design and usability guidelines. You probably want to make UIs that look native for iPhones, Android phones, iPads, Macs and PCs, without actually writing platform-specific code for each. It turns out that modern web browsers make this possible, but they don't make it easy. It's up to you to handle [multitouch](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events), [sensor](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs), [location](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), [gamepad](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API), [keyboard](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent), and [assistive inputs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA). It's also up to you to implement each platform's [design](https://developer.apple.com/design/human-interface-guidelines/) [conventions](https://material.io). And starting with a [framework](https://www.youtube.com/watch?v=cuHDQhDhvPE) doesn't solve this problem. It just moves it around - now you have to imbue each of your components with the event handlers and styles they need to look and feel like their native counterparts. With App Stencils, you don't have to start from scratch. This monorepo contains packages that respond to the same inputs, and have the same appearance as their native counterparts. Even better, each package works independently of the others. You don't need to import all of the packages to take advantage of each. Just import the ones you need and start saving time. A modern Web browser makes it possible to mimic native user interfaces. App stencils makes it easy.

## Installation:

App stencils contains the following packages, each of which is published to [npm](https://www.npmjs.com/org/incremental.design?tab=packages). To install any of them, simply run `npm install @incremental.design/<name of package>` or `yarn add @incremental.design/<name of package>` within your project.

| Package                                                                               | Type                        | Purpose                                                        | Location                       |
| :------------------------------------------------------------------------------------ | :-------------------------- | :------------------------------------------------------------- | :----------------------------- |
| [`@incremental.design/vue3-component-base`](./packages/vue3/component-base/README.md) | Vue 3 Single File Component | Handle multitouch, sensor, mouse, keyboard and gamepad inputs. | `packages/vue3/component-base` |

<!-- ## Usage: -->

<!-- * what you want the reader to do -->

Consult each package's README for instructions on how to use it in your codebase.

<!-- * why?
   * desired outcome
   * underlying problem
   * action
   * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

<!-- * how do? -->

<!-- ### How App Stencils works: -->

<!-- All of the packages in app stencils fall into one of the following types:

| Type of Package                                                                      | Where to find it:                             |
| :----------------------------------------------------------------------------------- | :-------------------------------------------- |
| Vue 3 [Single File Component](https://v3.vuejs.org/guide/single-file-component.html) | `packages/vue3/component-<name of component>` |
| Vue 3 [Plugin](https://v3.vuejs.org/guide/plugins.html#plugins)                      | `packages/vue3/plugin-<name of plugin>`       |
| Vue 3 Helper Script                                                                  | `packages/vue3/utility-<name of script>`      |

Each package contains its own `README` with instructions that are specific to it.

App stencils is a monorepo that is managed by [Lerna](https://lerna.js.org/). Unlike most repositories, this repository contains the source code for not one, but several packages. In fact, the packages in this repository import each other. For example, every Vue 3 Single File Component package in this repository imports the `@incremental.design/vue3-component-base` package. Lerna is the tool that takes care of building each package and making it available to import into other packages.

This repository cannot be "run" in the typical sense of the word. It doesn't contain an executable, such as a web server or an app. Instead, it contains packages that can be imported into other projects. -->

## Roadmap:

| Release | Goal:                                                                                                                        | Git Commit |
| ------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1.0     | Set up a monorepo using Lerna. Then, add packages containing typescript and vue snippets for [Panic Nova.](https://nova.app) |            |
| 1.1     | Make a vue component that plays video with an alpha channel.                                                                 |            |
| 1.2     | Make a vue component for tabs.                                                                                               |            |
| 1.3     | Make a vue component that morphs SVGs.                                                                                       |            |

## Contribute to App Stencils:

See: [`CONTRIBUTE.md`](./CONTRIBUTE.md)
