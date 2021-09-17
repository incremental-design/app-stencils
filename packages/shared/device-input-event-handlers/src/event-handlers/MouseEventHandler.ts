import { PointerCoordinates, getPointerCoordinates } from './pointer-utils';

import { Handler } from './handler-utils';

// !MouseEventHandler
/**
 * MouseEventHandler
 */

export const MouseEventHandler: Handler<PointerCoordinates> = (e, p) => {
  return getPointerCoordinates(e, p);
};
