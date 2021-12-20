import { Handler, mergeWithEventInfo, EventInfo } from './handler-utils/';
import {
  WindowResizeInput,
  getWindowResizeInput,
} from './window-resize-utils/';

// resize

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
