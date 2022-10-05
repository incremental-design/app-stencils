// drag, dragend, dragenter, dragexit, dragleave, dragover, dragstart, drop

// note: `drop` won't work unless dragenter and dragover are prevented. see: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets

import { Handler, mergeWithEventInfo, EventInfo } from "./handler-utils";
import { DragInput, getDragInput } from "./pointer-utils";

/**
 * Handles {@link DragEvent}s. Turns them into {@link EventInfo}<{@link DragInput}>. Tracks the change between successive {@link DragEvent}s.
 *
 * @param event - any {@link DragEvent}
 * @param previous - the {@link EventInfo}<{@link DragInput}> that was returned the last time this function ran. This parameter is optional.
 *
 * @returns
 * {@link EventInfo}<{@link DragInput}>
 */
export const handleDrag: Handler<DragEvent, DragInput> = (event, previous) => {
  return mergeWithEventInfo<DragInput>(
    event,
    previous && previous.input.type === "DragInput"
      ? getDragInput(event, previous.input)
      : getDragInput(event)
  );
};
