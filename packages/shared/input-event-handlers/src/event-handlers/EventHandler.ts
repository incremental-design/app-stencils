import { stopAndPrevent, Handler } from './handler-utils/';

// !ScrollListener
/**
 * ScrollListener
 */

export const ScrollHandler: Handler<void> = (
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

export const OverflowHandler: Handler<void> = (
  e,
  stopPropogation,
  preventDefault,
  p
) => {
  stopAndPrevent(e, stopPropogation, preventDefault);
};

// could potentially listen to cancel, canplay, canplaythrough, change, close, cuechange, durationchange, emptied, ended, input, invalid, load, loadeddata, loadedmetadata, loadstart, pause, play, playing, ratechange, reset, seeked, seeking, select, selectionchange, selectstart, stalled, submit, suspend, timeupdate, toggle, volumechange, waiting

// need to show which elements these listeners are valid for. Some are valid for video players, some are valid for window only

// need different handlers because all of these events have different information ... even though they are all the event class!
