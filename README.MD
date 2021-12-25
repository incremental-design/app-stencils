# App Stencils

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Use Vue 3 components to prototype native apps on iOS, Android, MacOS and Windows.

User interfaces are **native** when they adhere to a platform's **design conventions**. A design convention is a rule that characterizes the apps on the platform. For example, on iPhones and iPads, native user interfaces generally contain navigation links on the top left and right corners of an app. On Android phones and tablets, these same buttons generally appear on the bottom left and right corners. And on both Macs and PCs, these buttons are generally absent, because most apps open new windows or tabs when you navigate through them. Every platform has hundreds of design conventions, just like this one. The best way to make your app easy to learn is to follow these conventions.

If you are prototyping an app, You probably want it to look and feel native on iOS, Android, MacOS and Windows. But, you probably _don't_ want to write platform-specific code for each. It turns out that web browsers make this possible, but they don't make it easy. Although they make user interfaces endlessly themable, it's still up to you to implement each platform's design conventions. With App Stencils, you don't have to start from scratch. It contains UI components that have the appearance and behaviors their native counterparts. Even better, each component works independently of the others. Just import the ones you need and start saving time. Web browsers makes it possible to mimic native UIs. App Stencils makes it easy.

## How to Install App Stencils:

App Stencils contains several packages. While all of them are super helpful, each adds another dependency to your project and another few kilobytes to its [bundle size](https://medium.com/@KasraKhosravi/slimming-down-your-bundle-size-d59db04c95d9). Therefore, the best way to use App Stencils is to install only the packages you need. But how do you know which ones you need? What do they do?

<!-- **The packages in App Stencils focus on just two things: handling user inputs, and displaying output**. You won't find packages that help you scaffold a backend, talk to an API, or set up a data model. If you're looking for a quick way to make a user interface, App Stencils is for you. If you're looking for a quick way to make an entire web app, App Stencils is also for you ... but you'll have to look elsewhere for your app's backend needs. -->

There are two types of packages in app stencils:

<table>
<tr>
<th>Vue 3 Components</th>
<th>Typescript Modules</th>
</tr>
<tr>
<td valign="top" width="50%">
	These are the building blocks of your app's user interface. They include:
		<ul>
			<li>Buttons</li>
			<li>Segmented Controls</li>
			<li>Sliders</li>
			<li>Dropdown Menus</li>
			<li>Date Pickers</li>
			<li>Media Players</li>
			<li>Graphs</li>
			<li>Charts</li>
			<li>Fields</li>
			<li>Text Editors</li>
		</ul>
</td>
<td valign="top" width="50%">
	These are the pieces of logic that make each Vue 3 component interactive. They can be used in <em>any</em> web app, regardless of whether the app is built using Vue, <a href="https://www.youtube.com/watch?v=cuHDQhDhvPE">another framework</a>, or no framework at all.
</td>
</tr>
</table>

 <!-- !List of Packages -->
<table>
<thead>
<tr>
	<th align="left">Type</th>
	<th align="left">Name and Description</th>
</tr>
</thead>
<tbody>

<!-- !Vue 3 Component -->
<!-- !vue3-component-base -->
<tr valign=top>
<td align="left" rowspan="2">Vue 3 Component</td>
<td align="left"><a href="./packages/vue3/component-base/README.md">
<code>@incremental.design/component-base</code>
</a>
<br>
<!-- place gif of the component in storybook here. make the gif link to a storybook hosted on github pages -->
<br/>
A starting point for your own components. The base component provides your components with affordances: states and appearances that change according to user interaction. The base component is the starting point for most of the other <code>@incremental.design/component-*</code>s.
<br/>
</td>
<!-- !vue3-component-base -->
<tr valign=top>

<td align="left"><a href="./packages/vue3/component-tabs/README.md">
<code>@incremental.design/component-tabs</code>
</a>
<br>
<!-- place gif of the component in storybook here. make the gif link to a storybook hosted on github pages -->
<br/>
A row or column of buttons that switch the contents of the current view.
<br/>
</td>
</tr>
</tr>
<!-- !Typescript Module -->
<tr valign="top">
<td align="left" rowspan="2">Typescript Module</td>
<td align="left">
<a href="./packages/shared/device-input-event-handlers/README.md">
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

If you aren't sure what to install first, try installing the Vue 3 components in your project _before_ you try to install any of the Typescript modules. That's because most of the Vue 3 components already implement the typescript modules. You should only use the Typescript modules if you want to

- make a Vue 3 component that isn't already included in App Stencils.
- use App Stencils in a project that doesn't include Vue 3.

Once you've installed your packages, you'll need to import their contents. Every package has a [default](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#description) export. In addition, packages that contain framework-agnostic typescript modules can also have one or more named exports. See the following table for instructions on how to import each package's contents:

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
