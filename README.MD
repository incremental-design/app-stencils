# App Stencils

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Use Vue to make user interfaces that look and feel native on iOS, Android, MacOS and Windows.

Native user interfaces (UIs) use platform-specific code to respond to all of the inputs that their respective device has to offer. Even better, they follow device-specific design and usability guidelines. You probably want to make UIs that look and feel native ib iPhones, Android phones, iPads, Macs and PCs, without actually writing platform-specific code for each. It turns out that modern web browsers make this possible, but they don't make it easy. Although they _can_ listen to most of the same  [multitouch](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events), [sensor](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs), [location](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), [gamepad](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API), [keyboard](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent), and [assistive inputs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) as native UIs, it’s entirely up to you to configure them to do so. It's also up to you to implement each platform's [design](https://developer.apple.com/design/human-interface-guidelines/) [conventions](https://material.io). And starting with a [framework](https://www.youtube.com/watch?v=cuHDQhDhvPE) doesn't solve this problem. It just moves it around. When you use a framework, have to imbue each of your components with the event handlers and styles they need to look and feel like their native counterparts. With App Stencils, you don't have to start from scratch. It contains UI components that respond to the same inputs, and have the same appearance as their native counterparts. Even better, each component works independently of the others. You don't need to import all of the components into your project to take advantage of each. Just import the ones you need and start saving time. A modern Web browser makes it possible to mimic native UIs. App stencils makes it easy.

## How to Install App Stencils:

All of the Vue components in App Stencils are published to [npm](https://www.npmjs.com/org/incremental.design?tab=packages). Each component lives inside its own package. To install a component, run `npm install @incremental.design/<name of package>` or `yarn add @incremental.design/<name of package>` within your project.

| Package                                                                               | Type                        | Purpose                                                        | Location                       |
| :------------------------------------------------------------------------------------ | :-------------------------- | :------------------------------------------------------------- | :----------------------------- |
| [`@incremental.design/vue3-component-base`](./packages/vue3/component-base/README.md) | Vue 3 Single File Component | Handle multitouch, sensor, mouse, keyboard and gamepad inputs. | `packages/vue3/component-base` |
|                                                                                       |                             |                                                                |                                |

App stencils also contains Vue 3 plugins and helper scripts; and framework-agnostic classes and functions. Like the vue components, each of these modules lives inside its own package, and all are published to npm. 

## How to use App Stencils:
### Build UIs with Vue 3 components:
Each package contains its own `README` with more detailed usage instructions.
### Build your own Vue 3 components:
## How App Stencils works:
* need to explain helper scripts, base component, and every other vue component
## Roadmap:

| Release | Goal:                                                                                                                        | Git Commit |
| ------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1.0     | Set up a monorepo using Lerna. Then, add packages containing typescript and vue snippets for [Panic Nova.](https://nova.app) |            |
| 1.1     | Make a vue component that plays video with an alpha channel.                                                                 |            |
| 1.2     | Make a vue component for tabs.                                                                                               |            |
| 1.3     | Make a vue component that morphs SVGs.                                                                                       |            |

## Contribute to App Stencils:

See: [`CONTRIBUTE.md`](./CONTRIBUTE.md)
