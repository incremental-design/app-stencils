import { stopAndPrevent, Listener } from './Utils/';

// !ErrorListener
/**
 * ErrorListener
 */

export const ErrorListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !FullscreenchangeListener
/**
 * FullscreenchangeListener
 */

export const FullscreenchangeListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !FullscreenerrorListener
/**
 * FullscreenerrorListener
 */

export const FullscreenerrorListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
