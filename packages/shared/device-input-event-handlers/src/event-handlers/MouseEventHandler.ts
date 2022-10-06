// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Handler, mergeWithEventInfo, EventInfo } from "./handler-utils";
import { PointerInput, getPointerInput } from "./pointer-utils";

/**
 * HandleMouse extracts the useful information from a sequence of mouse events.
 *
 * @param event - Any {@link MouseEvent}
 *
 * @param previous - The previous {@link EventInfo}<{@link PointerInput}> object that was returned from this function. This parameter is optional. If you supply it, it will diff the event with the previous event and include the result in the returned {@link EventInfo}<{@link PointerInput}>} object.
 *
 * @returns a {@link EventInfo}<{@link PointerInput}> object
 *
 */
export const handleMouse: Handler<MouseEvent, PointerInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo(
    event,
    previous && previous.input.type === "PointerInput"
      ? getPointerInput(event, previous.input)
      : getPointerInput(event)
  );
};

// todo: support auxclick, contextmenu, webkitmouseforcewillbegin, webkitmouseforcedown, webkitmouseforcechanged, webkitmouseforceup

// this is how vue handles mod keys on mouse events: https://v3.vuejs.org/guide/events.html#system-modifier-keys

// this is how vue handles left, middle, right on mouse events: https://v3.vuejs.org/guide/events.html#mouse-button-modifiers
