import { PointerCoordinates, getPointerCoordinates } from './pointer-utils';

import { Handler } from './handler-utils';

// make passive true?? https://stackoverflow.com/questions/37721782/what-are-passive-event-Handlers

// !TouchHandler
/**
 * TouchHandler
 */

export const TouchHandler: Handler<PointerCoordinates> = (e, p) => {
  return getPointerCoordinates(e, p);
};
