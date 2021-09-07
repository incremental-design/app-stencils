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
 *
 * @example
 * <div @click="(event) => { ClickListener(event, true, true) }"></div>
 *
 */
export declare type Listener<Returns> = (
  event: Event,
  stopPropogation?: boolean,
  preventDefault?: boolean,
  previous?: Returns | false
) => Returns;
