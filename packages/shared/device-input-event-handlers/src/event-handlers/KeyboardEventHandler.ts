import { Handler, mergeWithEventInfo } from './handler-utils/';
import { KeyboardInput, getKeyboardInput } from './keyboard-utils/';

export const handleKeyboard: Handler<KeyboardEvent, KeyboardInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo<KeyboardInput>(
    event,
    getKeyboardInput(event, previous)
  );
};
