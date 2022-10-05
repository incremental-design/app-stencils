import { Handler, mergeWithEventInfo, EventInfo } from "./handler-utils";
import { FocusInput, getFocusInput } from "./focus-utils";

// blur, focus, focusin, focusout, select??
/**
 * Handles {@link FocusEvent}s. Turns them into {@link EventInfo}<{@link FocusInput}>. Tracks the change between successive {@link FocusEvent}s.
 *
 * @param event - any {@link FocusEvent}
 * @param previous - the {@link EventInfo}<{@link FocusInput}> that was returned the last time this function ran. This parameter is optional.
 *
 * @returns
 * {@link EventInfo}<{@link FocusInput}>
 */
export const handleFocus: Handler<FocusEvent, FocusInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo<FocusInput>(
    event,
    previous && previous.input.type === "FocusInput"
      ? getFocusInput(event, previous.input)
      : getFocusInput(event)
  );
};

// even through select is a window event, it has some overlaps with focus, because selected text is focused if the interface itself is focus driven. It might be useful to handle it
