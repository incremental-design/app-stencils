import { PointerCoordinates, getPointerCoordinates } from './pointer-utils';

import { stopAndPrevent, Listener } from './listener-utils';

// !AuxclickListener
/**
 * AuxclickListener
 */

export const AuxclickListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !ClickListener
/**
 * ClickListener
 */

export const ClickListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !ContextmenuListener
/**
 * ContextmenuListener
 */

export const ContextmenuListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !DblclickListener
/**
 * DblclickListener
 */

export const DblclickListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !MousedownListener
/**
 * MousedownListener
 */

export const MousedownListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseenterListener
/**
 * MouseenterListener
 */

export const MouseenterListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseleaveListener
/**
 * MouseleaveListener
 */

export const MouseleaveListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MousemoveListener
/**
 * MousemoveListener
 */

export const MousemoveListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseoutListener
/**
 * MouseoutListener
 */

export const MouseoutListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseoverListener
/**
 * MouseoverListener
 */

export const MouseoverListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseupListener
/**
 * MouseupListener
 */

export const MouseupListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !WebkitmouseforcedownListener
/**
 * WebkitmouseforcedownListener
 */

export const WebkitmouseforcedownListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// need to mention that we don't listen to pointer event, and explain why
