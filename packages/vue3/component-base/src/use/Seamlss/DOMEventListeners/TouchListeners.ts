import {
  PointerCoordinates,
  getPointerCoordinates,
  stopAndPrevent,
  Listener,
} from './Utils/';

// !TouchstartListener
/**
 * TouchstartListener
 */

export const TouchstartListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !TouchmoveListener
/**
 * TouchmoveListener
 */

export const TouchmoveListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !TouchendListener
/**
 * TouchendListener
 */

export const TouchendListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !TouchcancelListener
/**
 * TouchcancelListener
 */

export const TouchcancelListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
