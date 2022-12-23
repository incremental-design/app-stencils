import { Handler, mergeWithEventInfo } from "./handler-utils";
import { ScrollInput, getScrollInput } from "./scroll-utils";

/**
 * Handles {@link Event}s where {@link Event.type} is 'scroll'. Turns them into {@link EventInfo}<{@link ScrollInput}>. Tracks the change between successive {@link Event}s and {@link WheelEvent}s. Does NOT handle {@link Event}s where {@link Event.type} is NOT 'scroll'.
 *
 * @param event - any {@link Event} where {@link Event.type} is 'scroll'
 * @param previous - the {@link EventInfo}<{@link ScrollInput}> that was returned the last time this function ran. This parameter is optional.
 *
 * @returns {@link EventInfo}<{@link ScrollInput}>
 */
export const handleScroll: Handler<Event | WheelEvent, ScrollInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo(
    event,
    previous && previous.input.type === "ScrollInput"
      ? getScrollInput(event, previous.input)
      : getScrollInput(event)
  );
};

// don't support mic and webcam, because those use webrtc api.

// html dialog element - don't support these

// cancel - dialog https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event
// close - dialog https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event

// html media element - don't suport these, because they don't directly correspond to input devices. maybe make a media-event-listeners package??

// canplay - video https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event
// canplaythrough - video https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event
// cuechange - video audio https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/cuechange_event
// durationchange - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event
// emptied - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event
// ended - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event
// loadeddata - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event
// loadedmetadata - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event
// loadstart - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event
// pause - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event
// play - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event
// playing - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event
// ratechange - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event
// seeked - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event
// seeking - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event
// stalled - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event
// suspend - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event
// timeupdate - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
// volumechange - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event
// waiting - video audio https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event

// html form element - don't support these because they don't directly correspond to input devices. just use vuelidate

// change - input, select, textarea https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
// input - input, select, textarea https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
// invalid - input, select, textarea https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event
// reset - input, select, textarea https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
// select - input, select, textarea https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event
// submit - input, select, textarea https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event

// html document element listeners. don't support these. make a plugin for them instead, because they are document-wide and should be singletons
// selectionchange - document https://developer.mozilla.org/en-US/docs/Web/API/Document/selectionchange_event
// selectstart - document https://developer.mozilla.org/en-US/docs/Web/API/Document/selectstart_event

// don't even bother with this one
// toggle - details https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement/toggle_event

// vue already has a 'ready' hook for this ... no need to support. the rest of these events are really esoteric so don't support
// load - window https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
// afterprint - window https://developer.mozilla.org/en-US/docs/Web/API/Window/afterprint_event
// beforeprint - https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeprint_event
// languagechange - window https://developer.mozilla.org/en-US/docs/Web/API/Window/languagechange_event
// offline - window https://developer.mozilla.org/en-US/docs/Web/API/Navigator/Online_and_offline_events
// online - window https://developer.mozilla.org/en-US/docs/Web/API/Navigator/Online_and_offline_events
// unload - https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event
