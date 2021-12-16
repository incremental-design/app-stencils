import { Handler, mergeWithEventInfo } from './handler-utils/';
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
    previous && previous.type === 'WindowResizeInput'
      ? getWindowResizeInput(event, previous)
      : getWindowResizeInput(event)
  );
};
