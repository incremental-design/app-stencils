import { handleScroll } from '.';
import { EventInfo } from './handler-utils';

/**
 * Handles {@link WheelEvent}s and {@link Event}s where {@link Event.type} is 'scroll'. Turns them into {@link EventInfo}<{@link ScrollInput}>. Tracks the change between successive {@link Event}s and {@link WheelEvent}s. Does NOT handle {@link Event}s where {@link Event.type} is NOT 'scroll'.
 *
 * @param event - any {@link WheelEvent} or {@link Event} where {@link Event.type} is 'scroll'
 * @param previous - the {@link EventInfo}<{@link ScrollInput}> that was returned the last time this function ran.
 *
 * @returns {@link EventInfo}<{@link ScrollInput}>
*/
export const handleWheel = handleScroll; // just alias because no need to re-define
