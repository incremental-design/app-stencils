import { stopAndPrevent, Listener } from './listener-utils/';

// !ScrollListener
/**
 * ScrollListener
 */

export const ScrollListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !OverflowListener
/**
 * OverflowListener
 */

export const OverflowListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
