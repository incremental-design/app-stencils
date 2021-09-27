# App Stencils

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Use Vue 3 components to make user interfaces that look and feel native on iOS, Android, MacOS and Windows.

Native user interfaces (UIs) use platform-specific code to respond to all of the inputs that their respective device has to offer. Even better, they follow device-specific design and usability guidelines. You probably want to make UIs that look and feel native on iPhones, Android phones, iPads, Macs and PCs, without actually writing platform-specific code for each. It turns out that modern web browsers make this possible, but they don't make it easy. Although they _can_ listen to most of the same [multitouch](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events), [sensor](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs), [location](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), [gamepad](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API), [keyboard](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent), and [assistive inputs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) as native UIs, it’s entirely up to you to configure them to do so. It's also up to you to implement each platform's [design](https://developer.apple.com/design/human-interface-guidelines/) [conventions](https://material.io). And starting with a [framework](https://www.youtube.com/watch?v=cuHDQhDhvPE) doesn't solve this problem. It just moves it around. When you use a framework, have to imbue each of your components with the event handlers and styles they need to look and feel like their native counterparts. With App Stencils, you don't have to start from scratch. It contains UI components that respond to the same inputs, and have the same appearance as their native counterparts. Even better, each component works independently of the others. You don't need to import all of the components into your project to take advantage of each. Just import the ones you need and start saving time. A modern Web browser makes it possible to mimic native UIs. App stencils makes it easy.

## How to Install App Stencils:

