import {
  EventInfo,
  PointerInput,
  FocusInput,
  KeyboardInput,
  ScrollInput,
  DragInput,
} from '@incremental.design/device-input-event-handlers';

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
  hovering = 'hovering',
  pressing = 'pressing',
  peeking = 'peeking',
  scrolling = 'scrolling',
  swiping = 'swiping',
  toggled = 'toggled',
  dragging = 'dragging',
  selected = 'selected',
  focused = 'focused',
  editing = 'editing',
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
  flags: Array<'pointerReleasedInTarget'>;
}

export default {
  /**
   * stateChange - an event that contains a {@link StateChange}. This event is emitted any time the state of base component changes. It includes the {@link State}s that base component has, and the array of {@link EventInfo} that caused the state to change.
   *
   */
  stateChange: (payload: StateChange) => {
    return true; // todo write validation logic
  },

  /**
   * pointerInput - an event that contains a {@link PointerInput}. This event is emitted every time a pointer, such as a mouse cursor or touch point interacts with base component.
   *
   * @param payload - Description of values payload takes and what it affects.
   */
  pointerInput: (payload: EventInfo<PointerInput>) => {
    return true; // todo validate
  },

  /**
   * focusInput - an event that contains a {@link FocusInput}. This event is emitted every time base component gains or loses focus.
   */
  focusInput: (payload: EventInfo<FocusInput>) => {
    return true; // todo validate
  },

  /**
   * keyboardInput - an event that contains a {@link KeyboardInput}. This event is emitted every time the base component receives a keypress.
   */
  keyboardInput: (payload: EventInfo<KeyboardInput>) => {
    return true; // todo validate
  },

  /**
   * scrollInput - an event that contains a {@link ScrollInput}. This event is emitted every time the base component receives wheel or pointer input that results in a scroll event.
   */
  scrollInput: (payload: EventInfo<ScrollInput>) => {
    return true; // todo validate
  },

  /**
   * dragInput - an event that contains a {@link DragInput}. This event is emitted every time the base component is dragged or dropped.
   */
  dragInput: (payload: EventInfo<DragInput>) => {
    return true; // todo validate
  },
};
