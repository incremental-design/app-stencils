# `incremental.design/vue3-component-base`

<!--
Add a banner image and badges

see: https://towardsdatascience.com/how-to-write-an-awesome-readme-68bf4be91f8b

For bonus points, make the banner animated with html, css and svg

see: https://github.com/sindresorhus/css-in-readme-like-wat
 -->

**Build your own user interface (UI) component libraries 10x faster.**

So, you're making a web app. You have a few dozen user flows, and a design system with hundreds of styles, elements and patterns. Now it's time to make the app _real_. But, before you can assemble any user flows, you need to turn the design system into code you can _actually_ use. In other words, you need to build a UI component library. The base component makes this quick and easy. It handles appearance and interactivity for you, by updating its CSS in response to user interactions. When you start with the base component, you don't have rewrite variations on the same event handlers, finite state machines, and CSS selectors for every component in your library. Use the base component to make your library in 10% of the time, so you can spend the other 90% telling everyone how fast you are.

- **Respond to user interactions - without writing event handlers - by wrapping your component's markup in the base component's default slot.**

  <!-- need a storybook that shows base component responding to all the device inputs, with gif that links to it -->

  ![Insert your component's markup into the base component's default slot to access its slot props.](../../../.readme/diagram-vue3-component-base-respond-to-user-interactions.png)

  Use the base component's props to add [affordances](toggle-the-base-components-affordances) to your component's markup.

  Whenever you click, tap, press, or otherwise interact with your component, the base component will emit a [`stateChange` custom event](#use-the-statechange=custom-event-to-run-methods-when-your-components-state-changes) according to the props you supplied. All you need to do wrap your component's markup in the base component's [default slot](#wrap-your-components-template-in-the-base-components-default-slot) and use `@stateChange` to run your component's methods.

- **Customize the base component's theme with a single string.**

  <!-- need a storybook that cycles a component through different styles, and a gif that links to it -->

  ![Use the `:theme` prop to customize the styles contained in the default slot's `Theme` slot prop](../../../.readme/diagram-vue3-component-base-customize-theme.png)

  Pass a [string](#set-the-base-components-theme-with-the-theme-prop) or [`Theme`]("../../shared/theme/README.md#make-a-theme-object") object into the base component's [`:theme`](#set-the-base-components-theme-with-the-theme-prop) prop to customize the styles that it will provide to your component. You choose the theme, and the base component turns it into CSS for you.

- **Theme your component, without writing a single CSS selector, by adding the base component's styles to your component.**

  <!-- need a storybook that shows base component style properties, with gif that links to it  -->

  ![Use the functions in the `Theme` slot prop to style your component's markup](../../../.readme/diagram-vue3-component-base-theme-your-component.png)

  The base component's [`Theme`](#style–your–component–with-the-base-components-theme-slot-prop) slot prop contains all of the CSS you need to style your component. All you need to do reach into it, grab the styles you need, and bind them to your markup's `:style` attributes. It will even update your component's appearance in response to user interactions - no `:hover` or `:active` selectors required!

- **Show a placeholder while your component loads, without writing a single line of code.**

  <!-- need a storybook that shows default and custom placeholders, with gif that links to it -->

  ![Use the `<template v-slot:"fallback">` to customize your component's placeholder](../../../.readme/diagram-vue3-component-base-fallback-slot.png)

  The base component implements the Vue 3 [suspense](https://v3.vuejs.org/guide/migration/suspense.html#suspense) API, so you don't have to. If your component loads asynchronously, the base component will automatically show a [blockframe](https://medium.com/ux-power-tools/blockframing-and-31-free-sketch-ready-layouts-using-auto-layout-by-anima-app-1be039007ecf) while it's loading. If you'd like to customize the blockframe, all you need to do is [insert your own markup](#display-a-custom-placeholder-while-your-component-is-loading) into the base component's fallback slot.

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

3.  Add `BaseComponent` to your Vue 3 component's template:

    <pre><code class="language-vue">&lt;template&gt;
      &lt;BaseComponent 
        &lt;!-- use the following props to add affordances to your component --&gt;
        isHoverable 
        isPeekable 
        isPressable 
        isToggleable 
        isDraggable 
        isSnappable 
        isSelectable 
        isCopyable 
        isPasteable 
        isReplicable 
        isEditable
      
        &lt;!-- use the `theme` prop to set the base component's theme --&gt;
        :theme="'ios'"
          &lt;!-- 
            accepted values for theme are:
            * 'ios',
            * 'macos',
            * 'tvos',
            * 'android',
            * 'windows',
            * 'gtk',
            * 'web', 
            * or any <a href="../../shared/theme/README.md#make-a-theme-object">Theme object</a>. 
          --&gt;
          
        &lt;!-- use the following events to run your component's methods --&gt;
          
          @stateChange=""
          @pointerInput=""
          @focusInput=""
          @keyboardInput=""
          @dragInput=""
          @scrollInput=""
        
      &gt;
      
        &lt;v-slot:default="{ State }"&gt;
          
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

Unlike a website, a web app demands a high level of interactivity. You can't just apply styles to HTML markup. You have to split your markup into reusable pieces, and give each of them **affordances**: user interactions to which they respond. The base component makes this automatic. You choose the affordances and the base component applies them to your markup. It does this by translating user interactions into changes in your markup's **state** and **appearance**.

- A state is a set of rules that determine how user interaction affects your markup.

  For example, if your markup is in a 'not pressed' state, then any click or tap will transition it into a 'pressed' state. On the other hand, if your markup is already in a 'pressed' state, then the same clicks and taps will have no effect.

- Appearance is a visual indication of state. When state changes, appearance changes accordingly.

  For example, if your markup transitions from a 'not pressed' state to a 'pressed' state, then its fill, border, shadow and text color will change.

All UI components need to have at least a few states in order to respond to user interaction. Without the base component, you would have to write the code that turns this user interaction into states and appearances by yourself.

### Toggle the base component's affordances:

What's the difference between a button, a switch and a field? If you answered, "their affordances", you're right! The UI components in your library almost certainly differ in their affordances. It's up to you to choose the right ones for each of them. This can get complicated, because affordances are dependent: it's impossible to have certain affordances without others. For example, a UI component can't be pressed if it can't be hovered and it can't be toggled if it can't be pressed. Before you can choose affordances for your component, you have to learn what they do, and how they depend on each other.

For the most part, any UI component can have some, or all of the following affordances:

<table>
<thead>
  <tr>
  <th align="left">Affordance</th>
  <th align="left">User Interaction</th>
  <th colspan="3">State Change</th>
  </tr>
</thead>
<tbody>
  <!-- !Hoverable -->
  <tr>
    <td align="left" rowspan="2">Hoverable <!-- need to add gif, or svg animation of the affordance --></td>
    <td align="left">Mouse cursor occludes UI component:</td>
    <td rowspan="2">Not Hovered</td>
    <td>→</td>
    <td rowspan="2">Hovered</td>
  </tr>
  <tr>
    <td>Mouse cursor stops occluding UI component:</td>
    <td>←</td>
  </tr>
  <!-- !Peekable -->
  <tr>
    <td align="left" rowspan="4">Peekable <!-- need to add gif, or svg animation of the affordance --></td>
    <td align="left">Mouse cursor occludes UI component:</td>
    <td rowspan="2">Not Hovered, Not Peeked</td>
    <td>→</td>
    <td rowspan="2">Hovered, Peeked</td>
  </tr>
  <tr>
    <td>Mouse cursor stops occluding UI component:</td>
    <td>←</td>
  </tr>
  <tr>
    <td>Fingertip presses and holds UI component:</td>
    <td rowspan="2">Not Peeked</td>
    <td>→</td>
    <td rowspan="2">Peeked</td>
  </tr>
  <tr>
    <td>Fingertip releases UI component:</td>
    <td>←</td>
  </tr>
  <!-- !Pressable -->
  <tr>
    <td align="left" rowspan="4">Pressable <!-- need to add gif, or svg animation of the affordance --></td>
    <td align="left">Mouse cursor presses UI component:</td>
    <td rowspan="1">Hovered, Not Pressed</td>
    <td rowspan="2">→</td>
    <td rowspan="4">Pressed</td>
  </tr>
  <tr>
    <td>Fingertip presses UI component:</td>
    <td>Not Pressed</td>
  </tr>
  <tr>
    <td>Mouse cursor releases UI component:</td>
    <td>Hovered, Not Pressed</td>
    <td rowspan="2">←</td>
  </tr>
  <tr>
    <td>Fingertip releases UI component:</td>
    <td>Not Pressed</td>
  </tr>
  <!-- !Toggleable -->
  <tr>
    <td align="left" rowspan="4">Toggleable <!-- need to add gif, or svg animation of the affordance --></td>
    <td align="left">Mouse cursor presses UI component:</td>
    <td rowspan="1">Hovered, Not Toggled</td>
    <td rowspan="2">→</td>
    <td rowspan="4">Toggled</td>
  </tr>
  <tr>
    <td>Fingertip presses UI component:</td>
    <td>Not Toggled</td>
  </tr>
  <tr>
    <td>Mouse cursor releases UI component:</td>
    <td>Hovered, Not Toggled</td>
    <td rowspan="2">←</td>
  </tr>
  <tr>
    <td>Fingertip releases UI component:</td>
    <td>Not Toggled</td>
  </tr>
  <!-- !Draggable -->
  <tr>
    <td align="left" rowspan="4">Draggable <!-- need to add gif, or svg animation of the affordance --></td>
    <td align="left">Mouse cursor presses and pulls UI component:</td>
    <td rowspan="1">Hovered, Not Dragging</td>
    <td rowspan="2">→</td>
    <td rowspan="4">Dragging</td>
  </tr>
  <tr>
    <td>Fingertip presses and pulls UI component:</td>
    <td>Not Dragging</td>
  </tr>
  <tr>
    <td>Mouse cursor releases UI component:</td>
    <td>Hovered, Not Dragging</td>
    <td rowspan="2">←</td>
  </tr>
  <tr>
    <td>Fingertip releases UI component:</td>
    <td>Not Dragging</td>
  </tr>
  <!-- !Snappable -->
  <tr>
    <td align="left" rowspan="4">Snappable <!-- need to add gif, or svg animation of the affordance --></td>
    <td align="left">Mouse cursor presses and pulls UI component:</td>
    <td rowspan="4">Dragging</td>
    <td rowspan="2">→</td>
    <td rowspan="4">Snapped</td>
  </tr>
  <tr>
    <td>Fingertip presses and pulls UI component:</td>
  </tr>
  <tr>
    <td>Mouse cursor releases UI component:</td>
    <td rowspan="2">←</td>
  </tr>
  <tr>
    <td>Fingertip releases UI component:</td>
  </tr>
  <!-- !Selectable -->
  <tr>
    <td align="left" rowspan="4">Selectable<!-- need to add gif, or svg animation of the affordance --><br/><br/>Note that 'selectable' is distinct from 'toggleable'. If a component is selectable, then its <em>contents</em> can be copied to a clipboard when it is selected. If a component is toggleable, its contents cannot be copied to a clipboard when it is toggled.</td>
    <td align="left">Mouse cursor presses and releases UI component:</td>
    <td rowspan="2">Pressed, Not Selected</td>
    <td rowspan="2">→</td>
    <td rowspan="2">Selected</td>
  </tr>
  <tr>
    <td>Fingertip presses and releases UI component:</td>
  </tr>
  <tr>
    <td>Mouse cursor presses and releases UI component:</td>
    <td rowspan="2">Pressed, Selected</td>
    <td rowspan="2">→</td>
    <td rowspan="2">Not Selected</td>
  </tr>
  <tr>
    <td>Fingertip presses and releases UI component:</td>
  </tr>
  <!-- !Focusable -->
  <tr>
    <td align="left" rowspan="4">Focusable <!-- need to add gif, or svg animation of the affordance --></td>
    <td align="left">Mouse cursor releases UI component:</td>
    <td rowspan="2">Pressed, Not Focused</td>
    <td rowspan="2">→</td>
    <td rowspan="4">Not Pressed, Focused</td>
  </tr>
  <tr>
    <td>Fingertip releases UI component:</td>
  </tr>
  <tr>
    <td>Mouse cursor presses a different UI component:</td>
    <td rowspan="3">Not Focused</td>
    <td rowspan="3">←</td>
  </tr>
  <tr>
    <td>Fingertip presses a different UI component:</td>
  </tr>
  </tbody>
  </table>

Notice that most of these affordances depend on the 'Pressable' affordance, and all of them depend on the 'Hoverable' affordance. You can't make a UI component toggleable if it isn't pressable. You can't make it pressable if it isn't hoverable.

![All affordances depend on the `Hoverable` affordance, and most depend on the `Pressable` affordance](../../../.readme/diagram-vue3-component-base-affordance-dependencies.png)

If you're thinking "ok, all of this is super, but which affordances do _I_ need for _my component_?", here are a few examples:

<table>
<thead>
  <tr>
  <th align="left">Type of UI component:</th>
  <th align="left" colspan="4">Affordances needed:</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td align="left">Tooltip <!-- need to show gif of component, gif should link to storybook --></td>
    <td align="left" rowspan="4" valign="top">Hoverable</td>
    <td align="left" valign="top">Peekable</td>
    <td rowspan="2"></td>
    <td rowspan="3"></td>
  </tr>
  <tr>
    <td align="left">Button <!-- need to show gif of component, gif should link to storybook --></td>
    <td align="left" rowspan="3" valign="top">Pressable</td>
  </tr>
  <tr>
    <td align="left">List Item <!-- need to show gif of component, gif should link to storybook --></td>
    <td align="left" rowspan="2" valign="top">Selectable</td>
  </tr>
  <tr>
    <td align="left">Text Field <!-- need to show gif of component, gif should link to storybook --></td>
    <td align="left" valign="top">Focusable</td>
  </tr>
</tbody>
</table>

Use the following [props](https://v3.vuejs.org/guide/component-props.html) to tell the base component what affordances it should add to your UI component:

<table>
<thead>
  <tr>
    <th align="left">Prop</th>
    <th align="left">What it does:</th>
    <th align="left">What it depends on:</th>
    <th align="left">How to use it:</th>
  </tr>
</thead>
<tbody>
  <tr>
  <td align="left"><code>isHoverable</code></td>
  <td align="left">Adds the 'hoverable' affordance to your component</td>
  <td align="left">Nothing</td>
  <td><pre>
  <code>
  &lt;template&gt;
    &lt;BaseComponent <strong>isHoverable</strong>&gt;<br/>
      &lt;template v-slot:default="{State}"&gt;<br/>
      &lt;template&gt;<br/>
    &lt;/BaseComponent&gt;
  &lt;/template&gt;
  </code>
  </pre></td>
  </tr>
  <tr>
  <td align="left"><code>isPeekable</code></td>
  <td align="left">Adds the 'peekable' affordance to your component</td>
  <td align="left"><code>isHoverable</code></td>
  <td><pre>
  <code class="language-vue">
  &lt;template&gt;
    &lt;BaseComponent <strong>isPeekable</strong> isHoverable&gt;<br/>
      &lt;template v-slot:default="{State}"&gt;<br/>
      &lt;template&gt;<br/>
    &lt;/BaseComponent&gt;
  &lt;/template&gt;
  </code>
  </pre></td>
  </tr>
  <tr>
  <td align="left"><code>isPressable</code></td>
  <td align="left">Adds the 'pressable' affordance to your component</td>
  <td align="left"><code>isHoverable</code></td>
  <td><pre>
  <code class="language-vue">
  &lt;template&gt;
    &lt;BaseComponent <strong>isPressable</strong> isHoverable&gt;<br/>
      &lt;template v-slot:default="{State}"&gt;<br/>
      &lt;template&gt;<br/>
    &lt;/BaseComponent&gt;
  &lt;/template&gt;
  </code>
  </pre></td>
  </tr>
  <tr>
  <td align="left"><code>isToggleable</code></td>
  <td align="left">Adds the 'toggleable' affordance to your component</td>
  <td align="left"><code>isHoverable</code><code>isPressable</code></td>
  <td><pre>
  <code class="language-vue">
  &lt;template&gt;
    &lt;BaseComponent <strong>isToggleable</strong> isPressable isHoverable&gt;<br/>
      &lt;template v-slot:default="{State}"&gt;<br/>
      &lt;template&gt;<br/>
    &lt;/BaseComponent&gt;
  &lt;/template&gt;
  </code>
  </pre></td>
  </tr>
  <tr>
  <td align="left"><code>isDraggable</code></td>
  <td align="left">Adds the 'draggable' affordance to your component</td>
  <td align="left"><code>isHoverable</code><code>isPressable</code></td>
  <td><pre>
  <code class="language-vue">
  &lt;template&gt;
    &lt;BaseComponent <strong>isDraggable</strong> isPressable isHoverable&gt;<br/>
      &lt;template v-slot:default="{State}"&gt;<br/>
      &lt;template&gt;<br/>
    &lt;/BaseComponent&gt;
  &lt;/template&gt;
  </code>
  </pre></td>
  </tr>
  <tr>
  <td align="left"><code>isSnappable</code></td>
  <td align="left">Adds the 'snappable' affordance to your component</td>
  <td align="left"><code>isHoverable</code><code>isPressable</code><code>isDraggable</code></td>
  <td><pre>
  <code class="language-vue">
  &lt;template&gt;
    &lt;BaseComponent <strong>isSnappable</strong> isDraggable isPressable isHoverable&gt;<br/>
      &lt;template v-slot:default="{State}"&gt;<br/>
      &lt;template&gt;<br/>
    &lt;/BaseComponent&gt;
  &lt;/template&gt;
  </code>
  </pre></td>
  </tr>
  <tr>
  <td align="left"><code>isSelectable</code></td>
  <td align="left">Adds the 'selectable' affordance to your component</td>
  <td align="left"><code>isHoverable</code><code>isPressable</code></td>
  <td><pre>
  <code class="language-vue">
  &lt;template&gt;
    &lt;BaseComponent <strong>isSelectable</strong> isPressable isHoverable&gt;<br/>
      &lt;template v-slot:default="{State}"&gt;<br/>
      &lt;template&gt;<br/>
    &lt;/BaseComponent&gt;
  &lt;/template&gt;
  </code>
  </pre></td>
  </tr>
  <tr>
  <td align="left"><code>isFocusable</code></td>
  <td align="left">Adds the 'focusable' affordance to your component</td>
  <td align="left"><code>isHoverable</code><code>isPressable</code</td>
  <td><pre>
  <code class="language-vue">
  &lt;template&gt;
    &lt;BaseComponent <strong>isFocusable</strong> isPressable isHoverable&gt;<br/>
      &lt;template v-slot:default="{State}"&gt;<br/>
      &lt;template&gt;<br/>
    &lt;/BaseComponent&gt;
  &lt;/template&gt;
  </code>
  </pre></td>
  </tr>
</tbody>
</table>

Although most affordances depend on others, you have to manually specify each affordance you want to add to your UI component. For example:

- If you want to make your UI component focusable, you not only need to add the `isFocusable` prop, but also the `isPressable` and `isHoverable` prop to the base component.

- If you want to make your UI component snappable, you not only need to add the `isSnappable` prop, but also the `isDraggable`, `isPressable` and `isHoverable` props to the base component.

This is by design. Each prop is a flag: its presence enables the corresponding affordance. Its absence disables it. If you omit a dependent affordance, the base component will still handle its corresponding user interactions. It just won't update your markup's state or appearance in response. While this isn't usually the behavior you want, sometimes it can be very useful. For example:

- You add the `isDraggable` prop to the base component, but omit the `isPressable` and `isHoverable` props, because you want your UI component to follow your mouse or fingertip when you press it, without changing its appearance when it is hovered or pressed.

- You add the `isToggleable` prop to the base component, but omit the `isPressable` and `isHoverable` props, because you want your UI component to change its appearance when you toggle it, even as it maintains the same appearance when you hover on or press it.

### Wrap your component's template in the base component's default slot:

Once you choose the affordances you want your UI component to have, it's up to the base component to apply them. It can't do that until you insert your component's markup into the base component's default slot. If you haven't used Vue slots, think of them as a way to swap out the base component's markup, without swapping out its script. In other words, you're changing the way the base component _looks_, without changing what it actually does.

![The base component receives props and user interactions, and returns slot props.](../../../.readme/diagram-vue3-component-base-receives-returns.png)

The base component uses [Vue custom events](https://v3.vuejs.org/guide/component-custom-events.html#custom-events) and [slot props](https://v3.vuejs.org/guide/component-slots.html#abbreviated-syntax-for-lone-default-slots) to apply affordances to your markup. It supplies you with several of these values, each of which change whenever the base component handles a user interaction.

<table>
<thead>
<tr>
<th align="left">Custom Event</th>
<th align="left">When it emits:</th>
<th align="left">What it contains:</th>
<th align="left">How to access it:</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><code>stateChange</code></td>
<td align="left">whenever a user interaction changes your UI component's state.</td>
<td align="left">Your component's previous and current <a href="#use-the-pointerinput-focusinput-keyboardinput-draginput-and-scrollinput-custom-events-to-respond-to-every-user-interaction-all-the-time">state</a>.</td>
<td align="left">
In your component's template:
<pre><code class="language-vue">
&lt;template&gt;
  &lt;BaseComponent <strong>@stateChange=""</strong>&gt;
    &lt;template&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>pointerInput</code></td>
<td align="left">whenever a mouse cursor or fingertip interacts with your UI component.</td>
<td align="left">The <a href="#use-the-pointerinput-focusinput-keyboardinput-draginput-and-scrollinput-custom-events-to-respond-to-every-user-interaction-all-the-time">location, interaction and movement</a> of the mouse cursor or fingertip.</td>
<td align="left">
In your component's template:
<pre><code class="language-vue">
&lt;template&gt;
  &lt;BaseComponent <strong>@pointerInput=""</strong>&gt;
    &lt;template&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>focusInput</code></td>
<td align="left">whenever the text, images, or other content in your component are manipulated. <!-- is this totally accurate?? --></td>
<td align="left">The <a href="#use-the-pointerinput-focusinput-keyboardinput-draginput-and-scrollinput-custom-events-to-respond-to-every-user-interaction-all-the-time">modifications</a> to the text, images, or other content in your component</td>
<td align="left">
In your component's template:
<pre><code class="language-vue">
&lt;template&gt;
  &lt;BaseComponent <strong>@focusInput=""</strong>&gt;
    &lt;template&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>keyboardInput</code></td>
<td align="left">whenever a keypress interacts with your UI component.</td>
<td align="left">The <a href="#use-the-pointerinput-focusinput-keyboardinput-draginput-and-scrollinput-custom-events-to-respond-to-every-user-interaction-all-the-time">keys and duration</a> of the keypress.</td>
<td align="left">
In your component's template:
<pre><code class="language-vue">
&lt;template&gt;
  &lt;BaseComponent <strong>@keyboardInput=""</strong>&gt;
    &lt;template&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>dragInput</code></td>
<td align="left">whenever a mouse or fingertip pulls your component.</td>
<td align="left">The <a href="#use-the-pointerinput-focusinput-keyboardinput-draginput-and-scrollinput-custom-events-to-respond-to-every-user-interaction-all-the-time">location, interaction, movement and payload</a> of the drag session.</td>
<td align="left">
In your component's template:
<pre><code class="language-vue">
&lt;template&gt;
  &lt;BaseComponent <strong>@dragInput=""</strong>&gt;
    &lt;template&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>scrollInput</code></td>
<td align="left">whenever a mouse or fingertip scrolls your component.</td>
<td align="left"><a href="#use-the-pointerinput-focusinput-keyboardinput-draginput-and-scrollinput-custom-events-to-respond-to-every-user-interaction-all-the-time">The location, interaction and movement</a> of the scroll.</td>
<td align="left">
In your component's template:
<pre><code class="language-vue">
&lt;template&gt;
  &lt;BaseComponent <strong>@scrollInput=""</strong>&gt;
    &lt;template&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
</tbody>
</table>
<br/>
<table>
<thead>
<tr>
<th align="left">Slot Prop</th>
<th align="left">When it updates:</th>
<th align="left">What it contains:</th>
<th align="left">How to access it:</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><code>Theme</code></td>
<td align="left">whenever the base component emits a <code>stateChange</code> event.</td>
<td align="left"><a href="#style-your-component-with-the-base-components-theme-slot-prop">CSS styles</a> for your component's text and fill</td>
<td align="left">
In your component's template:
<pre><code class="language-vue">
&lt;template&gt;
  &lt;BaseComponent&gt;
    &lt;template v-slot:default="{<strong>Theme</strong>}"&gt;<br/>
      &lt;!-- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" target="_blank">Destructure</a> the styles you want from <strong>Theme</strong> and pass them as a <a href="https://v3.vuejs.org/guide/component-props.html#props" target="_blank">prop</a> in your markup here --&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
</tbody>
</table>

#### Use the `stateChange` custom event to run methods when your component's state changes.

You probably want your components to affect your app. For example, when a it transitions from a 'not pressed' to a 'pressed' state, you probably want it to _do_ something. Maybe you want it to show or hide a menu, apply a setting, or submit user input. Although the base component will update your component's state and appearance, it won't handle any business logic. That's up to you. To make your component useful, you need to run your business logic when your component's state changes. To do this, wrap your logic in a method, and use the base component's [`stateChange`]() <!-- need to link to the typescript def --> event to trigger it:

<table>
<tr>
<td align="left" valign="top"><ol><li value="1">
Define the method you want to run each time the base component emits a <code>stateChange</code> event. In this example, that's the <code>doSomething</code> method.
<ul>
  <li>Make sure your method accepts the following arguments:</li><br/>
  <table>
  <thead>
  <tr>
  <th>Argument</th><th>What it contains:</th><th>Example:</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>newState</code></td>
    <td rowspan="">Array that contains zero or more strings from the <code><a href="">BaseComponent.state</a></code> enum. This array is the state that your component just transitioned into.</td>
    <td><code>['pressed', 'selected']<code></td></tr>
  <tr>
    <td><code>oldState</code></td>
    <td>Array that contains zero or more strings from the <code><a href="">BaseComponent.state</a></code> enum. This array is the state that your component just transitioned out of.</td>
    <td><code>['hovered']</code></td></tr>
  <tr>
    <td><code>input</code></td>
    <td>An array of zero or more user interactions that caused the transition. User interactions are of type <code><a href="">BaseComponent.input</a></code>.</td>
    <td>
  <pre>
  <code>
  [{
    type: 'mousedown',
    timestamp: 5376,
    eventInfo: {
      relative:{
        x: 100.86220352,
        y: 225.23209234,
        xPercent: .48230237204,
        yPercent: .55220027620,
        dxPercent: .120347603476,
        dyPercent: .052037453407,
      },
      viewport:{
        dx: .06222352352,
        dy: .03242502735,
      }
    }
  }]
  </code>
  </pre>
  </td></tr>
  </tbody>
  </table>
</ul>
</li></ol></td>
<td>
<pre>
<code class="language-typescript">
&lt;template&gt;
  &lt;BaseComponent isHoverable isPressable&gt;
    &lt;template v-slot:default="{ Theme }"&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script lang="ts"&gt;<br/>
import { DefineComponent } from 'vue'
import BaseComponent from '@incremental.design/vue3-component-base'<br>
export default defineComponent({<br/>
  methods:{
    <strong>doSomething({
      newState: Array&lt;<a href="">BaseComponent.state</a>&gt;, 
      oldState: Array&lt;<a href="">BaseComponent.state</a>&gt;, 
      input: Array&lt;<a href="">BaseComponent.input</a>&gt;
      })</strong> 
    {<br/>
     /* your method goes here */<br/>
    }
  }<br/>
});
&lt;/script&gt;<br/>
</code>
</pre>
</td>
<tr>
<!--  -->
<tr>
<td align="left" valign="top"><ol><li value="2">
Bind the <code>stateChange</code> event to the method you just defined. 
<ul>
<li>Whenever the base component emits a <code>stateChange</code> event, it will pass the <code>newState</code>, <code>oldState</code> and <code>input</code> to your method.
</ul>
</li></ol></td>
<td>
<pre>
<code class="language-typescript">
&lt;template&gt;
  &lt;BaseComponent <strong>@stateChange="doSomething"</strong> isHoverable isPressable&gt;
    &lt;template v-slot:default="{ Theme }"&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script lang="ts"&gt;<br/>
import { DefineComponent } from 'vue'
import BaseComponent from '@incremental.design/vue3-component-base'<br>
export default defineComponent({<br/>
  methods:{
    doSomething({
      newState: Array&lt;<a href="">BaseComponent.state</a>&gt;, 
      oldState: Array&lt;<a href="">BaseComponent.state</a>&gt;, 
      input: Array&lt;<a href="">BaseComponent.input</a>&gt;
      })
    {<br/>
     /* your method goes here */<br/>
    }
  }<br/>
});
&lt;/script&gt;<br/>
</code>
</pre>
</td>
<tr>
</table>

Once you set up this method, you can conditionally execute business logic, depending on the value of `currentState`, `oldState` and `input`. Most of the time, you'll only need `currentState`, but for more advanced behaviors, you might want the `oldState` and `input` as well. Keep in mind that all of these arguments are _arrays_. This is by design. It makes **compound** states and inputs - states that are a union of two or more states, and inputs that are a union of two or more inputs, respectively - easy to parse. For example:

| Compound State       | How it's represented in the `currentState` and `previousState` arrays: |
| :------------------- | :--------------------------------------------------------------------- |
| Pressed and Selected | `['pressed', 'selected']`                                              |
| Hovered and Peeked   | `['hovered', 'peeked']`                                                |

<br/>

<table>
<thead>
<tr>
<th align="left">Compound Interaction</th>
<th align="left">How it's represented in the <code>input</code> array:</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Mousedown and Alt-Key Keydown</td>
<td align="left">
<pre>
<code>
[{
  type: 'mousedown',
  timestamp: 5376,
  eventInfo: {
    relative:{
      x: 100.86220352,
      y: 225.23209234,
      xPercent: .48230237204,
      yPercent: .55220027620,
      dxPercent: .120347603476,
      dyPercent: .052037453407,
    },
    viewport:{
      dx: .06222352352,
      dy: .03242502735,
    }
  }
},
{
type: 'keydown',
timestamp: 5376,
eventInfo: {
    TBD <!-- need to define -->
}
}]
</code>
</pre>
</td>
</tr>
<tr>
<td align="left">Ctrl-Key Keydown and Alt-Key Keydown</td>
<td align="left">
<pre>
<code>
[{
type: 'keydown',
timestamp: 5376,
eventInfo: {
  TBD  <!-- need to define -->
}
},
{
type: 'keydown',
timestamp: 5376,
eventInfo: {
  TBD  <!-- need to define -->
}
}]
</code>
</pre>
</td>
</tr>
</tbody>
</table>

These arguments can also be _empty_ arrays. Once again, this is by design. The presence of a <code><a href="">BaseComponent.state</a></code> <!-- need to add link! --> indicates that the component is in that state. The absence indicates that the component is _not_ in that state. For example:

| State                                  | `newState` or `oldState` array: |
| :------------------------------------- | :------------------------------ |
| Not Hovered, Pressed, Selected         | `['pressed', 'selected']`       |
| Hovered, Not Pressed, Not Selected     | `['hovered']`                   |
| Not Hovered, Not Pressed, Not Selected | `[]`                            |

There is exactly _one_ <code><a href="">BaseComponent.state</a></code> <!-- need to add link! --> for each affordance. Of these, your component can only have the ones that correspond to the affordances you chose for it. In other words, a state can only appear in the `newState` and `oldState` arrays if you specifically add the prop for the corresponding affordance to the base component:

| Affordance | Prop           | Corresponding `BaseComponent.state`: |
| :--------- | :------------- | :----------------------------------- |
| Hoverable  | `isHoverable`  | `hovered`                            |
| Peekable   | `isPeekable`   | `peeked`                             |
| Pressable  | `isPressable`  | `pressed`                            |
| Toggleable | `isToggleable` | `toggled`                            |
| Draggable  | `isDraggable`  | `dragging`                           |
| Snappable  | `isSnappable`  | `snapped`                            |
| Selectable | `isSelectable` | `selected`                           |
| Focusable  | `isFocusable`  | `focused`                            |

To conditionally execute your business logic, all you need to do is add a `switch()` statement to the method you bound to the base component's `stateChange` event. This switch statement should contain a case for each of your component's possible `BaseComponent.state`s.

The possible values of `baseComponent.input` are similarly limited. Although they are objects with nested properties, rather than strings, they all conform to the [`EventInfo`](../../shared/device-input-event-handlers/src/event-handlers/handler-utils/EventInfo.ts) type. This means that they contain a `type`, `timestamp`, and `input` property. The `input` property will always be an object of type [`DragInput`](../../shared/device-input-event-handlers/src/README.md#draginput), [`DeviceInput`](../../shared/device-input-event-handlers/src/README.md#deviceinput), [`GamepadInput`](../../shared/device-input-event-handlers/src/README.md#gamepadinput), [`ScrollInput`](../../shared/device-input-event-handlers/src/README.md#scrollinput), [`FocusInput`](../../shared/device-input-event-handlers/src/README.md#focusinput), [`KeyboardInput`](../../shared/device-input-event-handlers/src/README.md#keyboardinput), or [`PointerInput`](../../shared/device-input-event-handlers/src/README.md#pointerinput). Each of these types contains all sorts of useful information about the user interaction that triggered the state change. While you don't _need_ to use the values of `input` to trigger your component's business logic, you can increase your component's level of interactivity by incorporating them into it.

#### Use the `pointerInput`, `focusInput`, `keyboardInput`, `dragInput`, and `scrollInput` custom events to respond to every user interaction, all the time.

<!-- * why?
 * desired outcome

    higher level of interactivity, you want components that go beyond simple clicks, taps and presses. you want to make components that respond to even the most minute movements (show gif of fluent design)

 * underlying problem

    it turns out that most user interaction is continuous. it's not enough to listen to discrete state changes. you have to listen to everything a user is doing.

 * action

    hook into the

 * compare action to doing nothing -->

If you want to take your UI components to the next level, you can't just trigger business logic on state changes. That's because most user interaction is continuous - not discrete. And although the base component reduces continuous interaction into discrete state changes, your components need to show users that they're _always_ listening. They need to respond to _everything_ a user does - every mouse movement, every touch, every scroll, every keypress - regardless of whether it triggers a state change. The base component makes this trivial. It already handles every user interaction your component receives. Even better, it translates each of them into an [`EventInfo`](../../shared/device-input-event-handlers/src/event-handlers/handler-utils/EventInfo.ts) object. Just like the [`EventInfo`](../../shared/device-input-event-handlers/src/event-handlers/handler-utils/EventInfo.ts) objects contained within the `stateChange` event's `input` array, these objects contain a `type`, `timestamp`, and `input` field:

<Table>
<thead>
<tr><th colspan="3"><code><a href="../../shared/device-input-event-handlers/src/event-handlers/handler-utils/EventInfo.ts">EventInfo</a></code> Object</th></tr>
<tr><th><code>type</code></th><th><code>timestamp</code></th><th><code>input</code></th></tr>
</thead>
<tbody>
<tr>
<td>String that is one of: <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event" target="_blank">auxclick</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event" target="_blank">click</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event" target="_blank">contextmenu</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event" target="_blank">dblclick</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event" target="_blank">mousedown</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event" target="_blank">mouseenter</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event" target="_blank">mouseleave</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event" target="_blank">mouseout</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event" target="_blank">mouseover</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event" target="_blank">mouseup</a></code>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event"><code>touchcancel</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchend_event"><code>touchend</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchmove_event"><code>touchmove</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event"><code>touchstart</code></a></td>
<td rowspan="5">number of milliseconds since page load</td>
<td><code><a href="../../shared/device-input-event-handlers/src/README.md#pointerinput">PointerInput</a></code> object</td>
</tr>
<tr>
<td>String that is one of: <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event" target="_blank">blur</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event" target="_blank">focus</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event" target="_blank">blur</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event" target="_blank">focusout</a></code></td>
<td><code><a href="../../shared/device-input-event-handlers/src/README.md#focusinput">FocusInput</a></code> object</td>
</tr>
<tr>
<td>String that is one of: <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event" target="_blank">keydown</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event" target="_blank">keyup</a></code></td>
<td><code><a href="../../shared/device-input-event-handlers/src/README.md#keyboardinput">KeyboardInput</a></code> object</td>
</tr>
<tr>
<td>String that is one of: <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event" target="_blank">drag</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragend_event" target="_blank">dragend</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event" target="_blank">dragenter</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragleave_event" target="_blank">dragleave</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event" target="_blank">dragover</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event" target="_blank">dragstart</a></code>,  <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event" target="_blank">drop</a></code></td>
<td><code><a href="../../shared/device-input-event-handlers/src/README.md#draginput">DragInput</a></code> object</td>
</tr>
<tr>
<td>String that is one of: <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event" target="_blank">scroll</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">wheel</a></code></td>
<td><code><a href="../../shared/device-input-event-handlers/src/README.md#scrollinput">ScrollInput</a></code> object</td>
</tr>
</tbody>
</Table>

The base component emits five distinct custom events: one for each type of `input`. This makes it effortless to filter the interactions that matter to you. If you only want to respond to keyboard interactions, just bind a method to the `keyboardInput` event. If you only want to respond to mouse and touch events, just bind a method to the `pointerInput` event. Each of the following five events passes a single [`EventInfo`](../../shared/device-input-event-handlers/src/event-handlers/handler-utils/EventInfo.ts) object into the method you bind to them.

<table>
<thead>
<tr>
<th>Custom Event</th><th>How to use it:</th>
</tr>
</thead>
<tbody>
<!--  -->
<tr>
<td><code>pointerInput</code></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>@pointerInput="doSomething"</strong>&gt;
    &lt;template v-slot:default&gt;
     &lt;!-- your markup here --&gt;
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script lang="ts"&gt;<br/>
import { defineComponent } from 'vue';
import BaseComponent from '@incremental.design/vue3-component-base';<br/>
export default defineComponent({<br/>
  methods:{<br/>
    doSomething({type: string, timestamp: number, input: <a href="../../shared/device-input-event-handlers/src/README.md#pointerinput">PointerInput</a>}){<br/>
      // your logic here<br/>
    }
  }
})
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
<!--  -->
<tr>
<td><code>focusInput</code></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>@focusInput="doSomething"</strong>&gt;
    &lt;template v-slot:default&gt;
     &lt;!-- your markup here --&gt;
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script lang="ts"&gt;<br/>
import { defineComponent } from 'vue';
import BaseComponent from '@incremental.design/vue3-component-base';<br/>
export default defineComponent({<br/>
  methods:{<br/>
    doSomething({type: string, timestamp: number, input: <a href="../../shared/device-input-event-handlers/src/README.md#focusinput">FocusInput</a>}){<br/>
      // your logic here<br/>
    }
  }
})
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
<!--  -->
<tr>
<td><code>keyboardInput</code></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>@keyboardInput="doSomething"</strong>&gt;
    &lt;template v-slot:default&gt;
     &lt;!-- your markup here --&gt;
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script lang="ts"&gt;<br/>
import { defineComponent } from 'vue';
import BaseComponent from '@incremental.design/vue3-component-base';<br/>
export default defineComponent({<br/>
  methods:{<br/>
    doSomething({type: string, timestamp: number, input: <a href="../../shared/device-input-event-handlers/src/README.md#keyboardinput">KeyboardInput</a>}){<br/>
      // your logic here<br/>
    }
  }
})
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
<!--  -->
<tr>
<td><code>dragInput</code></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>@dragInput="doSomething"</strong>&gt;
    &lt;template v-slot:default&gt;
     &lt;!-- your markup here --&gt;
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script lang="ts"&gt;<br/>
import { defineComponent } from 'vue';
import BaseComponent from '@incremental.design/vue3-component-base';<br/>
export default defineComponent({<br/>
  methods:{<br/>
    doSomething({type: string, timestamp: number, input: <a href="../../shared/device-input-event-handlers/src/README.md#draginput">DragInput</a>}){<br/>
      // your logic here<br/>
    }
  }
})
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
<!--  -->
<tr>
<td><code>scrollInput</code></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>@scrollInput="doSomething"</strong>&gt;
    &lt;template v-slot:default&gt;
     &lt;!-- your markup here --&gt;
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script lang="ts"&gt;<br/>
import { defineComponent } from 'vue';
import BaseComponent from '@incremental.design/vue3-component-base';<br/>
export default defineComponent({<br/>
  methods:{<br/>
    doSomething({type: string, timestamp: number, input: <a href="../../shared/device-input-event-handlers/src/README.md#scrollinput">ScrollInput</a>}){<br/>
      // your logic here<br/>
    }
  }
})
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
</tbody>
</table>

You can, of course, listen to any combination, or all of these events if you'd like. When you listen to any of these custom events, you don't have to listen to the native events they replace:

<table>
<thead>
<tr>
<th align="left">Custom event</th>
<th align="left">Native events it replaces:</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><code>pointerInput</code></td>
<td align="left"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event" target="_blank">auxclick</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event" target="_blank">click</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event" target="_blank">contextmenu</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event" target="_blank">dblclick</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event" target="_blank">mousedown</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event" target="_blank">mouseenter</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event" target="_blank">mouseleave</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event" target="_blank">mouseout</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event" target="_blank">mouseover</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event" target="_blank">mouseup</a></code></td>
</tr>
<tr>
<td align="left"><code>focusInput</code></td>
<td align="left"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event" target="_blank">blur</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event" target="_blank">focus</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event" target="_blank">blur</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event" target="_blank">focusout</a></code></td>
</tr>
<tr>
<td align="left"><code>keyboardInput</code></td>
<td align="left"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event" target="_blank">keydown</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event" target="_blank">keyup</a></code></td>
</tr>
<tr>
<td align="left"><code>dragInput</code></td>
<td align="left"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event" target="_blank">drag</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragend_event" target="_blank">dragend</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event" target="_blank">dragenter</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragleave_event" target="_blank">dragleave</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event" target="_blank">dragover</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event" target="_blank">dragstart</a></code>,  <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event" target="_blank">drop</a></code></td>
</tr>
<tr>
<td align="left"><code>scrollInput</code></td>
<td align="left"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event" target="_blank">scroll</a></code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">wheel</a></code></td>
</tr>
</tbody>
</table>

### Set the base component's theme with the `theme` prop:

Your app's design system likely prescribes a theme: a set of styles all of your components adopt. Part of making UI components is turning those styles into code. If CSS is your native language, this might sound easy enough. But keep in mind that UI components have to respond to _every_ user interaction. CSS alone won't cut it. You need to drive your CSS with Vue. The base component takes care of this for you. You tell it what kind of theme you want to apply, and it drives ALL of the styles your component needs. Without the base component, you would have to co-mingle your presentation logic with your business logic to affect both your component's styles and your app. The base component moves the presentation logic out of your component.

The base component ships with six preset themes, each of which you can set using the `theme` prop:

<table>
<thead>
<tr>
  <th>Theme</th><th>How to set it</th>
</tr>
</thead>
<tbody>
<!--  -->
<tr>
<td><a href="https://developer.apple.com/design/human-interface-guidelines/ios/overview/themes/" target="_blank"><code>ios</code></a></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>:theme="ios"</strong>&gt;<br/>
    &lt;template v-slot:default="{ Theme }"&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;<br/>
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script&gt;<br/>
  import { defineComponent } from 'vue';
  import BaseComponent from '@incremental.design/vue3-component-base';<br/>
  export default defineComponent({<br/>
    /* your component's <a href="https://v3.vuejs.org/api/options-api.html" target="_blank">options</a> here */<br/>
  })<br/>
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
<!--  -->
<tr>
<td><a href="https://developer.apple.com/design/human-interface-guidelines/macos/overview/themes/" target="_blank"><code>macos</code></a></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>:theme="macos"</strong>&gt;<br/>
    &lt;template v-slot:default="{ Theme }"&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;<br/>
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script&gt;<br/>
  import { defineComponent } from 'vue';
  import BaseComponent from '@incremental.design/vue3-component-base';<br/>
  export default defineComponent({<br/>
    /* your component's <a href="https://v3.vuejs.org/api/options-api.html" target="_blank">options</a> here */<br/>
  })<br/>
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
<!--  -->
<tr>
<td><a href="https://developer.apple.com/design/human-interface-guidelines/tvos/overview/themes/" target="_blank"><code>tvos</code></a></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>:theme="tvos"</strong>&gt;<br/>
    &lt;template v-slot:default="{ Theme }"&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;<br/>
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script&gt;<br/>
  import { defineComponent } from 'vue';
  import BaseComponent from '@incremental.design/vue3-component-base';<br/>
  export default defineComponent({<br/>
    /* your component's <a href="https://v3.vuejs.org/api/options-api.html" target="_blank">options</a> here */<br/>
  })<br/>
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
<!--  -->
<tr>
<td><a href="https://developer.android.com/design" target="_blank"><code>android</code></a></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>:theme="android"</strong>&gt;<br/>
    &lt;template v-slot:default="{ Theme }"&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;<br/>
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script&gt;<br/>
  import { defineComponent } from 'vue';
  import BaseComponent from '@incremental.design/vue3-component-base';<br/>
  export default defineComponent({<br/>
    /* your component's <a href="https://v3.vuejs.org/api/options-api.html" target="_blank">options</a> here */<br/>
  })<br/>
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
<!--  -->
<tr>
<td><a href="https://www.gtk.org/" target="_blank"><code>gtk</code></a></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>:theme="gtk"</strong>&gt;<br/>
    &lt;template v-slot:default="{ Theme }"&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;<br/>
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script&gt;<br/>
  import { defineComponent } from 'vue';
  import BaseComponent from '@incremental.design/vue3-component-base';<br/>
  export default defineComponent({<br/>
    /* your component's <a href="https://v3.vuejs.org/api/options-api.html" target="_blank">options</a> here */<br/>
  })<br/>
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
<!--  -->
<tr>
<td><a href="https://www.microsoft.com/design/fluent/#/" target="_blank"><code>windows</code></a></td>
<td>
<pre>
<code>
&lt;template&gt;
  &lt;BaseComponent <strong>:theme="windows"</strong>&gt;<br/>
    &lt;template v-slot:default="{ Theme }"&gt;<br/>
      &lt;!-- your markup here --&gt;<br/>
    &lt;/template&gt;<br/>
  &lt;/BaseComponent&gt;
&lt;/template&gt;<br/>
&lt;script&gt;<br/>
  import { defineComponent } from 'vue';
  import BaseComponent from '@incremental.design/vue3-component-base';<br/>
  export default defineComponent({<br/>
    /* your component's <a href="https://v3.vuejs.org/api/options-api.html" target="_blank">options</a> here */<br/>
  })<br/>
&lt;/script&gt;
</code>
</pre>
</td>
</tr>
</tbody>
</table>

Keep in mind that props are reactive: changing the value of the prop changes the theme on the fly. This can come in handy when you want to demonstrate the same component with different themes applied to it. In fact, this is the strongest use case for the base component.

If none of the six preset themes fit your design system, you can easily define your own themes using the [`new Theme(...)` constructor](../../shared/theme/README.md). This constructor makes it easy to specify all of the styles that make up your theme: the sizes, shapes, fonts, colors, and elevations. It does all the hard work of turning those styles into CSS for you.

if you don't specify the theme prop, then the base component won't calculate styles for you. This is a great option if you've already written code for your app's theme, and you just want to use the base component's states. In fact, if you don't supply a theme prop, you will actually get a [slight performance boost](#how-incrementaldesign-vue3-component-base), because the base component won't calculate any of the theme's styles.

### Style your component with the base component's `Theme` slot prop:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

<!--

- need to explain that slot prop does more than just deliver state and event inputs,
  need to explain that in the same way that base component breaks affordances into states, it breaks theme into styles

- follow explanation of theme/style with string or Theme object for theme



-->

### Display a custom placeholder while your component is loading:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- - finally need to explain that sometimes the data in a component takes time to load. the base component can wait, and show a placeholder during that time. You can customize the placeholder, and even hook into all of the same slot props you encountered earlier -->

<!-- * how tell if succeeded? -->

### How `incremental.design/vue3-component-base` works:

![The base component listens for HTML events, updates state, and sends the state into the scope of both the default slot and the suspense slot](../../../.readme/vue3-component-base/vue3-component-base-how-it-works.png)

[ ] Explain how execution works. What is the entry point for your code? Which files correspond to which functionality? What is the lifecycle of your project? Are there any singletons, side effects or shared state among instances of your project? Take extra care to explain design decisions. After all, you wrote an ENTIRE codebase around your opinions. Make sure that the people using it understand them.

<!-- need to discuss the performance cost of listening to events and calculating theme. explain that any time you don't listen to an event or destructure the theme slot prop, the base component actually does less work, so you can optimize by making it headless -->

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
