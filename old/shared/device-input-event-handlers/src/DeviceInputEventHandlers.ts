import {
  /* device */
  handleDevice,
  DeviceInput,
  /* drag */
  handleDrag,
  DragInput,
  /* scroll */
  handleScroll,
  ScrollInput,
  /* focus */
  handleFocus,
  FocusInput,
  /* gamepad */
  handleGamepad,
  GamepadInput,
  /* keyboard */
  handleKeyboard,
  KeyboardInput,
  /* mouse and touch */
  handleMouse,
  handleTouch,
  PointerInput,
  /* window */
  handleWindowResize,
  WindowResizeInput,
} from './event-handlers';

import { Handler, EventInfo } from './event-handlers';

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
 * @param event - Any {@link DeviceMotionEvent}, {@link DeviceOrientationEvent}, {@link FocusEvent}, {@link GamepadEvent}, {@link KeyboardEvent}, {@link DragEvent}, {@link MouseEvent}, {@link TouchEvent}, {@link Event} where {@link Event.type} is 'scroll', {@link UIEvent} where {@link UIEvent.type} is 'resize', or {@link WheelEvent}
 *
 * @param previous - the object that was previously returned from this function.
 *
 *
 * @returns `{@link EventInfo}<input>` object, where `input` is
 * - {@link DeviceInput} if `event` is a {@link DeviceMotionEvent} or {@link DeviceOrientationEvent}
 * - {@link DragInput} if `event` is a {@link DragEvent}
 * - {@link ScrollInput} if `event` is a {@link ScrollEvent} or {@link Event} where {@link Event.type} is 'scroll'
 * - {@link FocusInput} if `event` is a {@link FocusEvent}
 * - {@link GamepadInput} if `event` is a {@link GamepadEvent}
 * - {@link KeyboardInput} if `event` is a {@link KeyboardEvent}
 * - {@link PointerInput} if `event` is a {@link link to class or URL | Description}
 * - {@link WindowResizeInput} if `event` is a {@link UIEvent}
 *
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
  /* since instanceof is slow, we are going to switch based on the `event.type` property */

  const T = event.type;
  switch (T) {
    case 'devicemotion' || 'deviceorientation':
      return handleDevice(
        <DeviceMotionEvent | DeviceOrientationEvent>event,
        previous as EventInfo<DeviceInput>
      );

    case 'drag' ||
      'dragstart' ||
      'dragend' ||
      'dragenter' ||
      'dragover' ||
      'dragleave' ||
      'drop':
      return handleDrag(<DragEvent>event, previous as EventInfo<DragInput>);

    case 'wheel' || 'scroll':
      return handleScroll(
        <Event | WheelEvent>event,
        previous as EventInfo<ScrollInput>
      );

    case 'focusin' || 'focus' || 'focusout' || 'blur':
      return handleFocus(<FocusEvent>event, previous as EventInfo<FocusInput>);
    case 'gamepadconnected' || 'gamepaddisconnected':
      return handleGamepad(
        <GamepadEvent>event,
        previous as EventInfo<GamepadInput>
      );
    case 'keydown' || 'keyup':
      return handleKeyboard(
        <KeyboardEvent>event,
        previous as EventInfo<KeyboardInput>
      );
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
      return handleMouse(
        <MouseEvent>event,
        previous as EventInfo<PointerInput>
      );
    case 'touchstart' || 'touchmove' || 'touchend' || 'touchcancel':
      return handleTouch(
        <TouchEvent>event,
        previous as EventInfo<PointerInput>
      );
    case 'resize':
      return handleWindowResize(
        <UIEvent>event,
        previous as EventInfo<WindowResizeInput>
      );
    default:
      throw new Error(`${T} is not supported.`);
  }
};

export default handle;
