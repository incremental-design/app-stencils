export default {};

// blur, focus, focusin, focusout

import { stopAndPrevent, Handler } from './handler-utils/';

// !FocusHandler
/**
 * FocusHandler
 */

export const FocusHandler: Handler<void> = (
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

// !FocusinHandler
/**
 * FocusinHandler
 */

export const FocusinHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !FocusoutHandler
/**
 * FocusoutHandler
 */

export const FocusoutHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !BlurHandler
/**
 * BlurHandler
 */

export const BlurHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
