import { stopAndPrevent, Listener } from './listener-utils';

// make passive true?? https://stackoverflow.com/questions/37721782/what-are-passive-event-listeners

// !WheelListener
/**
 * WheelListener
 */

export const WheelListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
