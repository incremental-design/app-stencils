// drag, dragend, dragenter, dragexit, dragleave, dragover, dragstart, drop

// note: `drop` won't work unless dragenter and dragover are prevented. see: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets

import { Handler, mergeWithEventInfo } from './handler-utils/';
import { DragInput, getDragInput } from './pointer-utils/';

export const handleDrag: Handler<DragEvent, DragInput> = (event, previous) => {
  return mergeWithEventInfo<DragInput>(
    event,
    previous && previous.type === 'DragInput'
      ? getDragInput(event, previous)
      : getDragInput(event)
  );
};
