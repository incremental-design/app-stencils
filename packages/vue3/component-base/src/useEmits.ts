import { EventInfo } from "@incremental.design/device-input-event-handlers";

/**
 * A state is base component's response to an input. The states that base component can have depend on its affordances. For example: if an instance of baseComponent `isHoverable`, then it will enter a `hovering` state on mouseover. It will leave the `hovering` state on mouseout.
 *
 * There are two types of states: ephemeral and persistent. Ephemeral states only last for the duration of an input. Persistent states last after an input stops.
 * - Ephemeral states:
 *    - hovering
 *    - pressing
 *    - peeking
 *    - scrolling
 *    - swiping
 *    - dragging
 *    - editing
 * - Persistent states:
 *    - toggled
 *    - selected
 *    - focused
 */
export const enum State {
  hovering = "hovering",
  pressing = "pressing",
  peeking = "peeking",
  scrolling = "scrolling",
  swiping = "swiping",
  toggled = "toggling",
  dragging = "dragging",
  selected = "selected",
  focused = "focused",
  editing = "editing",
}
/**
 * StateChange is an object that contains:
 *  * newState: an array of one or more {@link State}s
 *  * oldState: an array of one or more {@link State}s
 *  * inputEvents: an array of {@link EventInfo} that contains the events that caused the state change
 *  * flags: an array of strings which convey additional information about the state change.
 */
export interface StateChange {
  newState: Array<State>;
  oldState: Array<State>;
  inputEvents: Array<EventInfo<unknown>>;
  flags: Array<"pointerReleasedInTarget">;
}
