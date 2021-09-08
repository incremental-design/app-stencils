import { PointerCoordinates, getPointerCoordinates } from './pointer-utils';

import { stopAndPrevent, Handler } from './handler-utils';

// !MouseEventHandler
/**
 * MouseEventHandler
 */

export const MouseEvnetHandler: Handler<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};
