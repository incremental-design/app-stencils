# `@incremental.design/input-event-listeners`

<!--
Add a banner image and badges

see: https://towardsdatascience.com/how-to-write-an-awesome-readme-68bf4be91f8b

For bonus points, make the banner animated with html, css and svg

maybe some cool retro image with a bunch of input ports and cords?

see: https://github.com/sindresorhus/css-in-readme-like-wat
 -->

**Handle _every_ device input, without the boilerplate.**

The best user interfaces respond to _everything_ a user does: every mouse movement, touch, keypress, and even device motion. Over the past decade, browser APIs have connected to more devices: from mice and keyboards, to touchscreens, accelerometers and even gamepads. However, responding to _all_ of these inputs takes a lot of logic. The more inputs your code responds to, the more logic it needs to contain, and the more bloated it becomes. `device-input-event-handlers` moves all of this logic out of your code, so you can handle device inputs, without the bloat.

Use the handlers in this package to:

- **Filter the useful information out of device input events, with just five lines of code:**

  ![Filter an event with just 5 lines of code](../../../.readme/diagram-filter-events-5-lines.png)

  - Feed an event into its corresponding handler in `device-input-event-handler` and get an object with just the values you _actually_ need to handle the event. For example:

    ![Example of filtering an event into an object with a listener](../../../.readme/diagram-filter-events.png)

- **Calculate changes between occurrences of device input events, with a single argument:**

  ![To make the handler function calculate the differences between an event and a previous event, feed the results of the previous event back into the handler.](../../../.readme/diagram-calculate-events-1-argument.png)

  - Feed a handler an event, and the object it returned from any previous event, and it will automatically calculate the changes between the two. For example:

    ![Example of calculating changes between instances of an event with a listener](../../../.readme/diagram-calculate-events.png)

<!-- list any codebases, websites, apps, platforms or other products that use your code -->

<!-- link to your reader to your repository's bug page, and let them know if you're open to contributions -->

## Installation:

