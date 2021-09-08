import { stopAndPrevent, Handler } from './handler-utils/';

// !ClipboardEventHandler
/**
 * ClipboardEventHandler
 */

export const ClipboardEventHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