App Stencils consists of several packages. While all of them are super helpful, each adds another dependency to your project and another few kilobytes to its [bundle size](https://medium.com/@KasraKhosravi/slimming-down-your-bundle-size-d59db04c95d9). Therefore, the best way to use App Stencils is to install only the packages you need. But how do you know what you need? What do the packages in App Stencils do? Well, I'm glad you asked!

**The packages in App Stencils focus on just two things: handling user inputs, and displaying output**. You won't find packages that help you scaffold a backend, talk to an API, or otherwise manipulate a data model. If you're looking for a quick way to make a user interface, App Stencils is for you. If you're looking for a quick way to make an entire web app, App Stencils is also for you ... but you'll have to look elsewhere for your app's backend needs.

Although there are a handful <!-- dozens --> of packages in App Stencils, each of them contains just one of three things:

- One Vue 3 [single-file-component](https://v3.vuejs.org/guide/single-file-component.html#single-file-components).
- One Vue 3 [plugin](https://v3.vuejs.org/guide/plugins.html#plugins).
- One or more **framework-agnostic** typescript modules.

  - A framework-agnostic typescript module can be used in _any_ web app, regardless of whether the app is built using Vue, [another framework](https://www.youtube.com/watch?v=cuHDQhDhvPE), or no framework at all.

If you aren't sure what to use first, try using the Vue 3 components in your project _before_ you try to use any of the typescript modules. That's because most of the Vue 3 components already implement the typescript modules. You should only use the typescript modules if you want to

- make a Vue 3 component that isn't already included in App Stencils.
- use App Stencils in a project that doesn't include Vue 3.

Once you've chosen your packages, you'll need to import their contents. Every package has a [default](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#description) export. In addition, packages that contain framework-agnostic typescript modules can also have one or more named exports. See the following table for instructions on how to import each package's contents:

 <!-- !List of Packages -->
<table>
<thead>
<tr>
	<th align="left">Type</th>
	<th align="left">Name and Description</th>
</tr>
</thead>
<tbody>

<!-- !Vue SFC Packages -->
<!-- !vue3-component-base -->
<tr valign=top>
<td align="left" rowspan="1">Vue 3 Single File Component</td>
<td align="left"><a href="./packages/vue3/component-base/README.md">
<code>@incremental.design/vue3-component-base</code>
</a>
<br>
<!-- place gif of the component in storybook here. make the gif link to a storybook hosted on github pages -->
<br/>
A starting point for your own components. The base component provides your components with affordances: states and appearances that change according to user interaction. The base component is the starting point for most of the other <code>@incremental.design/vue3-component-*</code>s.
<br/>
</td>
</tr>

<!-- !Vue 3 Plugin -->
<!-- !Baz -->
<tr valign="top">
<td align="left" rowspan="1">Vue 3 Plugin</td>
<!-- <td align="left"><a href="./packages/vue3/component-base/README.md">
<code>@incremental.design/vue3-component-base</code>
</a>
<br> -->
<!-- place gif of the component in storybook here. make the gif link to a storybook hosted on github pages -->
<!-- <br/>
Handle multitouch, sensor, mouse, keyboard and gamepad inputs.
</td> -->
</tr>

<!-- !Framework-Agnostic Typescript Module -->
<!-- !Baz -->
<tr valign="top">
<td align="left" rowspan="1">Framework-Agnostic Typescript Modules</td>
<td align="left"><a href="./packages/vue3/component-base/README.md">
<code>@incremental.design/device-input-event-handlers</code>
</a>
<br>
<!-- place gif of the component in storybook here. make the gif link to a storybook hosted on github pages -->
<br/>
Handlers for <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent" target="_blank">DeviceMotionEvent</a></code> <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent" target="_blank">DeviceOrientationEvent</a></code> <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/DragEvent" target="_blank">DragEvent</a></code> <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent" target="_blank">FocusEvent</a></code> <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API" target="_blank">GamepadEvent</a></code> <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent" target="_blank">KeyboardEvent</a></code> <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank">MouseEvent</a></code> <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent" target="_blank">TouchEvent</a></code> and <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent" target="_blank">WheelEvent</a></code>. These handlers normalize and filter event details to make them easier to interpret.
</td>
</tr>

</tbody>
</table>

<!--
	need to build the storybook to github pages

	see: https://dev.to/kouts/deploy-storybook-to-github-pages-3bij


	and then for each component, make a thumbnail that links to the storybook page in the 'demo' field
 -->

## How to use App Stencils:

<!-- app stencils contains packages for handling input (vue plugins, typescript modules), and (vue components) for displaying output -->

### Build UIs with Vue 3 components:

<!-- need to explain that each vue 3 package exports ONE component. Every component shares certain props and styles, and each have their own unique props/styles. Need to let reader know that no matter what vue component they use, the 'basic' set of tunables is the same -->

<!--

each vue component contains a default appearance, a prop that accepts style configuration data (from the seamlss-vue style plugin), a default slot, and a suspense slot. If you don't use these slots, the component will show a default appearance. If you do, you can change the appearance with just a single string argument 'ios' 'android' 'macos' 'windows' 'gtk' 'blueprint', or you can initialize the seamlss-vue plugin and pass a reference to that

the default slot and suspense slot always contain the same scoped props

slots let you swap out the template, without swapping out the script: change the appearance, keep the behavior

in addition, some components have other named slots, each of which contain their own scoped props.

finally, each component conditionally applies css selectors that you can hook into in your slot templates. all components will style the following selectors (need to grab and list selectors) according to their states. Every componnet will have more detailed documentation on how it grabs and styles selectors

 -->

Each package contains its own `README` with more detailed usage instructions.

### Build your own Vue 3 components:

<!-- need to explain that almost ALL logic is actually abstracted into typescript libraries, each of which provides a single default export, and destructurable functions. each library does ONE thing, and every function in a library shares a similar signature. functions of different signatures live in different libraries

also, almost all functions in a library tend to share the same few generics. once you understand a library's generic, you understand the library itself
 -->

## How App Stencils works:

<!--
every vue component is actually built off of the base component

the base component is actually built off of the event listeners and seamlss styles

if you want to make your own components, you can follow this pattern, and consult base component docs
 -->

## Roadmap:

<table>
<thead>
<tr>
<th>Release</th>
<th>Goal:</th>
<th>Git Commit</th>
</tr>
</thead>
<tbody>
<tr>
<td>1.0</td>
<td>Set up a monorepo using Lerna. Then, add packages containing typescript and vue snippets for <a href="https://nova.app">Panic Nova.</a></td>
<td></td>
</tr>
<tr>
<td>1.1</td>
<td>Make a vue component that plays video with an alpha channel.</td>
<td></td>
</tr>
<tr>
<td>1.2</td>
<td>Make a vue component for tabs.</td>
<td></td>
</tr>
<tr>
<td>1.3</td>
<td>Make a vue component that morphs SVGs.</td>
<td></td>
</tr>
</tbody>
</table>

## Contribute to App Stencils:

See: [`CONTRIBUTE.md`](./CONTRIBUTE.md)

<!-- * what you want the reader to do -->

<!-- * why?
	 * desired outcome
	 * underlying problem
	 * action
	 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->