`@incremental.design/device-input-event-handlers` exports a default `handle(...)` function. It also exports several named functions; one for each of the events that it handles:

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
<code class="lang-typescript">handle( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank">Event</a>, stop: boolean, preventDefault: boolean, previous: <!-- needs to be a union of all the possible specific objects i.e. pointerCoordinates | ... --> )</code>
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
<code class="lang-typescript">handleDevice( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent" target="_blank">DeviceMotionEvent</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent" target="_blank">DeviceOrientationEvent</a>, stop: boolean, preventDefault: boolean, previous: <!-- needs to be an object that represents a device --> )</code>
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
<code class="lang-typescript">handleDrag( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/DragEvent" target="_blank">DragEvent</a>, stop: boolean, preventDefault: boolean, previous: <!-- needs to be an object that contains both pointercoordinates and a drag payload --> )</code>
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
<code class="lang-typescript">handleFocus( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent" target="_blank">FocusEvent</a>, stop: boolean, preventDefault: boolean, previous: <!-- needs to be an object that contains info about focus --> )</code>
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
<code class="lang-typescript">handleGamepad( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/GamepadEvent" target="_blank">GamepadEvent</a>, stop: boolean, preventDefault: boolean, previous: <!-- needs to be an object that contains info about gamepad --> )</code>
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
<code class="lang-typescript">handleKeyboard( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent" target="_blank">KeyboardEvent</a>, stop: boolean, preventDefault: boolean, previous: <!-- needs to be an object that contains info about keyboard --> )</code>
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
<code class="lang-typescript">handleMouse( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank">MouseEvent</a>, stop: boolean, preventDefault: boolean, previous: <a href="./src/README.md#pointercoordinates">PointerCoordinates</a> )</code>
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
<code class="lang-typescript">handleTouch( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent" target="_blank">TouchEvent</a>, stop: boolean, preventDefault: boolean, previous: <a href="./src/README.md#pointercoordinates">PointerCoordinates</a> )</code>
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
<code class="lang-typescript">handleWheel( event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">WheelEvent</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank">Event</a>, stop: boolean, preventDefault: boolean, previous: <!-- needs to be an object that contains info about scroll position and wheel --> )</code>
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
2. Place a [`v-on`](https://v3.vuejs.org/api/directives.html#v-on) directive in your component's template.

3. Call a listener from within the [`v-on`](https://v3.vuejs.org/api/directives.html#v-on) directive.

4. Assign the results of the listener to the variable you made in the first step.

5. Add a [watcher](https://v3.vuejs.org/guide/computed.html#computed-setter) to the variable, and use it to trigger your component's behaviors.

Once you import the handler, you only need to write a few lines of code, rather than a few hundred, to make your component _hear everything_.

There are three ways to add a handler to a vue component:

#### Call the `handle(...)` function from within any [`v-on`](https://v3.vuejs.org/api/directives.html#v-on) directive:

```vue
<template>
  <div
    v-on:click="
      (event) => {
        previousEventInfo = handle(event, false, false, previousEventInfo);
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

The `handle(...)` function takes four arguments:

<table>
<tr>
<td><code class="lang-typescript">event: Event</code></td>
<td><code class="lang-typescript">stop: boolean</code></td>
<td><code class="lang-typescript">preventDefault: boolean</code></td>
<td><code class="lang-typescript">previous: Object</code></td>
</tr>
<tr>
<td>The event you want to handle</td>
<td>Whether the event should have its `.stop()` method called</td>
<td>Whether the event should have its `.preventDefault()` method called</td>
<td>The object that this handler returned the last time it was called.</td>
</tr>
</table>

The `handle(...)` function returns one of the following objects, depending on the type of event that was passed into it:

| Event Type                                        | Returned Object                                          |
| :------------------------------------------------ | :------------------------------------------------------- |
| DragEvent                                         | TBD                                                      |
| DeviceMotionEvent or DeviceOrientationEvent       | TBD                                                      |
| GamepadEvent                                      | TBD                                                      |
| Event where `<Event>.type = scroll` or WheelEvent | TBD                                                      |
| FocusEvent                                        | TBD                                                      |
| KeyboardEvent                                     | TBD                                                      |
| MouseEvent                                        | [PointerCoordinates](./src/README.md#pointercoordinates) |
| TouchEvent                                        | [PointerCoordinates](./src/README.md#pointercoordinates) |

<!-- need to link to the folder readme for more details on the arguments -->

The `handle(...)` function _only_ supports the following `v-on` listeners:

<table>
<tr>
<th rowspan="31"><code>v-on</code></th>
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
<!-- handleKey<a href="" target="_blank">board -->
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
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event" target="_blank">:touchcancel</a></code></td><td rowspan="3">TouchEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchmove_event" target="_blank">:touchmove</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event" target="_blank">:touchstart</a></code></td></tr>
<!-- handleWheel -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">:wheel</a></code></td><td>WheelEvent</td></tr>
</table>

The `handle(...)` function does _not_ support the following `v-on` listeners, because these listeners do not hear events that are triggered by device inputs. If you try to pass an event from one of these to the `handle(...)` function, it will error. <!-- plug a ui-stencils packages that does support these inputs ... maybe a media-event-handlers package?? -->

<table>
<tr>
<th rowspan="29"><code>v-on</code></th>
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

The `handle(...)` does not support [custom Vue events](https://v3.vuejs.org/guide/component-basics.html#passing-data-to-child-components-with-props), because they aren't [browser events](https://developer.mozilla.org/en-US/docs/Web/API/Event). <!-- is this true?? --> If you try to pass a custom event to this function, it will error.

- Keep in mind that `v-on` listens for [browser events](https://developer.mozilla.org/en-US/docs/Web/API/Event) when you add it to [HTML Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element), such as `<div>`, `<p>`, or `<span>`, and [custom events](https://v3.vuejs.org/guide/component-custom-events.html#defining-custom-events) when you add it to vue components. Therefore, if you use `handle(...)` in `v-on` directive on a vue component, it will always fail.

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

#### Call the `handleDrag(...)`, `handleFocus(...)`, `handleKeyboard(...)` `handleMouse(...)`, `handleTouch(...)`, or `handleWheel(...)` functions from their corresponding `v-on` listeners.

If you want minimize your project's final bundle size, consider importing just a few of the above handler functions. They are smaller than the generic `handle(...)` function, because they don't implement all of the logic needed to handle every single input device event. Just like their generic counterpart, all of these handler functions:

- can be called from within `v-on`
- take roughly the same arguments.
- return an object with information about the event they received.

If none of this makes sense to you, that's OK. Just use the `handle(...)` function. But if you're still following, keep reading to find out the differences between the specific handlers and their generic counterpart.

The `handleDrag(...)` function returns a TBD object. It only supports the following `v-on` listeners:

<table>
<tr>
<th rowspan="31"><code>v-on</code></th>
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

The `handleFocus(...)` function returns a TBD object. It only supports the following `v-on` listeners:

<table>
<tr>
<th rowspan="31"><code>v-on</code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handleFocus -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event" target="_blank">:blur</a></code></td><td rowspan="4">FocusEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event" target="_blank">:focus</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event" target="_blank">:focusin</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event" target="_blank">:focusout</a></code></td></tr>
</table>

The `handleKeyboard(...)` function returns a TBD object. only supports the following `v-on` listeners:

<table>
<tr>
<th rowspan="31"><code>v-on</code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handleKeyboard -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event" target="_blank">:keydown</a></code></td><td rowspan="3">KeyboardEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event" target="_blank">:keypress</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event" target="_blank">:keyup</a></code></td></tr>
</table>

The `handleMouse(...)` function returns a [PointerCoordinates](./src/README.md#pointercoordinates) object. It only supports the following `v-on` listeners:

<table>
<tr>
<th rowspan="31"><code>v-on</code></th>
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

The `handleTouch` function returns a [PointerCoordinates](./src/README.md#pointercoordinates) object. It only supports the following `v-on` listeners:

<table>
<tr>
<th rowspan="31"><code>v-on</code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handleTouch -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event" target="_blank">:touchcancel</a></code></td><td rowspan="3">TouchEvent</td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/touchmove_event" target="_blank">:touchmove</a></code></td></tr>
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event" target="_blank">:touchstart</a></code></td></tr>
</table>

The `handleWheel` function returns a TBD object. only supports the following `v-on` listeners:

<table>
<tr>
<th rowspan="31"><code>v-on</code></th>
<th>Listener</th>
<th>Event Type</th>
</tr>
<!-- handle -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event" target="_blank">:scroll</code></td><td>Event</a></td></tr>
<!-- handleWheel -->
<tr><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event" target="_blank">:wheel</a></code></td><td>WheelEvent</td></tr>
</table>

Like their generic counterpart, none of these handlers support custom Vue events.

#### Call the `handle(...)`, `handleDevice(...)`, or `handleGamepad(...)` functions from within your Vue component's `<script>` block.

<!-- dont't forget to add mic, webcam and geolocation events!! -->

Unlike [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)s, [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)s, [`WheelEvent`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent)s and [`TouchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)s, [`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)s, [`DeviceOrientationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)s, and [`GamepadEvent`](https://developer.mozilla.org/en-US/docs/Web/API/GamepadEvent/gamepad)s, aren't emitted from DOM elements. They are emitted from the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) itself. So, there's no `v-on` listener that can hear them. To use a handler on these events, you will need to manually set it up and tear it down the `mounted` and `beforeDestroy` hooks of your Vue component:

```vue
<script>
import { handleDevice } from '@incremental.design/device-input-event-handlers'

export default {

  data(){

    return {

      eventInfo: null,
      eventListenerToUnbind: null;

    }

  },

  watch{

    eventInfo(new, old){
      /* trigger component behaviors */
    }

  },

  mounted(){
    this.eventListenerToUnbind = window.addEventListener('devicemotion', (event) => {
      this.eventInfo = handleDevice(event, false, false, this.eventInfo);
    })
  },

  beforeDestroy(){

  },

}
</script>
```

### How `@incremental.design/device-input-event-listeners` works:

<!--
need to explain distinction between events, listeners and handlers

every event has one or more listeners. Some have several listeners. Listeners tell the browser _when_ you want to hear about an event. They are important because potentially thousands of events can go on at the exact same time! All that chatter can overwhelm your computer's memory, crashing your app.

the same handler can respond to any of an event's listeners. That's because
 -->

<!-- need to explain that the generic event handler just wraps the specific ones -->

## Roadmap:

See [Roadmap](../../../README.md#roadmap)

## Contribute to `@incremental.design/input-event-listeners`:

See [Contribute to App Stencils](../../../CONTRIBUTE.md)

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->
