/**
 * Listeners are functions that receive events, optionally modify them, and extract relevant information. Use listeners to filter the useful information out of an event before discarding it.
 * @param event - the event you want to listen to
 * @typeParam Returns - the type of information that the listener will return from the event
 * @param stopPropogation - a boolean that determines whether e.stopPropogation() should be called.
 * @param preventDefault - a boolean that determines whether e.preventDefault() should be called.
 * @param previous - any previous event you want to compare the event to.
 * @returns Returns - the type of information the listener will return from the event.
 *
 * To use the listener in your Vue components, you need to wrap it in a callback, and bind it to the name of the event you want to listen to:
 * @example
 * <div @click="(event) => { ClickListener(event, true, true) }"></div>
 */
type Listener<Returns> = (
  event: Event,
  stopPropogation?: boolean,
  preventDefault?: boolean,
  previous?: Event
) => Returns;

const stopAndPrevent: Listener<void> = (
  e,
  stopPropogation = true,
  preventDefault = true
) => {
  if (stopPropogation) {
    e.stopPropagation();
  }
  if (preventDefault) {
    e.preventDefault();
  }
};

/**
 * @typeParam x is the horizontal component of the location in pixels, relative to the element. For example, if the cursor is 50 pixels to the right of the left edge of the element, x will be 50.
 * @typeParam y is the vertical component of the location in pixels, relative to the element. For example, if the cursor is 50 pixels below the top edge of the element, y will be 50.
 * @typeParam xPercent is the horizontal component of the location in percentage, relative to the element. For example, if the cursor is 50 pixels to the right of the left edge, and 50 pixels to the left of the right edge of the element, then xPercent will be .5
 * @typeParam yPercent is the horizontal component of the location in percentage, relative to the element. For example, if the cursor is 50 pixels below the top edge, and 50 pixels above the bottom edge of the element, then yPercent will be .5
 * @typeParam dx is the horizontal component of the cursor's velocity, measured in pixels per second. For example, if the cursor is moving 5 pixels to the right each second, dx will be 5.
 * @typeParam dy is the vertical component of the cursor's velocity, measured in pixels per second. For example, if the cursor is moving 5 pixels down each second, dy will be 5.
 * @typeParam dxPercent is the horizontal component of the cursor's velocity, measured in percent per second. For example, if the cursor is moving 5 pixels to the right each second, and the width of the element is 50 pixels, then dxPercent is .1.
 * @typeParam dyPercent is the vertical component of the cursor's velocity, measured in percent per second. For example, if the cursor is moving 5 pixels down each second, and the height of the element is 50 pixels, then dyPercent is .1.
 */
export declare type PointerCoordinates = {
  x: number;
  y: number;
  xPercent?: number;
  yPercent?: number;
  dx?: number;
  dy?: number;
  dxPercent?: number;
  dyPercent?: number;
};

function getPointerCoordinates(
  event: Event,
  previous?: Event
): PointerCoordinates {
  const width =
    event.target instanceof HTMLElement ? event.target.scrollWidth : false; // notice that we are getting scrollWidth instead of offsetWidth. That's because scrollWidth doesn't change if the target overflows its container.
  const height =
    event.target instanceof HTMLElement ? event.target.scrollHeight : false; // notice that we are getting scrollHeight instead of offsetHeight. That's because scrollHeight doesn't change if the target overflows its container.

  const previousHasSameTarget: () => boolean = () => {
    return event.target instanceof EventTarget &&
      previous &&
      previous.target instanceof EventTarget
      ? Object.is(event.target, previous.target)
      : false;
  };

  const MillisecondsElapsedSincePrevious =
    previous && previousHasSameTarget()
      ? event.timeStamp - previous.timeStamp
      : false;

  const getMouseCoordinates = (e: MouseEvent) => {
    const X = e.offsetX;

    const Y = e.offsetY;

    const DX = MillisecondsElapsedSincePrevious
      ? (e.movementX / MillisecondsElapsedSincePrevious) * 1000
      : false;

    const DY = MillisecondsElapsedSincePrevious
      ? (e.movementY / MillisecondsElapsedSincePrevious) * 1000
      : false;

    const XPercent = width ? X / width : false;

    const YPercent = height ? Y / height : false;

    const DXPercent = width && DX ? DX / width : false;

    const DYPercent = height && DY ? DY / height : false;

    const Coordinates: {
      x: number;
      y: number;
      [key: string]: number;
    } = {
      x: X,
      y: Y,
    };

    if (XPercent) {
      Coordinates.xPercent = XPercent;
    }

    if (YPercent) {
      Coordinates.yPercent = YPercent;
    }

    if (DX) {
      Coordinates.dx = DX;
    }

    if (DY) {
      Coordinates.dy = DY;
    }

    if (DXPercent) {
      Coordinates.dxPercent = DXPercent;
    }

    if (DYPercent) {
      Coordinates.dyPercent = DYPercent;
    }

    return Coordinates;
  };

  // const getTouchCoordinates = (e: TouchEvent) => {}

  if (event instanceof MouseEvent) {
    return getMouseCoordinates(event);
  }
  // else if (e instanceof TouchEvent){
  //   return getTouchCoordinates(e)
  // }
  else {
    throw new Error(`${event} is not a MouseEvent or TouchEvent`);
  }
}

