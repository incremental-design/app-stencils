import { stopAndPrevent, Listener } from './Utils/';

// !CompositionstartListener
/**
 * CompositionstartListener
 */

export const CompositionstartListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !CompositionupdateListener
/**
 * CompositionupdateListener
 */

export const CompositionupdateListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !CompositionendListener
/**
 * CompositionendListener
 */

export const CompositionendListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
