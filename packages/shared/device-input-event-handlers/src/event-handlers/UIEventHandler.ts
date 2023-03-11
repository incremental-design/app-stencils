// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Handler, mergeWithEventInfo, EventInfo } from './';
import { WindowResizeInput, getWindowResizeInput } from './';

// resize

/**
 * Handles {@link UIEvent}s where {@link UIEvent.type} is 'resize'. Turns them into {@link EventInfo}<{@link WindowResizeInput}>. Tracks the change between successive {@link UIEvent}s.
 *
 * @param event - any {@link UIEvent} where
 * @param previous - the {@link EventInfo}<{@link WindowResizeInput}> that was returned the last time this function ran.
 *
 * @returns
 * {@link EventInfo}<{@link WindowResizeInput}>
 */
export const handleWindowResize: Handler<UIEvent, WindowResizeInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo<WindowResizeInput>(
    event,
    previous && previous.input.type === 'WindowResizeInput'
      ? getWindowResizeInput(event, previous.input)
      : getWindowResizeInput(event)
  );
};
