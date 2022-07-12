import { EventInfo } from '@incremental.design/device-input-event-handlers/dist/types/event-handlers/handler-utils';

import {
  PointerInput,
} from '@incremental.design/device-input-event-handlers';

export const enum State {
  hovered = "hovered",
  peeked = "peeked",
  pressed = "pressed",
  toggled = "toggled",
  sliding = "sliding",
  selected = "selected",
  focused = "focused",
}

export type StateChangePayload = {
  newState: Array<State>;
  oldState: Array<State>;
  inputEvents: Array<EventInfo<unknown>>;
  flags: Array<'pointerReleasedInTarget'>;
}

export type PointerInputPayload = EventInfo<PointerInput>

export default {
  /**
   * stateChange is emitted whenever the {@link State} of this component changes. For example, if this component `isPressable`, then a state change event will be emitted whenever the component is pressed, and whenever it is released.
   *
   * @param payload - an object that contains:
   *  * newState: an array that is one of {@link State}
   *  * oldState: an array that is one of {@link State}
   *  * inputEvents: an array of {@link EventInfo} that contains the events that caused the state change
   *  * flags: an array of strings which convey additional information about the state change.
   */
  stateChange: (payload: StateChangePayload) => {
    return true; /* there is no actual need to validate emit logic because it will always be valid ... this is just here for posterity */
  },
  /**
   * pointerInput is emitted whenever an {@link mousedown}, {@link mousemove}, {@link mouseup}, {@link mouseleave}, {@link touchcancel}, {@link touchstart}, {@link touchmove}, or {@link touchend} event occurs on the component.
   *
   * @param payload - a {@link EventInfo<PointerInput>} object.
   */
  pointerInput: (payload: PointerInputPayload) => {
    return true; /* once again, there is no actual need to validate emit logic because it will always be valid ... this is just here for posterity */
  },
  // todo: make a focusInput event
  // todo: make a keyboardInput event
  // todo: make a dragInput event
  // todo; make a scrollInput event
}