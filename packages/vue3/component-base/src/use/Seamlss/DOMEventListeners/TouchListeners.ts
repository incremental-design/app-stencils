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

export const TouchmoveListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !TouchendListener
/**
 * TouchendListener
 */

export const TouchendListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !TouchcancelListener
/**
 * TouchcancelListener
 */

export const TouchcancelListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};
