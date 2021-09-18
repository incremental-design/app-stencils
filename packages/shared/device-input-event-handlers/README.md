# `@incremental.design/device-input-event-handlers`

<!--
Add a banner image and badges

see: https://towardsdatascience.com/how-to-write-an-awesome-readme-68bf4be91f8b

For bonus points, make the banner animated with html, css and svg

maybe some cool retro image with a bunch of input ports and cords?

see: https://github.com/sindresorhus/css-in-readme-like-wat
 -->

**Handle _every_ device input, without the boilerplate.**

The best user interfaces respond to _everything_ a user does: every mouse movement, touch, keypress, and even device motion. Over the past decade, browser APIs have connected to more devices: from mice and keyboards, to touchscreens, accelerometers, gamepads, and even webcams. However, responding to _all_ of these inputs takes a lot of logic. The more inputs your code responds to, the more logic it needs to contain, and the more bloated it becomes. `device-input-event-handlers` moves all of this logic out of your code, so you can handle everything, without the bloat.

Use the handlers in this package to:

- **Filter the useful information out of device input events, with just five lines of code:**

  Feed an event into its corresponding handler in `device-input-event-handler` and get an object with just the values you _actually_ need to handle the event. For example:

  ![It takes as few as 5 lines of code to add a handler to a Vue component.](../../../.readme/diagram-filter-events-5-lines.png)

  ![Handlers filter all the useful information out of an event, and toss the extraneous stuff.](../../../.readme/diagram-filter-events.png)

- **Calculate changes between occurrences of device input events, with a single argument:**

  Feed a handler an event, and the object it returned from any previous event, and it will automatically calculate the changes between the two. For example:

  ![To make the handler function calculate the differences between an event and a previous event, feed the results of the previous event back into the handler.](../../../.readme/diagram-calculate-events-1-argument.png)

  ![When you feed the results of a previous event back into a handler, the handler calculates the difference between the previous and current event](../../../.readme/diagram-calculate-events.png)
  <!-- list any codebases, websites, apps, platforms or other products that use your code -->

<!-- link to your reader to your repository's bug page, and let them know if you're open to contributions -->

## Installation:

