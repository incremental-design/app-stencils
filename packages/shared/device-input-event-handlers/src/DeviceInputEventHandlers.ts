export * from './event-handlers';

import {
  handleDevice,
  DeviceInput,
  handleDrag,
  DragInput,
  handleScroll,
  ScrollInput,
  handleFocus,
  FocusInput,
  handleGamepad,
  GamepadInput,
  handleKeyboard,
  KeyboardInput,
  handleMouse,
  handleTouch,
  PointerInput,
  handleWindowResize,
  WindowResizeInput,
} from './event-handlers/';

import { Handler } from './event-handlers/handler-utils/';

type AllDeviceEvents =
  | DeviceMotionEvent
  | DeviceOrientationEvent
  | FocusEvent
  | GamepadEvent
  | KeyboardEvent
  | DragEvent
  | MouseEvent
  | TouchEvent
  | Event
  | UIEvent
  | WheelEvent;

type AllDeviceInputs =
  | DeviceInput
  | DragInput
  | ScrollInput
  | FocusInput
  | GamepadInput
  | KeyboardInput
  | PointerInput
  | WindowResizeInput;

/**
 * handle is a wrapper for every other event handler in this package. When you insert an event into it, it runs {@link handleDevice}, {@link handleDrag}, {@link handleScroll}, {@link handleFocus}, {@link handleGamepad}, {@link handleKeyboard}, {@link handleMouse}, {@link handleTouch}, or {@link handleWindowResize}, depending on the event you insert into it. If you insert an unsupported event, it errors.
 *
 * @param event - Any {@link DeviceMotionEvent}, {@link DeviceOrientationEvent}, {@link FocusEvent}, {@link GamepadEvent}, {@link KeyboardEvent}, {@link DragEvent}, {@link MouseEvent}, {@link TouchEvent}, {@link Event} where {@link Event.type} is 'scroll', {@link UIEvent}, or {@link WheelEvent}
 *
 * @param previous - the object that was previously returned from this function.
 *
 *
 * @returns a {@link DeviceInput}, {@link DragInput}, {@link ScrollInput}, {@link FocusInput}, {@link GamepadInput}, {@link KeyboardInput}, {@link PointerInput}, or {@link WindowResizeInput} object, depending on what kind of event was passed into it.
 *
 * @example
 * ```vue
 * <template>
 *  <div @="Handlers">
 *    <!-- ... -->
 *  </div>
 * </template>
 *
 * <script lang="ts">
 *  import { defineComponent, reactive } from 'vue';
 *
 *  import handle from '@incremental.design/device-input-event-handlers';
 *
 *  export default defineComponent({
 *    setup(){
 *
 *      const DataAndComputed: any = reactive({
 *       previous: false,
 *      });
 *
 *      const H = (e: Event) => handle(e, DataAndComputed.previous);
 *
 *      const Handlers = {
 *        drag: H,
 *        dragend: H,
 *        dragenter: H,
 *        dragleave: H,
 *        dragover: H,
 *        dragstart: H,
 *        drop: H,
 *        scroll: H,
 *        blur: H,
 *        focus: H,
 *        focusin: H,
 *        focusout: H,
 *        keydown: H,
 *        keypress: H,
 *        keyup: H,
 *        auxclick: H,
 *        click: H,
 *        contextmenu: H,
 *        dblclick: H,
 *        mousedown: H,
 *        mouseenter: H,
 *        mouseleave: H,
 *        mouseout: H,
 *        mouseover: H,
 *        mouseout: H,
 *        touchcancel: H,
 *        touchend: H,
 *        touchmove: H,
 *        touchstart: H,
 *        wheel: H
 *      };
 *
 *      return { TouchEventHandlers, DataAndComputed };
 *    }
 *  });
 * </script>
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GamepadEvent
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
 */
const handle: Handler<AllDeviceEvents, AllDeviceInputs> = (event, previous) => {
  // since instanceof is slow, we are going to switch based on the `event.type` property:

  const T = event.type;
  switch (T) {
    case 'devicemotion' || 'deviceorientation':
      return previous && previous.type === 'DeviceInput'
        ? handleDevice(
            <DeviceMotionEvent | DeviceOrientationEvent>event,
            previous
          )
        : handleDevice(<DeviceMotionEvent | DeviceOrientationEvent>event);
    case 'drag' ||
      'dragstart' ||
      'dragend' ||
      'dragenter' ||
      'dragover' ||
      'dragleave' ||
      'drop':
      return previous && previous.type === 'DragInput'
        ? handleDrag(<DragEvent>event, previous)
        : handleDrag(<DragEvent>event);
    case 'wheel' || 'scroll':
      return previous && previous.type === 'ScrollInput'
        ? handleScroll(<Event | WheelEvent>event, previous)
        : handleScroll(<Event | WheelEvent>event);
    case 'focusin' || 'focus' || 'focusout' || 'blur':
      return previous && previous.type === 'FocusInput'
        ? handleFocus(<FocusEvent>event, previous)
        : handleFocus(<FocusEvent>event);
    case 'gamepadconnected' || 'gamepaddisconnected':
      return previous && previous.type === 'GamepadInput'
        ? handleGamepad(<GamepadEvent>event, previous)
        : handleGamepad(<GamepadEvent>event);
    case 'keydown' || 'keyup':
      return previous && previous.type === 'KeyboardInput'
        ? handleKeyboard(<KeyboardEvent>event, previous)
        : handleKeyboard(<KeyboardEvent>event);
    case 'auxclick' ||
      'contextmenu' ||
      'webkitmouseforcewillbegin' ||
      'webkitmouseforcedown' ||
      'webkitmouseforcechanged' ||
      'webkitmouseforceup':
      throw new Error(`${T} is not supported yet.`);
    case 'mousedown' ||
      'mouseup' ||
      'click' ||
      'dblclick' ||
      'mouseenter' ||
      'mouseover' ||
      'mousemove' ||
      'mouseout' ||
      'mouseleave':
      return previous && previous.type === 'PointerInput'
        ? handleMouse(<MouseEvent>event, previous)
        : handleMouse(<MouseEvent>event);
    case 'touchstart' || 'touchmove' || 'touchend' || 'touchcancel':
      return previous && previous.type === 'PointerInput'
        ? handleTouch(<TouchEvent>event, previous)
        : handleTouch(<TouchEvent>event);
    case 'resize':
      return previous && previous.type === 'WindowResizeInput'
        ? handleWindowResize(<UIEvent>event, previous)
        : handleWindowResize(<UIEvent>event);
    default:
      throw new Error(`${T} is not supported.`);
  }
};

export default handle;
