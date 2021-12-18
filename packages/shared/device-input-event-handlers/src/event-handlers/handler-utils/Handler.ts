/**
 * Handlers are functions that receive events and extract relevant information. Use handlers to filter the useful information out of an event before discarding it.
 * @param event - the event you want to filter.
 * @typeParam Input - the type of information that the listener will return from the event
 * @param previous - any information of type {@link Input} that was previously returned from this handler.
 * @returns EventInfo<Input> - contains the type of event, its timestamp, and all information that was filtered out of the event.
 */
import { EventInfo } from './';

export declare type Handler<EventType extends Event, Input> = (
  event: EventType,
  previous?: EventInfo<Input>
) => EventInfo<Input>;
