import { Handler, mergeWithEventInfo } from './handler-utils/';
import { PointerInput, getPointerInput } from './pointer-utils';

export const handleMouse: Handler<MouseEvent, PointerInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo(event, getPointerInput(event, previous));
};

// todo: support auxclick, contextmenu, webkitmouseforcewillbegin, webkitmouseforcedown, webkitmouseforcechanged, webkitmouseforceup

// this is how vue handles mod keys on mouse events: https://v3.vuejs.org/guide/events.html#system-modifier-keys

// this is how vue handles left, middle, right on mouse events: https://v3.vuejs.org/guide/events.html#mouse-button-modifiers
