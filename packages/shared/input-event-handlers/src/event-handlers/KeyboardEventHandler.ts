import { stopAndPrevent, Handler } from './handler-utils/';

// !KeydownListener
/**
 * KeydownListener
 */

export const KeydownListener: Handler<void> = (
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

export const KeyupListener: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// need to add keypress listener
