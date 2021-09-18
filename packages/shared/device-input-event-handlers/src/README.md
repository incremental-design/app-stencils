# `packages/shared/input-event-handlers/src`

## Contents:

<table>
<thead>
<tr>
<th>File or Subfolder</th>
<th>What it exports:</th>
<th>Can you modify it?</th>
</tr>
</thead>
<tbody>
<!-- !event-handlers/device-utils/* -->
<tr>
<td><pre><code>event-handlers/device-utils/*</code></pre></td>
<td>
  <ul>
    <li><pre>function <code><a href="./event-handlers/device-utils/DeviceInput.ts">getDeviceInput</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent" target="_blank">DeviceMotionEvent</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent" target="_blank">DeviceOrientationEvent</a>, previous?: <a href="#deviceinput">DeviceInput</a>)</code></pre></li>
    <li><pre>interface <code><a href="#deviceinput">DeviceInput</a></code></pre></li>
  </ul>
  <ul>
  </ul>
</td>
<td rowspan="19">No. The code in this package has already been published and implemented into other packages. Consider it frozen.</td>
</tr>
<!-- !event-handlers/focus-utils/* -->
<tr>
<td><pre><code>event-handlers/focus-utils/*</code></pre></td>
<td>
  <ul>
    <li><pre>function <code><a href="./event-handlers/focus-utils/FocusInput.ts">getFocusInput</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent" target="_blank">FocusEvent</a>, previous?: <a href="#focusinput">FocusInput</a>)</code></pre></li>
    <li><pre>interface <code><a href="#focusinput">FocusInput</a></code></pre></li>
  </ul>
  <ul>
  </ul>
</td>
</tr>
<!-- !event-handlers/gamepad-utils/* -->
<tr>
<td><pre><code>event-handlers/gamepad-utils/*</code></pre></td>
<td>
  <ul>
    <li><pre>function <code><a href="./event-handlers/gamepad-utils/GamepadInput.ts">getGamepadInput</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/GamepadEvent" target="_blank">GamepadEvent</a>, previous?: <a href="#gamepadinput">GamepadInput</a>)</code></pre></li>
    <li><pre>interface <code><a href="#gamepadinput">GamepadInput</a></code></pre></li>
  </ul>
  <ul>
  </ul>
</td>
</tr>
<!-- !event-handlers/handler-utils/* -->
<tr>
<td><pre><code>event-handlers/handler-utils/*</code></pre></td>
<td>
  <ul>
    <li><pre>type <code><a href="./event-handlers/handler-utils/EventInfo.ts">EventInfo</a></code></pre></li>
    <li><pre>type <code><a href="./event-handlers/handler-utils/EventInfo.ts">mergeWithEventInfo</a></code></pre></li>
    <li><pre>type <code><a href="./event-handlers/handler-utils/Handler.ts">Handler</a></code></pre></li>
  </ul>
  <ul>
  </ul>
</td>
</tr>
<!-- !event-handlers/keyboard-utils -->
<tr>
<td><pre><code>event-handlers/keyboard-utils/*</code></pre></td>
<td>
  <ul>
    <li><pre>function <code><a href="./event-handlers/keyboard-utils/KeyboardInput.ts">getKeyboardInput</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent" target="_blank">KeyboardEvent</a>, previous?: <a href="#keyboardinput">KeyboardInput</a>)</code></pre></li>
    <li><pre>interface <code><a href="#keyboardinput">KeyboardInput</a></code></pre></li>
  </ul>
  <ul>
  </ul>
</td>
</tr>
<!-- !event-handlers/pointer-utils -->
<tr>
<td><pre><code>event-handlers/pointer-utils/*</code></pre></td>
<td>
  <ul>
    <li><pre>function <code><a href="./event-handlers/pointer-utils/DragInput.ts">getDragInput</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/DragEvent" target="_blank">DragEvent</a>, previous?: <a href="#draginput">DragInput</a>)</code></pre></li>
      <li><pre>interface <code><a href="#draginput">DragInput</a></code></pre></li>
    <li><pre>function <code><a href="./pointer-utils/GetPointerInput.ts">getPointerInput</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank">MouseEvent</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent" target="_blank">TouchEvent</a>, previous?: <a href="#pointerinput">PointerInput</a>)</code></pre></li>
      <li><pre>interface <code><a href="#pointerinput">PointerInput</a></code></pre></li>
  </ul>
  <ul>
  </ul>
</td>
</tr>
<!-- !event-handlers/scroll-utils -->
<tr>
<td><pre><code>event-handlers/scroll-utils/*</code></pre></td>
<td>
  <ul>
    <li><pre>function <code><a href="./event-handlers/scroll-utils/ScrollInput.ts">getScrollInput</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event" target="_blank">Event</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent" target="_blank">WheelEvent</a>, previous?: <a href="#scrollinput">ScrollInput</a>)</code></pre></li>
    <li><pre>interface <code><a href="#scrollinput">ScrollInput</a></code></pre></li>
  </ul>
  <ul>
  </ul>
</td>
</tr>
<!-- !event-handlers/window-resize-utils -->
<tr>
<td><pre><code>event-handlers/window-resize-utils/*</code></pre></td>
<td>
  <ul>
    <li><pre>function <code><a href="./event-handlers/window-resize-utils/WindowResizeInput.ts">getWindowResizeInput</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/UIEvent" target="_blank">UIEvent</a>, previous?: <a href="#windowresizeinput">WindowResizeInput</a>)</code></pre></li>
    <li><pre>interface <code><a href="#windowresizeinput">WindowResizeInput</a></code></pre></li>
  </ul>
  <ul>
  </ul>
</td>
</tr>
<!-- !event-handlers/DeviceEventHandler.ts -->
<tr>
<td><pre><code>event-handlers/DeviceEventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handledevice">handleDevice</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent" target="_blank">DeviceMotionEvent</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent" target="_blank">DeviceOrientationEvent</a>, previous?: <a href="#deviceinput">DeviceInput</a> )</code></pre>
</td>
</tr>
<!-- !event-handlers/DragEventHandler.ts -->
<tr>
<td><pre><code>event-handlers/DragEventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handledrag">handleDrag</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/DragEvent" target="_blank">DragEvent</a>, previous?: <a href="#draginput">DragInput</a> )</code></pre>
</td>
</tr>
<!-- !event-handlers/EventHandler.ts -->
<tr>
<td><pre><code>event-handlers/EventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handlescroll">handleScroll</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event" target="_blank">Event</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent" target="_blank">WheelEvent</a>, previous?: <a href="#scrollinput">ScrollInput</a> )</code></pre>
</td>
</tr>
<!-- !event-handlers/FocusEventHandler.ts -->
<tr>
<td><pre><code>event-handlers/FocusEventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handlefocus">handleFocus</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent" target="_blank">FocusEvent</a>, previous?: <a href="#focusinput">FocusInput</a> )</code></pre>
</td>
</tr>
<!-- !event-handlers/GamepadEventHandler.ts -->
<tr>
<td><pre><code>event-handlers/GamepadEventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handlegamepad">handleGamepad</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/GamepadEvent" target="_blank">GamepadEvent</a>, previous?: <a href="#gamepadinput">GamepadInput</a> )</code></pre>
</td>
</tr>
<!-- !event-handlers/KeyboardEventHandler.ts -->
<tr>
<td><pre><code>event-handlers/KeyboardEventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handlekeyboard">handleKeyboard</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent" target="_blank">KeyboardEvent</a>, previous?: <a href="#keyboardinput">KeyboardInput</a> )</code></pre>
</td>
</tr>
<!-- !event-handlers/MouseEventHandler.ts -->
<tr>
<td><pre><code>event-handlers/MouseEventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handlemouse">handleMouse</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank">MouseEvent</a>, previous?: <a href="#pointerinput">PointerInput</a> )</code></pre>
</td>
</tr>
<!-- !event-handlers/TouchEventHandler.ts -->
<tr>
<td><pre><code>event-handlers/TouchEventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handletouch">handleTouch</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent" target="_blank">TouchEvent</a>, previous?: <a href="#pointerinput">PointerInput</a> )</code></pre>
</td>
</tr>
<!-- !event-handlers/UIEventHandler.ts -->
<tr>
<td><pre><code>event-handlers/UIEventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handlewindowresize">handleWindowResize</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/UIEvent" target="_blank">UIEvent</a>, previous?: <a href="#windowresizeinput">WindowResizeInput</a> )</code></pre>
</td>
</tr>
<!-- !event-handlers/WheelEventHandler.ts -->
<tr>
<td><pre><code>event-handlers/WheelEventHandlers.ts</code></pre></td>
<td>
 <pre>function <code><a href="#handlewheel">handleWheel</a>(event: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event" target="_blank">Event</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent" target="_blank">WheelEvent</a> , previous?: <a href="#scrollinput">ScrollInput</a> )</code></pre>
</td>
</tr>
<!-- !DeviceInputEventHandlers.ts -->
</tbody>
</table>

## Functionality:

<!-- [ ] How do the contents of this folder work together? Why are they all grouped into the same folder? How does this benefit the reader? -->

<!-- [ ] Where are the contents of this folder referenced? -->

## Classes and Methods:

### `handle`

### `DeviceInput`

### `FocusInput`

### `GamepadInput`

### `KeyboardInput`

### `PointerInput`

### `DragInput`

### `ScrollInput`

### `WindowResizeInput`

### `handleDevice`

### `handleDrag`

### `handleScroll`

### `handleFocus`

### `handleGamepad`

### `handleKeyboard`

### `handleMouse`

### `handleTouch`

### `handleWindowResize`

### `handleWheel`

## Contributing

[ ] List any special instructions for adding to or modifying the contents of this folder
