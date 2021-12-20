import { Handler, mergeWithEventInfo } from './handler-utils/';
import { GamepadInput, getGamepadInput } from './gamepad-utils/';

// gamepadconnected gamepaddisconnected

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
