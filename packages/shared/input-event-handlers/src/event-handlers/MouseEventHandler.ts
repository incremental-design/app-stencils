import { PointerCoordinates, getPointerCoordinates } from './pointer-utils';

import { stopAndPrevent, Handler } from './handler-utils';

// !AuxclickHandler
/**
 * AuxclickHandler
 */

export const AuxclickHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !ClickHandler
/**
 * ClickHandler
 */

export const ClickHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !ContextmenuHandler
/**
 * ContextmenuHandler
 */

export const ContextmenuHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !DblclickHandler
/**
 * DblclickHandler
 */

export const DblclickHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !MousedownHandler
/**
 * MousedownHandler
 */

export const MousedownHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseenterHandler
/**
 * MouseenterHandler
 */

export const MouseenterHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseleaveHandler
/**
 * MouseleaveHandler
 */

export const MouseleaveHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MousemoveHandler
/**
 * MousemoveHandler
 */

export const MousemoveHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseoutHandler
/**
 * MouseoutHandler
 */

export const MouseoutHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseoverHandler
/**
 * MouseoverHandler
 */

export const MouseoverHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseupHandler
/**
 * MouseupHandler
 */

export const MouseupHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !WebkitmouseforcedownHandler
/**
 * WebkitmouseforcedownHandler
 */

export const WebkitmouseforcedownHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// need to mention that we don't listen to pointer event, and explain why
