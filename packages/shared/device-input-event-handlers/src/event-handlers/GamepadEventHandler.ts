import { Handler, mergeWithEventInfo } from './handler-utils';
import { GamepadInput, getGamepadInput } from './gamepad-utils';

// gamepadconnected gamepaddisconnected

/**
 * Handles {@link GamepadEvent}s. Turns them into {@link EventInfo}<{@link GamepadInput}>. Tracks the change between successive {@link GamepadEvent}s.
 *
 * @param event - any {@link GamepadEvent}
 * @param previous - the {@link EventInfo}<{@link GamepadInput}> that was returned the last time this function ran. This parameter is optional.
 *
 * @returns 
 * {@link EventInfo}<{@link GamepadInput}>
*/
export const handleGamepad: Handler<GamepadEvent, GamepadInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo<GamepadInput>(
    event,
    previous && previous.input.type === 'GamepadInput'
      ? getGamepadInput(event, previous.input)
      : getGamepadInput(event)
  );
};
