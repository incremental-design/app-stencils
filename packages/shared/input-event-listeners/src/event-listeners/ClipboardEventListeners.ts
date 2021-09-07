import { stopAndPrevent, Listener } from './listener-utils/';

// !CutListener
/**
 * CutListener
 */

export const CutListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !CopyListener
/**
 * CopyListener
 */

export const CopyListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !PasteListener
/**
 * PasteListener
 */

export const PasteListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
