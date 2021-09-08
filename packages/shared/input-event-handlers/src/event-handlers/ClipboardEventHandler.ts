import { stopAndPrevent, Handler } from './handler-utils/';

// !CutListener
/**
 * CutListener
 */

export const CutListener: Handler<void> = (
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

export const CopyListener: Handler<void> = (
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

export const PasteListener: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
