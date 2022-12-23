// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Handler, mergeWithEventInfo, EventInfo } from "./handler-utils";
import { PointerInput, getPointerInput } from "./pointer-utils";

/**
 * HandleTouch extracts the useful information from a sequence of touch events.
 *
 * @param event - Any {@link TouchEvent}
 *
 * @param previous - The previous {@link EventInfo}<{@link PointerInput}> object that was returned from this function. This parameter is optional. If you supply it, it will diff the event with the previous event and include the result in the returned {@link EventInfo}<{@link PointerInput}> object.
 *
 * @returns a {@link EventInfo}<{@link PointerInput}> object
 *
 */
export const handleTouch: Handler<TouchEvent, PointerInput> = (
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
