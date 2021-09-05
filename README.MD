# App Stencils

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Use Vue to make user interfaces that look and feel native on iOS, Android, MacOS and Windows.

Native user interfaces (UIs) use platform-specific code to respond to all of the inputs that their respective device has to offer. Even better, they follow device-specific design and usability guidelines. You probably want to make UIs that look and feel native ib iPhones, Android phones, iPads, Macs and PCs, without actually writing platform-specific code for each. It turns out that modern web browsers make this possible, but they don't make it easy. Although they _can_ listen to most of the same [multitouch](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events), [sensor](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs), [location](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), [gamepad](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API), [keyboard](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent), and [assistive inputs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) as native UIs, it’s entirely up to you to configure them to do so. It's also up to you to implement each platform's [design](https://developer.apple.com/design/human-interface-guidelines/) [conventions](https://material.io). And starting with a [framework](https://www.youtube.com/watch?v=cuHDQhDhvPE) doesn't solve this problem. It just moves it around. When you use a framework, have to imbue each of your components with the event handlers and styles they need to look and feel like their native counterparts. With App Stencils, you don't have to start from scratch. It contains UI components that respond to the same inputs, and have the same appearance as their native counterparts. Even better, each component works independently of the others. You don't need to import all of the components into your project to take advantage of each. Just import the ones you need and start saving time. A modern Web browser makes it possible to mimic native UIs. App stencils makes it easy.

## How to Install App Stencils:

<!-- * what you want the reader to do -->

<!-- * why?
	 * desired outcome
	 * underlying problem
	 * action
	 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

<!-- All of the Vue components in App Stencils are published to [npm](https://www.npmjs.com/org/incremental.design?tab=packages). Each component lives inside its own package. To install a component, run `npm install @incremental.design/<name of package>` or `yarn add @incremental.design/<name of package>` within your project. -->
<!--

three types of package in app stencils

* vue components
	* imported into each other
	* can be used piecemeal, or all together
	* look for Vue plugins, if you've installed them. Else, they will fall back to internal logic and throw a warning in the browser console
* typescript presentation logic
	* framework-agnostic
	* imported into vue components and plugins
	* can be imported into any browser code
	* mostly, they are wrappers that make it easier to use browser APIs
* vue plugins
	* can be imported into your vue app
	* enhance the performance of vue components
 -->

| Package                                                                                                                                                                                                 | Type                        | Purpose                                                        | Location                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------- | :------------------------------------------------------------- | :----------------------------- |
| [`@incremental.design/vue3-component-base`](./packages/vue3/component-base/README.md)<br><!-- place gif of the component in storybook here. make the gif link to a storybook hosted on github pages --> | Vue 3 Single File Component | Handle multitouch, sensor, mouse, keyboard and gamepad inputs. | `packages/vue3/component-base` |
|                                                                                                                                                                                                         |                             |                                                                |                                |

<!--
	need to build the storybook to github pages

	see: https://dev.to/kouts/deploy-storybook-to-github-pages-3bij


	and then for each component, make a thumbnail that links to the storybook page in the 'demo' field
 -->

App stencils also contains Vue 3 plugins and helper scripts; and framework-agnostic classes and functions. Like the vue components, each of these modules lives inside its own package, and all are published to npm.

## How to use App Stencils:

### Build UIs with Vue 3 components:

<!-- need to explain that each vue 3 package exports ONE component. Every component shares certain props and styles, and each have their own unique props/styles. Need to let reader know that no matter what vue component they use, the 'basic' set of tunables is the same -->

Each package contains its own `README` with more detailed usage instructions.

### Build your own Vue 3 components:

<!-- need to explain that almost ALL logic is actually abstracted into typescript libraries, each of which provides a single default export, and destructurable functions. each library does ONE thing, and every function in a library shares a similar signature. functions of different signatures live in different libraries -->

## How App Stencils works:

- need to explain helper scripts, base component, and every other vue component

## Roadmap:

| Release | Goal:                                                                                                                        | Git Commit |
| ------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1.0     | Set up a monorepo using Lerna. Then, add packages containing typescript and vue snippets for [Panic Nova.](https://nova.app) |            |
| 1.1     | Make a vue component that plays video with an alpha channel.                                                                 |            |
| 1.2     | Make a vue component for tabs.                                                                                               |            |
| 1.3     | Make a vue component that morphs SVGs.                                                                                       |            |

## Contribute to App Stencils:

See: [`CONTRIBUTE.md`](./CONTRIBUTE.md)
