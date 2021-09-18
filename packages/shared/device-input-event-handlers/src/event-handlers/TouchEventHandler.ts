import { Handler, mergeWithEventInfo } from './handler-utils/';
import { PointerInput, getPointerInput } from './pointer-utils';

export const handleTouch: Handler<TouchEvent, PointerInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo(event, getPointerInput(event, previous));
};
