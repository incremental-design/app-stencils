export function getScrollInput(
  e: Event | WheelEvent,
  previous?: ScrollInput
): ScrollInput {
  return {
    type: 'ScrollInput',
  };
}

export interface ScrollInput {
  readonly type: 'ScrollInput' /*this is here to speed up 'handle' function*/;

  // need to add a duration property that gets calculated based on 'previous'
}
