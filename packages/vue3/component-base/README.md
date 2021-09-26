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

  Use the base component's props to add [affordances](toggle-the-base-components-affordances) to your component's markup. Whenever you click, tap, press, or otherwise interact with your component, the base component will update its [`State`](#pass-the-state-slot-prop-into-your-component-to-receive-state-changes-from-the-base-component) slot prop according to the props you supplied. All you need to do wrap your component's markup in the base component's [default slot](#wrap-your-components-template-in-the-base-components-default-slot) and insert the [`State`](#pass-the-state-slot-prop-into-your-component-to-receive-state-changes-from-the-base-component) slot prop into your component's markup to respond to user interaction.

- **Theme your component, without writing a single CSS selector, by adding the base component's styles to your component.**

  <!-- need a storybook that shows base component style properties, with gif that links to it  -->

  ![Use the functions in the `Theme` slot prop to style your component's markup](../../../.readme/diagram-vue3-component-base-theme-your-component.png)

  The base component's [`Theme`](#style–your–component–with-the-base-components-theme-slot-prop) slot prop contains all of the CSS you need to style your component. All you need to do reach into it, grab the styles you need, and bind them to your markup's `:style` attributes. The Theme() function will even update your component's appearance in response to user interactions - no `:hover` or `:active` selectors required!

- **Customize the base component's theme with a single string**

  <!-- need a storybook that cycles a component through different styles, and a gif that links to it -->

  ![Use the `:theme` prop to customize the styles contained in the default slot's `Theme` slot prop](../../../.readme/diagram-vue3-component-base-customize-theme.png)

  Pass a [string](#customize-the-base-components-theme-with-the-theme-prop) or [`Theme`]("../../shared/theme/README.md#make-a-theme-object") object into the base component's [`:theme`](#customize-the-base-components-theme-with-the-theme-prop) prop to customize the styles that it will provide to your component. You choose the theme, and the base component turns it into CSS for you.

- **Show a placeholder while your component loads, without writing a single line of code.**

  <!-- need a storybook that shows default and custom placeholders, with gif that links to it -->

  ![Use the `<template v-slot:"fallback">` to customize your component's placeholder](../../../.readme/diagram-vue3-component-base-fallback-slot.png)

  The base component implements the Vue 3 [suspense](https://v3.vuejs.org/guide/migration/suspense.html#suspense) API, so you don't have to. If your component loads asynchronously, the base component will automatically show a [blockframe](https://medium.com/ux-power-tools/blockframing-and-31-free-sketch-ready-layouts-using-auto-layout-by-anima-app-1be039007ecf) while it's loading. If you'd like to customize the blockframe, all you need to do is [insert your own markup](#display-a-custom-placeholder-while-your-component-is-loading) into the base component's `<template v-slot:fallback/>` slot. Best of all, the fallback slot has the same slot props as the default slot, so your component can respond to user interaction even if it hasn't been loaded.

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

Unlike a website, a web app demands a high level of interactivity. You can't just apply styles to HTML markup. You have to split your markup into reusable pieces, and give each of them **affordances**: user interactions to which they respond. The base component makes this automatic. You choose the affordances and the base component applies them to your markup. It does this by translating user interactions into changes in your markup's **state** and **appearance**.

- A state is a set of rules that determine how user interaction affects your markup.

> For example, if your markup is in a 'not pressed' state, then any mouse click or fingertip tap will transition your markup into a 'pressed' state. On the other hand, if your markup is in a 'pressed' state, then the same clicks and taps will have no effect.

- Appearance is a visual indication of state. When state changes, appearance changes accordingly.

> For example, if your markup transitions from a 'not pressed' state to a 'pressed' state, its fill, border, shadow and text color will change accordingly.

All UI components need to have at least a few states in order to respond to user interaction. Without the base component, you would not only have to write the code that handles user interactions, but also the code that translates them into states and appearances.

### Toggle the base component's affordances:

<!-- * why?
   * desired outcome

   choose the affordances to respond to

   * underlying problem

   there are several different affordances, and some affordances necessitate the others

   * action

   need to understand what each affordance is

   Use

   * compare action to doing nothing


-->

What's the difference between a button, a switch and a field? If you answered, "their affordances", you're right! The UI components in your library almost certainly differ in their affordances. It's up to you to choose the right ones for each of them. This can get complicated, because affordances are dependent: it's impossible to have certain affordances without others. For example, a UI component can't be pressed if it can't be hovered and it can't be selected if it can't be pressed. Before you can choose affordances for your component, you have to learn what they do, and how they depend on each other.

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
    <td align="left" rowspan="4">Selectable <!-- need to add gif, or svg animation of the affordance --></td>
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

Notice that most of these affordances depend on the 'Pressable' affordance, and all of them depend on the 'Hoverable' affordance. You can't make UI component selectable if it isn't pressable. You can't make it pressable if it isn't hoverable.

![All affordances depend on the `Hoverable` affordance, and most depend on the `Pressable` affordance](../../../../.readme/diagram-vue3-component-base-affordance-dependencies.png)

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

Use the following [props](https://v3.vuejs.org/guide/component-props.html) to tell the base component what affordances it should add to your component's markup:

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
  <td align="left"><code></code></td>
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
  <code>
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
  <code>
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
  <code>
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
  <code>
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
  <code>
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
  <code>
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
  <code>
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

Even though most affordances depend on others, you have to manually specify each the affordances you want to add to your markup. For example:

> Even though the 'Focusable' affordance necessitates the 'Pressable' and 'Hoverable' affordances, adding the `isFocusable` prop do the base component won't automatically add the `isPressable` and `isHoverable` props.

> Even though the 'Snappable' affordance necessitates the 'Draggable', 'Pressable' and 'Hoverable' affordances, adding the `isSnappable` prop to the base component won't automatically add the `isDraggable`, `isPressable` or `isHoverable` props.

This is by design. Each prop is a flag. Its presence enables the corresponding affordance. Its absence disables it. If you omit a dependent affordance, the base component will still handle its corresponding user interactions. It just won't update the your markup's state or appearance in response. While this isn't usually the behavior you want, sometimes it can be very useful. For example:

> You want to make a component that doesn't change its appearance when you hover on or press it, but does follow your mouse cursor when you drag it.

> You want to make a component that can be selected, even though it doesn't change its appearance when you depress it with a fingertip or mouse.

### Wrap your component's template in the base component's default slot:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

<!--

turn design system into code how?
  - use base component to handle appearance and interactivity
    - how does it do that?
      - update CSS in response to user interactions?
        - but what does that mean? what CSS, what user interactions?

  - what is a default slot? how do you 'wrap' your component in it? Why does this help respond to user interactions?
    - need to explain that base component receives props and returns slot props. You tell it what affordances it has, and it automatically wires up the necessary event listeners and updates the state
      - need to explain what 'state' is and how it relates to 'affordances' first

    -

  - need to explain that slot prop does more than just deliver state and event inputs,
    need to explain that in the same way that base component breaks affordances into states, it breaks theme into styles

  - follow explanation of theme/style with string or Theme object for theme

  - finally need to explain that sometimes the data in a component takes time to load. the base component can wait, and show a placeholder during that time. You can customize the placeholder, and even hook into all of the same slot props you encountered earlier

-->

Once you choose the affordances you want your UI component to have, it's up to the base component to apply them. It can't do that until you supply it with your component's markup. To do this, you need to place your markup in the base component's default slot. Then, you need to insert the base component's **slot props** into your markup.

![The base component receives props and user interactions, and returns slot props.](../../../../.readme/diagram-vue3-component-base-receives-returns.png)

The base component uses slot props to apply affordances to your markup. Each slot prop is a value that updates whenever the base component handles a user interaction. The base component supplies you with several of these values:

<table>
<thead>
<tr>
<th align="left">Slot prop</th>
<th align="left">When it updates:</th>
<th align="left">What it contains:</th>
<th align="left">How to access it:</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><code>State</code></td>
<td align="left">whenever a user interaction changes your UI component's state.</td>
<td align="left">Your component's current <a href="#pass-the-state-slot-prop-into-your-component-to-receive-state-changes-from-the-base-component">state</a>.</td>
<td align="left">
In your component's template:
<pre><code>
&lt;template&gt;
  &lt;BaseComponent&gt;
    &lt;template v-slot:default="{<strong>State</strong>}"&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>PointerInput</code></td>
<td align="left">whenever a mouse cursor or fingertip interacts with your UI component.</td>
<td align="left">The <a href="#pass-the-pointerinput-slot-prop-into-your-component-to-receive-pointerinputs-from-the-base-component">location, interaction and movement</a> of the mouse cursor or fingertip.</td>
<td align="left">
In your component's template:
<pre><code>
&lt;template&gt;
  &lt;BaseComponent&gt;
    &lt;template v-slot:default="{<strong>PointerInput</strong>}"&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>FocusInput</code></td>
<td align="left">whenever the text, images, or other content in your component are manipulated. <!-- is this totally accurate?? --></td>
<td align="left">The <a href="#pass-the-focusinput-slot-prop-into-your-component-to-receive-focusinputs-from-the-base-component">modifications</a> to the text, images, or other content in your component</td>
<td align="left">
In your component's template:
<pre><code>
&lt;template&gt;
  &lt;BaseComponent&gt;
    &lt;template v-slot:default="{<strong>FocusInput</strong>}"&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>KeyboardInput</code></td>
<td align="left">whenever a keypress interacts with your UI component.</td>
<td align="left">The <a href="#pass-the-keyboard-input-slot-prop-into-your-component-to-receive-keyboardinputs-from-the-base-component">keys and duration</a> of the keypress.</td>
<td align="left">
In your component's template:
<pre><code>
&lt;template&gt;
  &lt;BaseComponent&gt;
    &lt;template v-slot:default="{<strong>KeyboardInput</strong>}"&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>DragInput</code></td>
<td align="left">whenever a mouse or fingertip pulls your component.</td>
<td align="left">The <a href="#pass-the-draginput-slot-prop-into-your-component-to-receive-draginputs-from-the-base-component">location, interaction, movement and payload</a> of the drag session.</td>
<td align="left">
In your component's template:
<pre><code>
&lt;template&gt;
  &lt;BaseComponent&gt;
    &lt;template v-slot:default="{<strong>DragInput</strong>}"&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>ScrollInput</code></td>
<td align="left">whenever a mouse or fingertip scrolls your component.</td>
<td align="left"><a href="#pass-the-scrollinput-slot-prop-into-your-component-to-receive-scrollinputs-from-the-base-component">The location, interaction and movement</a> of the scroll.</td>
<td align="left">
In your component's template:
<pre><code>
&lt;template&gt;
  &lt;BaseComponent&gt;
    &lt;template v-slot:default="{<strong>ScrollInput</strong>}"&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
<tr>
<td align="left"><code>Theme</code></td>
<td align="left">whenever the <code>State</code> slot prop changes</td>
<td align="left"><a href="#style-your-component-with-the-base-components-theme-slot-prop">CSS styles</a> for your component's text and fill</td>
<td align="left">
In your component's template:
<pre><code>
&lt;template&gt;
  &lt;BaseComponent&gt;
    &lt;template v-slot:default="{<strong>Theme</strong>}"&gt;<br/>
    &lt;/template&gt;
  &lt;/BaseComponent&gt;
&lt;/template&gt;
</code></pre>
</td>
</tr>
</tbody>
</table>

#### Pass the `State` slot prop into your component to receive state changes from the base component:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

#### Pass the `PointerInput` slot prop into your component to receive [PointerInput](../../shared/device-input-event-handlers/src/README.md#pointerinput)s from the base component:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

#### Pass the `FocusInput` slot prop into your component to receive [FocusInput](../../shared/device-input-event-handlers/src/README.md#focusinput)s from the base component:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

#### Pass the `KeyboardInput` slot prop into your component to receive [KeyboardInput](../../shared/device-input-event-handlers/src/README.md#keyboardinput)s from the base component:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

#### Pass the `DragInput` slot prop into your component to receive [DragInput](../../shared/device-input-event-handlers/src/README.md#draginput)s from the base component:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

#### Pass the `ScrollInput` slot prop into your component to receive [ScrollInput](../../shared/device-input-event-handlers/src/README.md#scrollinput)s from the base component:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

### Style your component with the base component's `Theme` slot prop:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

### Customize the base component's theme with the `theme` prop:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

`ios`, `macos`, `tvos`, `android`, `gtk`, `windows`

if you don't specify the theme prop, then the base component will be entirely headless

#### Pass a `Theme` object into the `themeConfig` prop to customize every aspect of the base component's theme:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

### Display a custom placeholder while your component is loading:

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

### How `incremental.design/vue3-component-base` works:

![The base component listens for HTML events, updates state, and sends the state into the scope of both the default slot and the suspense slot](../../../.readme/vue3-component-base/vue3-component-base-how-it-works.png)

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
