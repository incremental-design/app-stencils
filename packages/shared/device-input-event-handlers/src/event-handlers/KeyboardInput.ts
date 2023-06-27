export function getKeyboardInput(
  event: KeyboardEvent,
  previous?: KeyboardInput
): KeyboardInput {
  return {
    type: 'KeyboardInput',
  };
}

export interface KeyboardInput {
  readonly type: 'KeyboardInput' /* this is here to speed up the 'handle' function */;
  // need to get duration of keypresses
}
