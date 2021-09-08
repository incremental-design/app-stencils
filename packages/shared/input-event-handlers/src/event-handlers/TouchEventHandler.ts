import { PointerCoordinates, getPointerCoordinates } from './pointer-utils';

import { stopAndPrevent, Handler } from './handler-utils';

// make passive true?? https://stackoverflow.com/questions/37721782/what-are-passive-event-Handlers

// !TouchstartHandler
/**
 * TouchstartHandler
 */

export const TouchstartHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !TouchmoveHandler
/**
 * TouchmoveHandler
 */

export const TouchmoveHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !TouchendHandler
/**
 * TouchendHandler
 */

export const TouchendHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !TouchcancelHandler
/**
 * TouchcancelHandler
 */

export const TouchcancelHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};
