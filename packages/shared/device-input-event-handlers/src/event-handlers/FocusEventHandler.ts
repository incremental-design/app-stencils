export default {};

// blur, focus, focusin, focusout

import { stopAndPrevent, Handler } from './handler-utils/';

// !FocusEventHandler
/**
 * FocusEventHandler
 */

export const FocusEventHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// // !SelectHandler
// /**
//  * SelectHandler
//  */
//
// export const SelectHandler: Handler<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };
