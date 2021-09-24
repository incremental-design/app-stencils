# `incremental.design/vue3-component-base`

<!--
Add a banner image and badges

see: https://towardsdatascience.com/how-to-write-an-awesome-readme-68bf4be91f8b

For bonus points, make the banner animated with html, css and svg

see: https://github.com/sindresorhus/css-in-readme-like-wat
 -->

**Build your own user interface (UI) component libraries 10x faster.**

So, you're making a web app. You have a few dozen user flows, and a design system with hundreds of styles, elements and patterns. Now it's time to make the app real. But, before you can assemble even a single user flow, you have to turn every piece of the design system into code you can actually use: you need to build a UI component library. The base component makes this quick and easy. It handles appearance and interactivity for you, by updating its CSS in response to user interactions. When build your components off of the base component, you don't have to spend time rewriting variations on the same event handlers, finite state machines, and CSS selectors in each component in your library. Make your library in 10% of the time, so you can spend the other 90% telling everyone how fast you are.

- **Respond to user interactions, without writing your own event handlers, by wrapping your component in the base component's default slot.**

  Insert your component's template into the base component's [default slot](#wrap-your-components-template-in-the-base-components-default-slot). Then, pass the base component's [`State`](#pass-the-state-slot-prop-into-your-component-to-receive-state-changes-from-the-base-component) default slot prop into your component. Finally, use the base component's props to toggle its [affordances](toggle-the-base-components-affordances). Whenever you click, tap, press, or otherwise interact with your component, the base component will update its `State` slot prop according to its affordances. All your component needs to to is watch it and respond.

- **Theme your component, without writing a single CSS selector, by adding the base component's styles to your component.**

  The base component's [`Theme`](#style–your–component–with-the-base-components-theme-slot-prop) slot prop contains all of the CSS you need to style your component. All you need to do is bind it to your component's template. It will even update your component's appearance in response to user interactions - no `:hover` or `:active` selectors needed!

- **Customize the base component's theme with a single string**

  Pass a [`Theme` object]() into the base component's [`themeObject`](#customize–the-base-components-theme-with-a-themeobject) prop to customize the styles that the base component will provide to your component. You decide what your components look like, the base component figures out when to apply each style.

- **Show a placeholder while your component loads, without writing a single line of code.**

  The base component implements the Vue 3 [suspense](https://v3.vuejs.org/guide/migration/suspense.html#suspense) API, so you don't have to. If your component loads asynchronously, the base component will automatically show a [blockframe](https://medium.com/ux-power-tools/blockframing-and-31-free-sketch-ready-layouts-using-auto-layout-by-anima-app-1be039007ecf) while it's loading. If you'd like to customize the blockframe, all you need to do is [insert your own HTML](#display-a-custom-placeholder-while-your-component-is-loading) to the base component's `<template v-slot:fallback/>` slot.

<!-- list any codebases, websites, apps, platforms or other products that use your code -->

<!-- link to your reader to your repository's bug page, and let them know if you're open to contributions -->

## Installation:

1.  Add the `incremental.design/vue3-component-base` package to your project:

    <table>
    <tr>
    <td rowspan="2">If your project has a ...</td>
    <td><code>yarn.lock</code></td>
    <td rowspan="2">then you should run...</td>
    <td><code>yarn add '@incremental.design/vue3-component-base'</code></td>
    </tr>
    <tr>
    <td><code>package.json</code></td>
      <td><code>npm install '@incremental.design/vue3-component-base'</code></td>
    </tr>
    </table>

2.  Import `vue3-component-base` into any of your Vue 3 components as follows:

    ```vue
    <script lang="ts">
    import BaseComponent from `@incremental.design/vue3-component-base`;

    export default defineComponent({
      components: {
        BaseComponent,
      },
    });
    </script>
    ```

3.  Add it to your Vue 3 component's template:

    <pre><code class="language-vue">&lt;template&gt;
      &lt;BaseComponent 
        &lt;!-- use the following props to add affordances to your component --&gt;
        :isHoverable 
        :isPeekable 
        :isPressable 
        :isToggleable 
        :isDraggable 
        :isSnappable 
        :isSelectable 
        :isCopyable 
        :isPasteable 
        :isReplicable 
        :isEditable
      
        &lt;!-- use `themeObject` to change the base component's theme --&gt;
        
        :themeObject="new Theme('ios')"
          &lt;!-- 
          accepted strings are any of 'ios', 'macos', 'tvos', 'android', 'windows', 'gtk', 'web'.
          For more information, see: <a href="../../shared/theme/README.md#make-a-theme-object">"Make a Theme Object"</a>. 
          --&gt;
      &gt;
      
        &lt;v-slot:default="{State, PointerInput, FocusInput, KeyboardInput, DragInput, ScrollInput, Theme}"&gt;
          
            &lt;-- place your component's HTML here --&gt;
          
        &lt;/v-slot&gt;
        
        &lt;-- The following slot is optional. Only use it if you want to customize the placeholder that is rendered while your component is loading --&gt;
        &lt;v-slot:fallback="{State, PointerInput, FocusInput, KeyboardInput, DragInput, ScrollInput, Theme}"&gt;
        
          &lt;-- place the HTML you want to display while your component is loading here --&gt;
        
        &lt;/v-slot&gt;
        
      &lt;/BaseComponent&gt;
    &lt;/template&gt;
    </code></pre>

## Usage:

<!-- * what you want the reader to do -->

How to use the `incremental.design/vue3-component-base` API in your codebase:

<!-- * why?
   * desired outcome
   * underlying problem
   * action
   * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

<!-- need to explain affordances, states and state changes. Also need to explain relationship between theme and appearance

introduce these parts of the mental model, remind reader that figuring this stuff out manually is a HUGE time sink. better to just understand the mental model here, and then

-->

### Toggle the base component's affordances:

| Prop            | What it does: | How to use it: | What it enables: |
| :-------------- | :------------ | :------------- | :--------------- |
| `:isHoverable`  |               |                |                  |
| `:isPeekable`   |               |                |                  |
| `:isPressable`  |               |                |                  |
| `:isToggleable` |               |                |                  |
| `:isDraggable`  |               |                |                  |
| `:isSnappable`  |               |                |                  |
| `:isSelectable` |               |                |                  |
| `:isCopyable`   |               |                |                  |
| `:isPasteable`  |               |                |                  |
| `:isReplicable` |               |                |                  |
| `:isEditable`   |               |                |                  |

### Wrap your component's template in the base component's default slot:

#### Pass the `State` slot prop into your component to receive state changes from the base component:

#### Pass the `PointerInput` slot prop into your component to receive [PointerInput](../../shared/device-input-event-handlers/src/event-handlers/README.md#pointerinput)s from the base component:

#### Pass the `FocusInput` slot prop into your component to receive [FocusInput](../../shared/device-input-event-handlers/src/event-handlers/README.md#focusinput)s from the base component:

#### Pass the `KeyboardInput` slot prop into your component to receive [KeyboardInput](../../shared/device-input-event-handlers/src/event-handlers/README.md#keyboardinput)s from the base component:

#### Pass the `DragInput` slot prop into your component to receive [DragInput](../../shared/device-input-event-handlers/src/event-handlers/README.md#draginput)s from the base component:

#### Pass the `ScrollInput` slot prop into your component to receive [ScrollInput](../../shared/device-input-event-handlers/src/event-handlers/README.md#scrollinput)s from the base component:

### Respond to the base component's state changes:

### Style your component with the base component's `Theme` slot prop:

### Customize the base component's theme with a `Theme` object:

`ios`, `macos`, `tvos`, `android`, `gtk`, `windows`

### Display a custom placeholder while your component is loading:

### How `incremental.design/vue3-component-base` works:

[ ] Explain how execution works. What is the entry point for your code? Which files correspond to which functionality? What is the lifecycle of your project? Are there any singletons, side effects or shared state among instances of your project? Take extra care to explain design decisions. After all, you wrote an ENTIRE codebase around your opinions. Make sure that the people using it understand them.

#### Repository Structure:

<table>
<thead>
  <tr>
    <th align="left">File or folder:</th>
    <th align="left">What it does:</th>
    <th align="left">Should you modify it?</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td align="left"><code>src/BaseComponent.vue</code></td>
    <td align="left">exports Vue component <code>Base</code></td>
    <td align="left">No, this component's API has been frozen.</td>
  </tr>
  <tr>
    <td align="left"><code>src/use/*</code></td>
    <td align="left">exports functions used in <code>BaseComponent</code>'s setup function.</td>
    <td align="left"></td>
  </tr>
  <tr>
    <td align="left"><code>babel.config.js</code></td>
    <td align="left"></td>
    <td align="left"></td>
  </tr>
  <tr>
    <td align="left"><code>package.json</code></td>
    <td align="left"></td>
    <td align="left"></td>
  </tr>
  <tr>
    <td align="left"><code>README.md</code></td>
    <td align="left"></td>
    <td align="left"></td>
  </tr>
  <tr>
    <td align="left"><code>tsconfig.json</code></td>
    <td align="left"></td>
    <td align="left"></td>
  </tr>
  <tr>
    <td align="left"><code>vue.config.js</code></td>
    <td align="left"></td>
    <td align="left"></td>
  </tr>
  <tr>
    <td align="left"><code>yarn.lock</code></td>
    <td align="left"></td>
    <td align="left"></td>
  </tr>
</tbody>
</table>

===================

<!-- `vue3-component-base` translates [Events](https://developer.mozilla.org/en-US/docs/Web/API/Event) into state changes. A **state** is a description of a visual treatment that follows a user input. Examples include 'focused', 'pressed', and 'selected'. A 'focused' user interface has a different appearance from a 'not focused' one. Likewise, a 'pressed' interface has a different appearance from a 'not pressed' one. A **user interface** is any piece of an application that responds to user input. Examples of user interfaces include buttons, fields, and links. A **state change** is a transition that occurs _while_ an element receives user input. `vue3-component-base` interprets user input and updates the state to match. -->

# Installation:

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