`@incremental.design/device-input-event-handlers` exports a default [`handle(...)`](./src/README.md#handle) function. It also exports several named functions; one for each of the events that it handles:

<table>
<thead>
<tr>
<th align="left">Handler</th>
<th align="left">How to import:</th>
</tr>
</thead>
<tbody>
<!-- !import handle -->
<tr>
<td align="left">
<pre>
<code class="lang-typescript">handle( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank">Event</a>, previous: <a href="./src/README.md#deviceinput">DeviceInput</a> | <a href="./src/README.md#focusinput">FocusInput</a> | <a href="./src/README.md#gamepadinput">GamepadInput</a> | <a href="./src/README.md#keyboardinput">KeyboardInput</a> | <a href="./src/README.md#pointerinput">PointerInput</a> | <a href="./src/README.md#draginput">DragInput</a> | <a href="./src/README.md#scrollinput">ScrollInput</a> | <a href="./src/README.md#windowresizeinput">WindowResizeInput</a> )</code>
</pre>
</td>
<td align="left">
<pre>
<code>
import handle from '@incremental.design/device-input-event-handlers'
</code>
</pre>
</td>
</tr>
<!-- !import handleDevice -->
<tr>
<td align="left">
<pre>
<code class="lang-typescript">handleDevice( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent" target="_blank">DeviceMotionEvent</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent" target="_blank">DeviceOrientationEvent</a>, previous: <a href="./src/README.md#deviceinput">DeviceInput</a> )</code>
</pre>
</td>
<td align="left">
<pre>
<code>
import { handleDevice } from '@incremental.design/device-input-event-handlers'
</code>
</pre>
</td>
</tr>
<!-- !import handleDrag -->
<tr>
<td align="left">
<pre>
<code class="lang-typescript">handleDrag( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/DragEvent" target="_blank">DragEvent</a>, previous: <a href="./src/README.md#draginput">DragInput</a> )</code>
</pre>
</td>
<td align="left">
<pre>
<code>
import { handleDrag } from '@incremental.design/device-input-event-handlers'
</code>
</pre>
</td>
</tr>
<!-- !import handleFocus -->
<tr>
<td align="left">
<pre>
<code class="lang-typescript">handleFocus( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent" target="_blank">FocusEvent</a>, previous: <a href="./src/README.md#focusinput">FocusInput</a> )</code>
</pre>
</td>
<td align="left">
<pre>
<code>
import { handleFocus } from '@incremental.design/device-input-event-handlers'
</code>
</pre>
</td>
</tr>
<!-- !import handleGamepad -->
<tr>
<td align="left">
<pre>
<code class="lang-typescript">handleGamepad( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/GamepadEvent" target="_blank">GamepadEvent</a>, previous: <a href="./src/README.md#gamepadinput">GamepadInput</a> )</code>
</pre>
</td>
<td align="left">
<pre>
<code>
import { handleGamepad } from '@incremental.design/device-input-event-handlers'
</code>
</pre>
</td>
</tr>
<!-- !import handleKeyboard -->
<tr>
<td align="left">
<pre>
<code class="lang-typescript">handleKeyboard( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent" target="_blank">KeyboardEvent</a>, previous: <a href="./src/README.md#keyboardinput">KeyboardInput</a> )</code>
</pre>
</td>
<td align="left">
<pre>
<code>
import { handleKeyboard } from '@incremental.design/device-input-event-handlers'
</code>
</pre>
</td>
</tr>
<!-- !import handleMouse -->
<tr>
<td align="left">
<pre>
<code class="lang-typescript">handleMouse( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank">MouseEvent</a>, previous: <a href="./src/README.md#pointerinput">PointerInput</a> )</code>
</pre>
</td>
<td align="left">
<pre>
<code>
import { handleMouse } from '@incremental.design/device-input-event-handlers'
</code>
</pre>
</td>
</tr>
<!-- !import handleTouch -->
<tr>
<td align="left">
<pre>
<code class="lang-typescript">handleTouch( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent" target="_blank">TouchEvent</a>, previous: <a href="./src/README.md#pointerinput">PointerInput</a> )</code>
</pre>
</td>
<td align="left">
<pre>
<code>
import { handleTouch } from '@incremental.design/device-input-event-handlers'
</code>
</pre>
</td>
</tr>
<!-- !import handleWheel -->
<tr>
<td align="left">
<pre>
<code class="lang-typescript">handleWheel( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">WheelEvent</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank">Event</a>, previous: <a href="./src/README.md#scrollinput">ScrollInput</a> )</code>
</pre>
</td>
<td align="left">
<pre>
<code>
import { handleWheel } from '@incremental.design/device-input-event-handlers'
</code>
</pre>
</td>
</tr>
</tbody>
</table>

## Usage:

<!-- * what you want the reader to do -->

### Add event handlers to your Vue 3 components:

If you want your Vue components to feel [native](../../../README.MD#app-stencils), they have to do more than respond to mouse clicks. They need to track _every_ mouse movement. And that's not all: they also have to trace touch gestures, measure key presses, and keep track of the [document's](https://developer.mozilla.org/en-US/docs/Web/API/Document) focus. In other words, they need to _hear everything_ that happens in a browser window. But listening to _every_ change can add up to many hundreds of lines of redundant code in _every_ component - not to mention dozens of hours of technical debt later on. The quickest way to save yourself the trouble is to utilize one of the many listeners in this package. All you need to do is:

1. Add a variable to your component's [data](https://v3.vuejs.org/api/options-data.html).
2. Place a <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> directive in your component's template.

3. Call a listener from within the <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> directive.

4. Assign the results of the listener to the variable you made in the first step.

5. Add a [watcher](https://v3.vuejs.org/guide/computed.html#computed-setter) to the variable, and use it to trigger your component's behaviors.

Once you import the handler, you only need to write a few lines of code, rather than a few hundred, to make your component _hear everything_.

There are three ways to add a handler to a Vue component:

1. [Call the [`handle(...)`](./src/README.md#handle) function from within any supported <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> directive.](#call-the-handle-function-from-within-any-supported-v-on-directive)
2. [Call the `handleDrag(...)`, `handleFocus(...)`, `handleKeyboard(...)` `handleMouse(...)`, `handleTouch(...)`, or `handleWheel(...)` functions from their corresponding <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners](#call-the-handledrag-handlefocus-handlekeyboard-handlemouse-handletouch-or-handlewheel-functions-from-their-corresponding-v-on-listeners)
3. [Call the [`handle(...)`](./src/README.md#handle), `handleDevice(...)`, or `handleGamepad(...)` functions from within your Vue component's `<script>` block.](#call-the-handle-handledevice-or-handlegamepad-functions-from-within-your-vue-components-script-block)

#### Call the [`handle(...)`](./src/README.md#handle) function from within any supported <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> directive:

```vue
<template>
  <div
    v-on:click="
      (event) => {
        previousEventInfo = handle(event, previousEventInfo);
      }
    "
  ></div>
</template>

<script>
export default {

  data(){

    return {

      previousEventInfo: null

    }

  },

  watch {

    previousEventInfo(new, old){

      /* your logic here */

    }

  }
}
</script>
```

The [`handle(...)`](./src/README.md#handle) function takes two arguments:

<table>
<tr>
<td><code class="lang-typescript">event: Event</code></td>
<td><code class="lang-typescript">previous: Object</code></td>
</tr>
<tr>
<td>The event you want to handle</td>
<td>The object that this handler returned the last time it was called.</td>
</tr>
</table>

The [`handle(...)`](./src/README.md#handle) function returns one of the following objects, depending on the type of event that was passed into it:

<table>
<thead>
<tr>
<th align="left">Event Type</th>
<th align="left">Returned Object</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">DragEvent</td>
<td align="left"><a href="./src/README.md#draginput">DragInput</a></td>
</tr>
<tr>
<td align="left">DeviceMotionEvent or DeviceOrientationEvent</td>
<td align="left"><a href="./src/README.md#deviceinput">DeviceInput</a></td>
</tr>
<tr>
<td align="left">GamepadEvent</td>
<td align="left"><a href="./src/README.md#gamepadinput">GamepadInput</a></td>
</tr>
<tr>
<td align="left">Event where <code>&lt;Event&gt;.type = scroll</code> or WheelEvent</td>
<td align="left"><a href="./src/README.md#scrollinput">ScrollInput</a></td>
</tr>
<tr>
<td align="left">FocusEvent</td>
<td align="left"><a href="./src/README.md#focusinput">FocusInput</a></td>
</tr>
<tr>
<td align="left">KeyboardEvent</td>
<td align="left"><a href="./src/README.md#keyboardinput">KeyboardInput</a></td>
</tr>
<tr>
<td align="left">MouseEvent</td>
<td align="left"><a href="./src/README.md#pointerinput">PointerInput</a></td>
</tr>
<tr>
<td align="left">TouchEvent</td>
<td align="left"><a href="./src/README.md#pointerinput">PointerInput</a></td>
</tr>
</tbody>
</table>

<!-- need to link to the folder readme for more details on the arguments -->

The [`handle(...)`](./src/README.md#handle) function _only_ supports the following <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners:

<table>
<tr>
<th rowspan="31"><code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handleDrag -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event" target="_blank">:drag</a></code></td><td rowspan="7">DragEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragend_event" target="_blank">:dragend</code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event" target="_blank">:dragenter</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragleave_event" target="_blank">:dragleave</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event" target="_blank">:dragover</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event" target="_blank">:dragstart</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event" target="_blank">:drop</a></code></td></tr>
<!-- handle -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event" target="_blank">:scroll</code></td><td>Event</a></td></tr>
<!-- handleFocus -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event" target="_blank">:blur</a></code></td><td rowspan="4">FocusEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event" target="_blank">:focus</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event" target="_blank">:focusin</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event" target="_blank">:focusout</a></code></td></tr>
<!-- handleKeyboard -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event" target="_blank">:keydown</a></code></td><td rowspan="3">KeyboardEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event" target="_blank">:keypress</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event" target="_blank">:keyup</a></code></td></tr>
<!-- handleMouse -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event" target="_blank">:auxclick</a></code></td><td rowspan="10">MouseEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event" target="_blank">:click</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event" target="_blank">:contextmenu</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event" target="_blank">:dblclick</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event" target="_blank">:mousedown</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event" target="_blank">:mouseenter</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event" target="_blank">:mouseleave</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event" target="_blank">:mouseout</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event" target="_blank">:mouseover</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event" target="_blank">:mouseup</a></code></td></tr>
<!-- handleTouch -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event" target="_blank">:touchcancel</a></code></td><td rowspan="4">TouchEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchend_event" target="_blank">:touchend</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchmove_event" target="_blank">:touchmove</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event" target="_blank">:touchstart</a></code></td></tr>
<!-- handleWheel -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">:wheel</a></code></td><td>WheelEvent</td></tr>
</table>

The [`handle(...)`](./src/README.md#handle) function does _not_ support the following <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners, because these listeners do not hear events that are triggered by device inputs. If you try to pass an event from one of these to the [`handle(...)`](./src/README.md#handle) function, it will error. <!-- plug a ui-stencils packages that does support these inputs ... maybe a media-event-handlers package?? -->

<table>
<tr>
<th rowspan="29"><code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handle -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event" target="_blank">:cancel</a></code></td><td rowspan="28">Event</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event
" target="_blank">:close</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event" target="_blank">:canplay</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event" target="_blank">:canplaythrough</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/cuechange_event" target="_blank">:cuechange</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event" target="_blank">:durationchange</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event" target="_blank">:emptied</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event" target="_blank">:ended</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event" target="_blank">:loadeddata</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event" target="_blank">:loadedmetadata</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event" target="_blank">:loadstart</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event" target="_blank">:pause</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event" target="_blank">:play</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event" target="_blank">:playing</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event" target="_blank">:ratechange</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event" target="_blank">:seeked</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event" target="_blank">:seeking</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event" target="_blank">:stalled</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event" target="_blank">:suspend</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event" target="_blank">:timeupdate</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event" target="_blank">:volumechange</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event" target="_blank">:waiting</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event" target="_blank">:change</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event" target="_blank">:input</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event" target="_blank">:invalid</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset" target="_blank">:reset</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event" target="_blank">:select</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event" target="_blank">:submit</a></code></td></tr>
</table>

The [`handle(...)`](./src/README.md#handle) does not support [custom Vue events](https://v3.vuejs.org/guide/component-basics.html#passing-data-to-child-components-with-props), because they aren't [browser events](https://developer.mozilla.org/en-US/docs/Web/API/Event). <!-- is this true?? --> If you try to pass a custom event to this function, it will error.

- Keep in mind that <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listens for [browser events](https://developer.mozilla.org/en-US/docs/Web/API/Event) when you add it to [HTML Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element), such as `<div>`, `<p>`, or `<span>`, and [custom events](https://v3.vuejs.org/guide/component-custom-events.html#defining-custom-events) when you add it to vue components. Therefore, if you use [`handle(...)`](./src/README.md#handle) in <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> directive on a vue component, it will always fail.

    <table>
    <tr><th align="left">Do this:</th><th align="left">Don't do this:</th></tr>
    <tr>
    <td>
    <pre>
    <code class="lang-vue">
    &lt;template&gt;
      &lt;div v-on:mousedown="(event) => { previous = handle(event, false, false, previous) }"&gt;
        &lt;!-- your HTML here --&gt;
      &lt;/div&gt;
    &lt;/template&gt;
    </code>
    </pre>
    </td>
    <td>
    <pre>
    <code class="lang-vue">
    &lt;template&gt;
    &lt;your-component v-on:your-component-event="(event) => { previous = handle(event, false, false, previous) }"&gt;
      &lt;!-- your HTML here --&gt;
    &lt;/your-component&gt;
  &lt;/template&gt;
    </code>
    </pre>
    </td>
    </tr>
    </table>

#### Call the [`handleDrag(...)`](./src/README.md#handledrag), [`handleFocus(...)`](./src/README.md#handlefocus), [`handleKeyboard(...)`](./src/README.md#handlekeyboard) [`handleMouse(...)`](./src/README.md#handlemouse), [`handleTouch(...)`](./src/README.md#handletouch), or [`handleWheel(...)`](./src/README.md#handlewheel) functions from their corresponding <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners.

If you want minimize your project's final bundle size, consider importing just a few of the above handler functions. They are smaller than the generic [`handle(...)`](./src/README.md#handle) function, because they don't implement all of the logic needed to handle every single input device event. Just like their generic counterpart, all of these handler functions:

- can be called from within <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code>
- take roughly the same arguments.
- return an object with information about the event they received.

If none of this makes sense to you, that's OK. Just use the [`handle(...)`](./src/README.md#handle) function. But if you're still following, keep reading to find out the differences between the specific handlers and their generic counterpart.

The [`handleDrag(...)`](./src/README.md#handledrag) function returns a [`DragInput`](./src/README.md#draginput) object. Unlike the [`handle(...)`](./src/README.md#handle) function, it only supports the following <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners:

<table>
<tr>
<th rowspan="31"><code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handleDrag -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event" target="_blank">:drag</a></code></td><td rowspan="7">DragEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragend_event" target="_blank">:dragend</code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event" target="_blank">:dragenter</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragleave_event" target="_blank">:dragleave</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event" target="_blank">:dragover</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event" target="_blank">:dragstart</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event" target="_blank">:drop</a></code></td></tr>
</table>

The [`handleFocus(...)`](./src/README.md#handlefocus) function returns a [`FocusInput`](./src/README.md#focusinput) object. Unlike the [`handle(...)`](./src/README.md#handle) function, it only supports the following <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners:

<table>
<tr>
<th rowspan="31"><code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handleFocus -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event" target="_blank">:blur</a></code></td><td rowspan="4">FocusEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event" target="_blank">:focus</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event" target="_blank">:focusin</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event" target="_blank">:focusout</a></code></td></tr>
</table>

The [`handleKeyboard(...)`](./src/README.md#handlekeyboard) function returns a [`KeyboardInput`](./src/README.md#keyboardinput) object. Unlike the [`handle(...)`](./src/README.md#handle) function, it only supports the following <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners:

<table>
<tr>
<th rowspan="31"><code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handleKeyboard -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event" target="_blank">:keydown</a></code></td><td rowspan="3">KeyboardEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event" target="_blank">:keypress</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event" target="_blank">:keyup</a></code></td></tr>
</table>

The [`handleMouse(...)`](./src/README.md#handlemouse) function returns a [`PointerInput`](./src/README.md#pointerinput) object. Unlike the [`handle(...)`](./src/README.md#handle) function, it only supports the following <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners:

<table>
<tr>
<th rowspan="31"><code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handleMouse -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event" target="_blank">:auxclick</a></code></td><td rowspan="10">MouseEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event" target="_blank">:click</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event" target="_blank">:contextmenu</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event" target="_blank">:dblclick</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event" target="_blank">:mousedown</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event" target="_blank">:mouseenter</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event" target="_blank">:mouseleave</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event" target="_blank">:mouseout</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event" target="_blank">:mouseover</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event" target="_blank">:mouseup</a></code></td></tr>
</table>

The [`handleTouch(...)`](./src/README.md#handletouch) function returns a [`PointerInput`](./src/README.md#pointerinput) object. Unlike the [`handle(...)`](./src/README.md#handle) function, it only supports the following <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners:

<table>
<tr>
<th rowspan="31"><code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handleTouch -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event" target="_blank">:touchcancel</a></code></td><td rowspan="4">TouchEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchend_event" target="_blank">:touchend</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchmove_event" target="_blank">:touchmove</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event" target="_blank">:touchstart</a></code></td></tr>
</table>

The [`handleWheel(...)`](./src/README.md#handlewheel) function returns a [`ScrollInput`](./src/README.md#scrollinput) object. Unlike the [`handle(...)`](./src/README.md#handle) function, it only supports the following <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listeners:

<table>
<tr>
<th rowspan="31"><code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handle -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event" target="_blank">:scroll</code></td><td>Event</a></td></tr>
<!-- handleWheel -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">:wheel</a></code></td><td>WheelEvent</td></tr>
</table>

Like the [`handle(...)`](./src/README.md#handle) function, none of these handlers support custom Vue events.

#### Call the [`handle(...)`](./src/README.md#handle), [`handleDevice(...)`](./src/README.md#handledevice), or [`handleGamepad(...)`](./src/README.md#handlegamepad) functions from within your Vue component's `<script>` block.

<!-- dont't forget to add mic, webcam and geolocation events!! -->

Unlike [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)s, [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)s, [`WheelEvent`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent)s and [`TouchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)s, [`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)s, [`DeviceOrientationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)s, and [`GamepadEvent`](https://developer.mozilla.org/en-US/docs/Web/API/GamepadEvent/gamepad)s, aren't emitted from DOM elements. They are emitted from the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) itself. So, there's no <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> listener that can hear them. To use [`handle(...)`](./src/README.md#handle) to handle these events, you need to:

1. Call it from within a method in the [`methods`](https://v3.vuejs.org/api/options-data.html#methods) option of your Vue component.
2. Feed it into a <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window#methods_implemented_from_elsewhere" target="_blank">window</a><a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" target="_blank">.addEventListener(...)</a></code> function call in the [`mounted`](https://v3.vuejs.org/api/options-lifecycle-hooks.html#mounted) hook of your Vue component.
3. Feed it into a <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window#methods_implemented_from_elsewhere" target="_blank">window</a><a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener" target="_blank">.removeEventListener(...)</a></code> function in the [`beforeUnmount`](https://v3.vuejs.org/api/options-lifecycle-hooks.html#beforeunmount) hook of your Vue component.

```vue
<script>
import handle from '@incremental.design/device-input-event-handlers'

export default {

  data(){

    return {
      eventInfo: null;
    }

  },

  methods: {

    handleDeviceMotion(e: Event){
      this.eventInfo = handle(event, this.eventInfo);
    }

  },

  watch: {

    eventInfo(new, old){
      /* trigger component behaviors */
    }

  },

  mounted(){
    window.addEventListener('devicemotion', this.handleDeviceMotion)
  },

  beforeUnmount(){
    window.removeEventListener(this.handleDeviceMotion)
  },

}
</script>
```

<!-- need to at least list the listeners that these events can listen to -->

The [`handle(...)`](./src/README.md#handle) function can bind to any of the following event listeners:

<table>
<tr><th>Target</th><th rowspan="40"><code>.addEventListener(</code></th><th>Listener</th><th rowspan="40"><code>,</code></th><th>Callback</th><th rowspan="40"><code>)</code></th><th>Event Type</th></tr>
<tr><td rowspan="7"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document" target="_blank">document</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event" target="_blank">'drag'</a></code></pre></td><td><pre><code>(e: DragEvent) => { this.previous = handle(e, previous) }</code></pre></td><td rowspan="7"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/DragEvent" target="_blank">DragEvent</a></code></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragend_event" target="_blank">'dragend'</a></code></pre></td><td><pre><code>(e: DragEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event" target="_blank">'dragenter'</a></code></pre></td><td><pre><code>(e: DragEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragleave_event" target="_blank">'dragleave'</a></code></pre></td><td><pre><code>(e: DragEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event" target="_blank">'dragover'</a></code></pre></td><td><pre><code>(e: DragEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event" target="_blank">'dragstart'</a></code></pre></td><td><pre><code>(e: DragEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event" target="_blank">'drop'</a></code></pre></td><td><pre><code>(e: DragEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td rowspan="2"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window" target="_blank">window</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/devicemotion_event" target="_blank">'devicemotion'</a></code></pre></td><td><pre><code>(e: DeviceMotionEvent) => { this.previous = handle(e, previous)}</code></pre></td><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent" target="_blank">DeviceMotionEvent</a></code></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event" target="_blank">'deviceorientation'</a></code></pre></td><td><pre><code>(e: DeviceOrientationEvent) => { this.previous = handle(e, previous)}</code></pre></td><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event" target="_blank">DeviceOrientationEvent</a></code></td></tr>
<tr><td rowspan="1"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document" target="_blank">document</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event" target="_blank">'scroll'</a></code></pre></td><td><pre><code>(e: Event) =>  this.previous = handle(e, previous)}</code></pre></td><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank">Event</a></code></td></tr>
<tr><td rowspan="4"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element" target="_blank">element</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event" target="_blank">'blur'</a></code></pre></td><td><pre><code>(e: FocusEvent) => { this.previous = handle(e, previous)}</code></pre></td><td rowspan="4"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent" target="_blank">FocusEvent</a></code></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event" target="_blank">'focus'</a></code></pre></td><td><pre><code>(e: FocusEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event" target="_blank">'focusin'</a></code></pre></td><td><pre><code>(e: FocusEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event" target="_blank">'focusout'</a></code></pre></td><td><pre><code>(e: FocusEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td rowspan="2"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window" target="_blank">window</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/gamepadconnected_event" target="_blank">'gamepadconnected'</a></code></pre></td><td><pre><code>(e: GamepadEvent) => { this.previous = handle(e, previous)}</code></pre></td><td rowspan="2"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/GamepadEvent" target="_blank">GamepadEvent</a></code></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/gamepaddisconnected_event" target="_blank">'gamepaddisconnected'</a></code></pre></td><td><pre><code>(e: GamepadEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td rowspan="3"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document" target="_blank">document</a></code></td><td><pre><code><a href="" target="_blank">'keydown'</a></code></pre></td><td><pre><code>(e: KeyboardEvent) => { this.previous = handle(e, previous)}</code></pre></td><td rowspan="3"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent" target="_blank">KeyboardEvent</a></code></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event" target="_blank">'keypress'</a></code></pre></td><td><pre><code>(e: KeyboardEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event" target="_blank">'keyup'</a></code></pre></td><td><pre><code>(e: KeyboardEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td rowspan="11"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element" target="_blank">element</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event" target="_blank">'auxclick'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, false, false, previous)}</code></pre></td><td rowspan="10"><code><a href="" target="_blank">MouseEvent</a></code></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event" target="_blank">'click'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event" target="_blank">'contextmenu'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event" target="_blank">'dblclick'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event" target="_blank">'mousedown'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event" target="_blank">'mouseenter'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event" target="_blank">'mouseleave'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event" target="_blank">'mouseout'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event" target="_blank">'mouseover'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event" target="_blank">'mouseup'</a></code></pre></td><td><pre><code>(e: MouseEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event" target="_blank">'touchcancel'</a></code></pre></td><td><pre><code>(e: TouchEvent) => { this.previous = handle(e, previous)}</code></pre></td><td rowspan="4"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent" target="_blank">TouchEvent</a></code></td></tr>
<tr><td rowspan="2"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document" target="_blank">document</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchend_event" target="_blank">'touchend'</a></code></pre></td><td><pre><code>(e: TouchEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchmove_event" target="_blank">'touchmove'</a></code></pre></td><td><pre><code>(e: TouchEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td rowspan="2"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element" target="_blank">element</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event" target="_blank">'touchstart'</a></code></pre></td><td><pre><code>(e: TouchEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">'wheel'</a></code></pre></td><td><pre><code>(e: WheelEvent) => { this.previous = handle(e, previous)}</code></pre></td><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">WheelEvent</a></code></td></tr>
</table>

The [`handle(...)`](./src/README.md#handle) function returns one of TBD, <a href="./src/README.md#pointercoordinates"><code>PointerCoordinates</code></a>, depending on the type of event passed into it.

If you want to slim your project's final bundle size, and you don't need to handle all of the above events, consider importing and using the [`handleDevice(...)`](./src/README.md#handledevice) or [`handleGamepad(...)`](./src/README.md#handlegamepad) functions, instead of the [`handle(...)`](./src/README.md#handle) function.

The [`handleDevice(...)`](./src/README.md#handledevice) function returns a [`DeviceInput`](./src/README.md#deviceinput) object, and can only bind to the following event listeners:

<table>
<tr><th>Target</th><th rowspan="40"><code>.addEventListener(</code></th><th>Listener</th><th rowspan="40"><code>,</code></th><th>Callback</th><th rowspan="40"><code>)</code></th><th>Event Type</th></tr>
<tr><td rowspan="2"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window" target="_blank">window</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/devicemotion_event" target="_blank">'devicemotion'</a></code></pre></td><td><pre><code>(e: DeviceMotionEvent) => { this.previous = handle(e, previous)}</code></pre></td><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent" target="_blank">DeviceMotionEvent</a></code></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event" target="_blank">'deviceorientation'</a></code></pre></td><td><pre><code>(e: DeviceOrientationEvent) => { this.previous = handle(e, previous)}</code></pre></td><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event" target="_blank">DeviceOrientationEvent</a></code></td></tr>
</table>

The [`handleGamepad(...)`](./src/README.md#handlegamepad) function returns a [`GamepadInput`](./src/README.md#gamepadinput) object, and can only bind to the following event listeners:

<table>
<tr><th>Target</th><th rowspan="40"><code>.addEventListener(</code></th><th>Listener</th><th rowspan="40"><code>,</code></th><th>Callback</th><th rowspan="40"><code>)</code></th><th>Event Type</th></tr>
<tr><td rowspan="2"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window" target="_blank">window</a></code></td><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/gamepadconnected_event" target="_blank">'gamepadconnected'</a></code></pre></td><td><pre><code>(e: GamepadEvent) => { this.previous = handle(e, previous)}</code></pre></td><td rowspan="2"><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/GamepadEvent" target="_blank">GamepadEvent</a></code></td></tr>
<tr><td><pre><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/gamepaddisconnected_event" target="_blank">'gamepaddisconnected'</a></code></pre></td><td><pre><code>(e: GamepadEvent) => { this.previous = handle(e, previous)}</code></pre></td></tr>
</table>

<!-- might need to go back in and provide a couple examples of how to open up and use an object in the watch function to get the event type ... but not important right now -->

### How `@incremental.design/device-input-event-handlers` works:

<!-- might need to explain that events are crufty because of backward compatibility. The return objects get rid of the cruft. If you want to know exactly what's returned and how the objects fit together, you can consult the docs (need to link folder readme). Also need to show a chart of which objects inherit from each other -->

<!-- maybe drop in the chart of ALL the events, and highlight the events that this library responds to -->

<!-- maybe explain that events can originate in three places: element, document, window (e.g. sessionstorage). Maybe explain that most objects in browser emit events, using the eventemitter interface. maybe explain that browsers are event-driven ... most of the code you write actually waits around for an event to trigger it. -->

If you peel back the surface of a modern web browser, there are a _lot_ of events firing [all of the time](https://www.youtube.com/watch?v=cCOL7MC4Pl0). As you scroll this webpage, hundreds of events are firing every second! But, listening to all of those events is a lot of work for the browser. If it had to describe everything that was happening in a given second, it would run out of memory in a matter of a few minutes! That's why browser have event listeners. When you use a <code><a href="https://v3.vuejs.org/api/directives.html#v-on" target="_blank">v-on</a></code> directive, or call `addEventListener` on an object in the browser's API, you're telling it _what_ to listen for and _when_ to alert you. Depending on what you listen for, you might receive just a few events, or you might receive a continuous stream. That's where this package's handlers shine.

Most user input is continuous. When you scroll on a webpage, anywhere from sixty to a few hundred events fire every second. Every time you move the page even a pixel, an entirely new event fires. And if you want your components to truly _hear everything_, you have to process all of them. Every handler in this package does just that. It reduces the event it receives into just a few, essential metrics. Then, it compares each metric to those of the event it just processed.

You've probably noticed that every handler in this package shares roughly the same method signature, and all return an object that contain common members, such as the `eventType` field. That's because every handler in this package extends the same, [generic function](./src/event-handlers/handler-utils/Handler.ts), and every returned object extends the same [generic returned object](./src/event-handlers/handler-utils/EventInfo.ts). This makes it easy to get a 'feel' for the functions in this package. Once you understand how one of them works, it's not a stretch to understand them all.

If you've been using [`handle(...)`](./src/README.md#handle) function, rather than its more specific counterparts, it turns out that you've actually been using the specific counterparts the entire time! That's because all the [`handle(...)`](./src/README.md#handle) function does is check the type of event it received and the type listener that sent it, and route the event to the function that knows how to handle that event. Of course, this means that the [`handle(...)`](./src/README.md#handle) function has to wrap all of the other functions it calls, increasing the final bundle size of your project. But, it's a small tradeoff for the convenience.

## Roadmap:

See [Roadmap](../../../README.md#roadmap)

## Contribute to `@incremental.design/device-input-event-handlers`:

See [Contribute to App Stencils](../../../CONTRIBUTE.md)
