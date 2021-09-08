import { stopAndPrevent, Handler } from './handler-utils/';

// !ScrollListener
/**
 * ScrollListener
 */

export const ScrollListener: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// !OverflowListener
/**
 * OverflowListener
 */

export const OverflowListener: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// could potentially listen to cancel, canplay, canplaythrough, change, close, cuechange, durationchange, emptied, ended, input, invalid, load, loadeddata, loadedmetadata, loadstart, pause, play, playing, ratechange, reset, seeked, seeking, select, selectionchange, selectstart, stalled, submit, suspend, timeupdate, toggle, volumechange, waiting

// need to show which elements these listeners are valid for. Some are valid for video players, some are valid for window only
