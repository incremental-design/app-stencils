export function getGamepadInput(
  event: GamepadEvent,
  previous?: GamepadInput
): GamepadInput {
  return {
    type: 'GamepadInput',
  };
}

export interface GamepadInput {
  readonly type: 'GamepadInput' /* this is here to speed up the 'handle' function */;
}
