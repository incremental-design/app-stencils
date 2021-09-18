import { Handler, mergeWithEventInfo } from './handler-utils/';
import { PointerInput, getPointerInput } from './pointer-utils';

export const handleMouse: Handler<MouseEvent, PointerInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo(event, getPointerInput(event, previous));
};

// todo: support auxclick, contextmenu, webkitmouseforcewillbegin, webkitmouseforcedown, webkitmouseforcechanged, webkitmouseforceup
