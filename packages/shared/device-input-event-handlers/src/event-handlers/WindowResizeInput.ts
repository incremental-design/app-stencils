export function getWindowResizeInput(
  event: UIEvent,
  previous?: WindowResizeInput
): WindowResizeInput {
  return {
    type: 'WindowResizeInput',
  };
}

export interface WindowResizeInput {
  readonly type: 'WindowResizeInput' /* this is here to speed up 'handle' function */;
}
