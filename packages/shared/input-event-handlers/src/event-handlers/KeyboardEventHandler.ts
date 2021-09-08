import { stopAndPrevent, Handler } from './handler-utils/';

// !KeyboardEventHandler
/**
 * KeyboardEventHandler
 */

export const KeyboardEventHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
