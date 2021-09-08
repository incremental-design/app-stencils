import { stopAndPrevent, Handler } from './handler-utils';

// make passive true?? https://stackoverflow.com/questions/37721782/what-are-passive-event-listeners

// !WheelListener
/**
 * WheelListener
 */

export const WheelListener: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
