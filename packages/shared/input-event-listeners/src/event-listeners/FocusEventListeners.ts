export default {};

// blur, focus, focusin, focusout

import { stopAndPrevent, Listener } from './listener-utils/';

// !FocusListener
/**
 * FocusListener
 */

export const FocusListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// // !SelectListener
// /**
//  * SelectListener
//  */
//
// export const SelectListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !FocusinListener
/**
 * FocusinListener
 */

export const FocusinListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !FocusoutListener
/**
 * FocusoutListener
 */

export const FocusoutListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !BlurListener
/**
 * BlurListener
 */

export const blurListener: Listener<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
