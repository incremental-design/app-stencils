import { stopAndPrevent, Listener } from './Utils/';

// !KeydownListener
/**
 * KeydownListener
 */

export const KeydownListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !KeyupListener
/**
 * KeyupListener
 */

export const KeyupListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
