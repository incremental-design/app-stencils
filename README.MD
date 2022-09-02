# App Stencils

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

App Stencils is a finger-friendly set of Vue Components. Use it to build websites and web apps that respond to touch, mouse, keyboard, accelerometer and even game controller inputs. App stencils makes your websites and web apps feel just like native apps.

App stencils is a monorepo. Each component has its own package. Only install the packages you need for your project. This will reduce the overall bundle size you ship to the browser, and improve performance.

## contents

### Vue 3 Components

All Vue 3 Components are located in `packages/vue3`

#### `@incremental.design/component-base`
* Located at `packages/vue3/component-base`.
* Starting point for every other Vue component in `app-stencils`. This component contains all of the logic needed to handle touch, mouse, keyboard, accelerometer, and game controller inputs. Every other Vue component is built on top of this one.
* imports `@incremental.design/theme` and `@incremental.design/device-input-event-handlers`

#### `@incremental.design/component-tabs`
* Located at `packages/vue3/component-tabs`.
* Tabs component that responds to touch gestures, mouse clicks, keyboard navigation and focus events from a game controller.
* imports `@incremental.design/theme` and `@incremental.design/component-base`

### Typescript Modules

All typescript modules are located in `packages/shared`. As the name suggests, these modules are shared among multiple components. They can also be used independently of Vue 3. So, if you want to make react, svelte, or web components, you can use these modules to get started.

#### `@incremental.design/device-input-event-handlers`
* Located at `packages/shared/device-input-event-handlers`.
* Typescript interfaces and functions for handling _every_ human interface device event that a modern browser emits. The functions in this package improve the developer experience of handling touch, mouse, keyboard, accelerometer and game controller events.

#### `@incremental.design/theme`
* Located at `packages/shared/theme`.
* Typescript interfaces and functions for theming user interfaces.

## [Contribute to App Stencils ↗](./CONTRIBUTE.md)


<!-- 
==================

vue websites:

vitedge only (drop to ssr if >1mb) 
vitest (instead of jest??) (will it work w playwright? does it matter?)
vite plugin pwa(??)
typescript
Editorconfig (NOT prettier)
NO ESLINT
optional pinia
optional partytown

==================

vue libraries

vitest (or jest) and playwright(?)
typescript
editorconfig (no prettier, no eslint)
some way to bundle <style> blocks

BUT 

use nuxt 3 (with webpack … sorry, I know) for incremental.design website … also use uxlens

==================
-->