// !AuxclickListener
/**
 * AuxclickListener
 */
// export const AuxclickListener: Listener<PointerCoordinates> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !BlurListener
/**
 * BlurListener
 */
// export const blurListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !ClickListener
/**
 * ClickListener
 */
export const ClickListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !CompositionendListener
/**
 * CompositionendListener
 */
// export const CompositionendListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !CompositionstartListener
/**
 * CompositionstartListener
 */
// export const CompositionstartListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !CompositionupdateListener
/**
 * CompositionupdateListener
 */
// export const CompositionupdateListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !ContextmenuListener
/**
 * ContextmenuListener
 */
// export const ContextmenuListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !CopyListener
/**
 * CopyListener
 */
// export const CopyListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !CutListener
/**
 * CutListener
 */
// export const CutListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !DblclickListener
/**
 * DblclickListener
 */
// export const DblclickListener: Listener<PointerCoordinates> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !ErrorListener
/**
 * ErrorListener
 */
// export const ErrorListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !FocusListener
/**
 * FocusListener
 */
// export const FocusListener: Listener<void> = (
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
// export const FocusinListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !FocusoutListener
/**
 * FocusoutListener
 */
// export const FocusoutListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !FullscreenchangeListener
/**
 * FullscreenchangeListener
 */
// export const FullscreenchangeListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !FullscreenerrorListener
/**
 * FullscreenerrorListener
 */
// export const FullscreenerrorListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !KeydownListener
/**
 * KeydownListener
 */
// export const KeydownListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !KeyupListener
/**
 * KeyupListener
 */
// export const KeyupListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !MousedownListener
/**
 * MousedownListener
 */
export const MousedownListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseenterListener
/**
 * MouseenterListener
 */
export const MouseenterListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseleaveListener
/**
 * MouseleaveListener
 */
export const MouseleaveListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MousemoveListener
/**
 * MousemoveListener
 */
export const MousemoveListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseoutListener
/**
 * MouseoutListener
 */
export const MouseoutListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseoverListener
/**
 * MouseoverListener
 */
export const MouseoverListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !MouseupListener
/**
 * MouseupListener
 */
export const MouseupListener: Listener<PointerCoordinates> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);

  return getPointerCoordinates(e, p);
};

// !OverflowListener
/**
 * OverflowListener
 */
// export const OverflowListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !PasteListener
/**
 * PasteListener
 */
// export const PasteListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !ScrollListener
/**
 * ScrollListener
 */
// export const ScrollListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !SelectListener
/**
 * SelectListener
 */
// export const SelectListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !TouchcancelListener
/**
 * TouchcancelListener
 */
// export const TouchcancelListener: Listener<PointerCoordinates> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !TouchendListener
/**
 * TouchendListener
 */
// export const TouchendListener: Listener<PointerCoordinates> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !TouchmoveListener
/**
 * TouchmoveListener
 */
// export const TouchmoveListener: Listener<PointerCoordinates> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !TouchstartListener
/**
 * TouchstartListener
 */
// export const TouchstartListener: Listener<PointerCoordinates> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !WebkitmouseforcedownListener
/**
 * WebkitmouseforcedownListener
 */
// export const WebkitmouseforcedownListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

// !WheelListener
/**
 * WheelListener
 */
// export const WheelListener: Listener<void> = (
//   e,
//   stopPropogation,
//   preventDefault,
//   p
// ) => {
//   stopAndPrevent(e, stopPropogation, preventDefault);
// };

/**
 * MouseListeners contains ALL listeners that respond to MouseEvents
 */
export const MouseListeners = {
  ClickListener,
  // DblclickListener,
  MousedownListener,
  MouseenterListener,
  MouseleaveListener,
  MousemoveListener,
  MouseoutListener,
  MouseoverListener,
  MouseupListener,
  // WebkitmouseforcedownListener,
};
