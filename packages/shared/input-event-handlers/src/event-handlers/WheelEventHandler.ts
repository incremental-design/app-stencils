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

// shim scroll even through this event. refer to note "don't confuse wheel event with scroll event ..." in: https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event

// even though scroll isn't a wheel event, it needs to be aliased here for compatibility
