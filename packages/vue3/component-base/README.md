# `@incremental.design/vue3-component-base`

[ ] banner image

`vue3-component-base` translates [DOM element events](https://developer.mozilla.org/en-US/docs/Web/API/Element) into state changes. A **state** is a description of a visual treatment that follows a user input. Examples include 'focused', 'pressed', and 'selected'. A 'focused' user interface has a different appearance from a 'not focused' one. Likewise, a 'pressed' interface has a different appearance from a 'not pressed' one. A **user interface** is any piece of an application that responds to user input. Examples of user interfaces include buttons, fields, and links. A **state change** is a transition that occurs _while_ an element receives user input. `vue3-component-base` interprets user input and updates the state to match.
# Installation:
1. `yarn add @incremental.design/vue3-component-base`
2. Import `vue3-component-base` into any of your Vue 3 components as follows:

```vue
<script lang="ts">
import Base from `@incremental.design/vue3-component-base`;

export default defineComponent({
  components: {
    Base,
    //...
  },
  //...
});
</script>
```

3. Add it to your Vue 3 component's template:

```vue
<template>
  <Base>
    <template v-slot:default="{ Pointer, State }">
      <!-- your markup here -->
    </template>

    <template v-slot:default="{ Pointer, State }">
      <!-- your markup here -->
    </template>
  </Base>
</template>
```

# Usage:

<!-- todo: figure out what props the base component should have -->

<!--

todo: rewrite with the formula you use for design documents. See: https://www.craft.do/s/Z57xLPa7Ke7jgV

The reason I suggest this is because people will read these docs and have no idea how this component can help them.

 -->

![Your component without and with base component](../../../.readme/vue3-component-base/vue3-component-base-comparison.png)

The base component implements all of the event listeners and state management logic that any user interface element needs to be interactive. When you use the base component, you don't have to write the event listeners and state machines yourself.

The base component takes advantage of Vue 3's [named](https://v3.vuejs.org/guide/component-slots.html#named-slots) and [scoped](https://v3.vuejs.org/guide/component-slots.html#scoped-slots) slots.
Think of it as a container that shims in between your components `template` and the markup within it.

![Inputs and Outputs of vue3-component-base](../../../.readme/vue3-component-base/vue3-component-base-usage.png)

To use the base component, insert the Vue markup you want to render into its slots. Then, retrieve the `Pointer` and `State` objects from the slot scope, and use them in your vue component. The `Pointer` object indicates whether a pointer, such as a mouse cursor or fingertip, is currently pointing at your vue component, and if so, what its coordinates are. The `State` object keeps track of the appearance of your component (e.g. whether it is pressed, focused, selected, etc.). For a complete list of states, see [`use/VueSeamlessStateMachine.ts`](./use/VueSeamlssStateMachine.ts).

## Props:

[ ] need to explain what props you can give the base component

## Slots:

[ ] need to explain what slots are available
[ ] and need to explain what comes out of each slot

## How `@incremental.design/vue3-component-base` works:

![The base component listens for HTML events, updates state, and sends the state into the scope of both the default slot and the suspense slot](../../../.readme/vue3-component-base/vue3-component-base-how-it-works.png)

[ ] Explain how execution works. What is the entry point for your code? Which files correspond to which functionality? What is the lifecycle of your project? Are there any singletons, side effects or shared state among instances of your project?

### Package Folder Structure:

| File or folder:         | What it does:                                               | Should you modify it?                                                                     |
| :---------------------- | :---------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `dist/*`                | Contains bundled code                                       | No, this is automatically generated at every commit, and every time `lerna build` is run. |
| `node_modules/\*        | Contains package dependencies                               | No, this is automatically repopulated every time `lerna bootstrap` is run.                |
| `src/BaseComponent.vue` | exports Vue component `Base`                                | No.                                                                                       |
| `src/use/*`             | exports functions used in `BaseComponent`'s setup function. |                                                                                           |
| `babel.config.js`       |                                                             |                                                                                           |
| `package.json`          |                                                             |                                                                                           |
| `README.md`             |                                                             |                                                                                           |
| `tsconfig.json`         |                                                             |                                                                                           |
| `vue.config.js`         |                                                             |                                                                                           |
| `yarn.lock`             |                                                             |                                                                                           |
