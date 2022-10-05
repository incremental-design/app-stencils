import { Handler, mergeWithEventInfo, EventInfo } from "./handler-utils";
import { KeyboardInput, getKeyboardInput } from "./keyboard-utils";

/**
 * Handles {@link KeyboardEvent}s. Turns them into {@link EventInfo}<{@link KeyboardInput}>. Tracks the change between successive {@link KeyboardEvent}s.
 *
 * @param event - any {@link KeyboardEvent}
 * @param previous - the {@link EventInfo}<{@link KeyboardInput}> that was returned the last time this function ran. This parameter is optional.
 *
 * @returns
 * {@link EventInfo}<{@link KeyboardInput}>
 */
export const handleKeyboard: Handler<KeyboardEvent, KeyboardInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo<KeyboardInput>(
    event,
    previous && previous.input.type === "KeyboardInput"
      ? getKeyboardInput(event, previous.input)
      : getKeyboardInput(event)
  );
};
